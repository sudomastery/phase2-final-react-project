import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Button } from 'flowbite-react';
import userFetch from '../store/userFetchStore';


function UserDetail (){
const { id } = useParams() // get the user id rom url
const navigate = useNavigate();

//set the state
const { users: usersArray, deleteUser, loading: deleteLoading } = userFetch() 
const [userDetail, setUserDetail] = useState(null)
const [loading, setLoading] = useState(true)

// handle user deletion
const handleDelete = async () => {
    const firstName = userDetail.name.firstname;
    const lastName = userDetail.name.lastname;
    
    if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
        try {
            await deleteUser(userDetail.id);
            console.log('User deleted successfully');
            navigate('/'); // Redirect to home page after deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user. Please try again.');
        }
    }
};

useEffect(() => {
    const fetchUserDetail = async () => {
        // look if it is in the store
        const userFromStore = usersArray.find(user => user.id === parseInt(id))

        if (userFromStore) {
            setUserDetail(userFromStore)
            setLoading(false)
            return //stop
        }

        //if not in the store try to perform a fetch
        try {
            const response = await fetch(`https://fakestoreapi.com/users/${id}`)
            const userData = await response.json()
            setUserDetail(userData)
        } catch (error) {
            console.error('Failed to fetch user:', error)
        }
        setLoading(false)
    }

    if (id) fetchUserDetail()
}, [id, usersArray])

// loading icon
if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
        <img 
            className="loading-img"
            src="./public/images/loading.gif" 
            alt="Loading..." 
        />
    </div>
);


if (!userDetail) return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">User not found</div>
    </div>
)

// useer card
return( 
    <div className="min-h-screen p-6" style={{backgroundColor: '#242424'}}>
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link to="/">
                    <Button color="blue" size="sm">
                         Go Back
                    </Button>
                </Link>
            </div>
            
            <Card className="max-w-full transition transform duration-200 hover:scale-105 hover:shadow-[0_12px_30px_rgba(59,130,246,0.35)] hover:ring-4 hover:ring-blue-400/30">
                <div className="flex flex-col items-center pb-10">
                    <img
                        alt="Profile image"
                        height="120"
                        src="/images/profile-picture.webp"
                        width="120"
                        className="mb-3 rounded-full shadow-lg"
                    />
                    <h1 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                        {userDetail.name.firstname} {userDetail.name.lastname}
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        @{userDetail.username}
                    </span>
                    
                    <div className="w-full space-y-3 mt-4">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Email:</span>
                            <span className="text-gray-900 dark:text-white">{userDetail.email}</span>
                        </div>
                        
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Phone:</span>
                            <span className="text-gray-900 dark:text-white">{userDetail.phone}</span>
                        </div>
                        
                        {userDetail.address && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Address:</h3>
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {userDetail.address.street}, {userDetail.address.city}
                                    </p>
                                    {userDetail.address.zipcode && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {userDetail.address.zipcode}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* delete and edit buttons*/}
                    <div className="flex gap-3 mt-6">
                        <Button 
                            color="failure" 
                            size="sm"
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            {deleteLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                        
                        <Link to={`/edit-user/${userDetail.id}`}>
                            <Button color="blue" size="sm">
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    </div>
)

}
export default UserDetail
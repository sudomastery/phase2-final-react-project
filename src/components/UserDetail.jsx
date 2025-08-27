import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userFetchStore from '../store/userFetchStore';


function UserDetail (){
const { id } = useParams() // get the user id rom url

//set the state
const { user: usersArray } = userFetchStore() 
const [userDetail, setUserDetail] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
    const fetchUserDetail = async () => {
        // look if it is in the store
        const userFromStore = usersArray.find(user => user.id === parseInt(id))

        if (userFromStore) {
            setUserDetail(userFromStore)
            setLoading(false)
            return //stop
        }

        //no in the store try to perform a fetch
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


if (loading) return <div>Loading...</div>


if (!userDetail) return <div>User not found</div>


return(
        <div>
            <Link to="/">Go Back</Link>
            
            <h1>{userDetail.name.firstname} {userDetail.name.lastname}</h1>
            <p>Username: {userDetail.username}</p>
            <p>Email: {userDetail.email}</p>
            <p>Phone: {userDetail.phone}</p>
            
            {userDetail.address && (
                <div>
                    <h3>Address:</h3>
                    <p>{userDetail.address.street}, {userDetail.address.city}</p>
                </div>
            )}
        </div>
    )

}
export default UserDetail
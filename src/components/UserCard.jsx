import { Card, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import userFetch from '../store/userFetchStore';

function UserCard({user}) {
  const navigate = useNavigate();
  const { deleteUser, loading } = userFetch();

  // handle delete user with confirmation
  const handleDelete = async (e) => {
    e.preventDefault()
    //stop navigating when the card is clicked 
    e.stopPropagation() 
    
  const firstName = user.name.firstname;
  const lastName = user.name.lastname;
    
    if (window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      try {
        await deleteUser(user.id);
        console.log('User deleted successfully');
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/user/${user.id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    navigate(`/edit-user/${user.id}`);
  };

  return(
    <div className="relative">
      <Card 
        className="max-w-sm w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex flex-col items-center pb-10">
          <img
            alt="Profile image"
            height="96"
            src="/images/profile-picture.webp"
            width="96"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name.firstname} {user.name.lastname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">@{user.username || 'unknown'}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.email || 'No email'}</span>
          
          {/* buttons */}
          <div className="mt-4 flex gap-2">
            <Button 
              color="blue" 
              size="sm"
              onClick={handleEditClick}
            >
              Edit
            </Button>
            
            <Button 
              color="failure" 
              size="sm"
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UserCard
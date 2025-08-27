import UserCard from "./UserCard.jsx";
function UserList({user}) {

	return (
		<>
			{user.map((user) => {
                return(
                <UserCard key= {user.id} 
                username = {user.username} 
                name = {user.firstname} 
                email = {user.email} 
                />
)   
			})}
		</>
	);

}

export default UserList
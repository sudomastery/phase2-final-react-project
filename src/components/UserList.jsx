import UserCard from "./UserCard.jsx";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function UserList({users}) {

	return (
		<div className="p-6">
			{/* add user button */}
			<div className="mb-6 flex justify-center">
				<Link to="/create-user">
					<Button color="blue" size="lg">
						+ Add New User
					</Button>
				</Link>
			</div>

			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{users && users.length > 0 ? users.map((user) => {
					return(
					<UserCard key={user.id} user={user} />
		)   
				}) : (
					<div className="col-span-full text-center text-gray-500">
						No users found
					</div>
				)}
			</div>
		</div>
	);

}

export default UserList
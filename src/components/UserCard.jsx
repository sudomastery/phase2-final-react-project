import { Card } from "flowbite-react";

function UserCard({user}) {
  return(
    <Card className="max-w-sm w-full">
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
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.username}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
      </div>
    </Card>
  );
}

export default UserCard
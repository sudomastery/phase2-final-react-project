function UserCard({username, name, email}) {
  return(
    <div>
      <p>{username}</p>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
}

export default UserCard
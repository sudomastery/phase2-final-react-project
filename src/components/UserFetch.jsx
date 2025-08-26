import { useEffect } from "react";
import userFetchStore from "../store/userFetchStore.jsx";

function UserFetchComponent() {
    const { user, loading, error, fetchData } = userFetchStore();
    
    useEffect(() => {
        fetchData("https://fakestoreapi.com/users");
    }, [fetchData]);

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return(
<>
<h1>User List</h1>
<ul>
{user.map((user) => (
    <li key={user.id}>{user.name.firstname}</li>
))}

</ul>


</>




    )

}

export default UserFetchComponent;

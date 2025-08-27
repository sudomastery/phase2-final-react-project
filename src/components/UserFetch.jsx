import { useEffect } from "react";
import userFetchStore from "../store/userFetchStore.jsx";

function UserFetch() {
    const { user, loading, error, fetchData } = userFetchStore();
    
    useEffect(() => {
        fetchData("https://fakestoreapi.com/users");
    }, [fetchData]);

    
    
    if (loading) return <img src="./public/images/loading.gif" style={{width: '50px', height: '50px'}}alt="Loading..." />;
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

export default UserFetch;

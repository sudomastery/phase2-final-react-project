import { useEffect } from "react";
import userFetch from "../store/userFetchStore.jsx";
import UserList from "./UserList.jsx";

function UserFetch() {
    const { users, loading, error, fetchData } = userFetch();
    
    useEffect(() => {
        fetchData("https://fakestoreapi.com/users");
    }, [fetchData]);

  
    
    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <img 
                className="loading-img"
                src="./public/images/loading.gif" 
                alt="Loading..." 
            />
        </div>
    );
    if (error) return <div>Error: {error}</div>;

    return(
<>


<UserList users={users}/>
</>

    )

}


export default UserFetch;

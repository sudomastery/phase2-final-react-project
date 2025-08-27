import { useEffect } from "react";
import userFetchStore from "../store/userFetchStore.jsx";
import UserList from "./UserList.jsx";

function UserFetch() {
    const { user, loading, error, fetchData } = userFetchStore();
    
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


<UserList user={user}/>
</>

    )

}


export default UserFetch;

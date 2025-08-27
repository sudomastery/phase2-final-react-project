import { useEffect } from "react";
import userFetchStore from "../store/userFetchStore.jsx";
import UserList from "./UserList.jsx";

function UserFetch() {
    const { user, loading, error, fetchData } = userFetchStore();
    
    useEffect(() => {
        fetchData("https://fakestoreapi.com/users");
    }, [fetchData]);

    
    
    if (loading) return <img src="./public/images/loading.gif" style={{width: '50px', height: '50px'}}alt="Loading..." />;
    if (error) return <div>Error: {error}</div>;

    return(
<>


<UserList user={user}/>
</>

    )
    

}


export default UserFetch;

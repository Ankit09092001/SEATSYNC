import { useLocation } from "react-router-dom";

function User(){
    
     const location = useLocation()
    

    return(
    <h1>HII User {location.state.id}</h1>
    );
}

export default User;
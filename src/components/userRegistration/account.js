import { useAuth } from "../../context/authContext";

export default function Account(){
    const {user} = useAuth()
    return(
        <div>
            <h2>Account Information...</h2>
            {user && (
                <>
                <p>User_Name -- {user.account.username}</p>
                <p>Email -- {user.account.email}</p>
                <p>Role -- {user.account.role}</p>
                </>
            )}
        </div>
    )
}
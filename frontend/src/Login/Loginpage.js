
function Login(){
    return(
        <div>
            <h1>Login</h1>

            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                <input type="password" onChange={(e)=>{setpassword(e.target.value)}} placeholder="Password" />

                <input type="submit" />
            </form>
        </div>
    )
}
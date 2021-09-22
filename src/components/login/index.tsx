import { ReactElement } from "react";

function Login(): ReactElement {
    return (
        <div>
            <a href="/.auth/login/github">Login with Github</a> <br/>
            <a href="/.auth/login/aad">Login with Azure Active Directory</a> <br/>
            <a href="/.auth/login/twitter">Login with Twitter</a> <br/>
        </div>
    );
}

export default Login;
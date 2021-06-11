import { useEffect, useState } from 'react';
import { PublicClientApplication, AuthenticationResult, Configuration, LogLevel, AccountInfo, SilentRequest } from "@azure/msal-browser";


const MSAL_CONFIG: Configuration = {
    auth: {
        clientId: "d839e164-51b9-43c3-96af-7dc7e5cbaa5e",
        authority: "https://login.microsoftonline.com/consumers",
    },
    cache: {
        cacheLocation: "sessionStorage",
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {	
                    return;	
                }	
                switch (level) {	
                    case LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                }
            }
        }
    }
};

//Graph API access
const loginRequest = {
    scopes: ["openid", "profile"],
    account: {} as AccountInfo
};

const msal = new PublicClientApplication(MSAL_CONFIG);

type AuthContext = {
    isAuthenticated: boolean,
    account : AccountInfo,
    tokens:  AuthenticationResult[]
}

export default function useAuthentication(): { authContext: AuthContext, loginCallback: () => Promise<void>}{
    const [authContext, setAuthContext] = useState({
        isAuthenticated: false,
        account: {} as AccountInfo,
        tokens: [] as AuthenticationResult[]
    } as AuthContext);

    useEffect(() => {
        async function refreshLogin(){
            await getAccountAndToken(loginRequest);        
        }
        refreshLogin();
    },[])

    async function loginCallback(){
        !authContext.isAuthenticated ? await login(): await logout();
    }

    async function login(){
        try {
            const token = await msal.loginPopup();
            console.log(token);
        }
        catch(e){
            console.error('Error while login : ' + e);
        }

        await getAccountAndToken(loginRequest);
    }

    async function getAccountAndToken(request: SilentRequest){
        const accounts = msal.getAllAccounts();

        if(accounts.length > 0){
            if(accounts.length > 1){
                console.warn('Multiple accounts detected');
            }

            request.account = accounts[0];
            
            try {
                const newToken = await msal.acquireTokenSilent(request);
                console.debug('access token : ' + newToken.accessToken)
                
                const tokens = authContext.tokens;
                tokens.push(newToken)

                console.log(tokens);

                setAuthContext({
                    isAuthenticated: true,
                    account: loginRequest.account,
                    tokens: tokens
                })
            }
            catch(e){
                console.error("Error aquiring token : " + e);
            }
        }
    }

    async function logout() {
        try{
            await msal.logout();
        }
        catch(e){
            console.log('Error while logout : ' + e);
        }
    }

    return { authContext, loginCallback};
}

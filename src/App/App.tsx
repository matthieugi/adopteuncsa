import React, { ReactElement, useEffect, useState } from "react";
import Login from "../components/login";
import Profile from "../components/profile";
import Signup from '../components/signup';
import { UserProperties } from "../interfaces/userProperties";

import "./App.css";

function App(): ReactElement {
  const [userProperties, setUserProperties] = useState<UserProperties | null>(null);
  
  const fetchUserProperties = async () => {
    const userPropertiesResponse = await fetch('./.auth/me');
    console.log(userPropertiesResponse);

    if(userPropertiesResponse.ok) {
      let userProps : UserProperties =  await userPropertiesResponse.json();
      try {
        userProps.clientPrincipal.profile = await (await fetch(`api/GetUser/${userProps.clientPrincipal.identityProvider}/${userProps.clientPrincipal.userId}`)).json();
      }
      catch {
        console.log('User Not Valid, routing to Singup Page');
      }
      finally{
        setUserProperties(userProps);
      }
    }
  }

  useEffect(() => {
    fetchUserProperties();
  }, [])

  return (
    <div className="app">
      <div className="app-header">
        <div className="app-title">Adopte un CSA</div>
        <div className="app-link">Candidats</div>
        <div className="app-link">Matchs</div>
        { userProperties?.clientPrincipal === null ? 
          <div className="app-login"><a className="loginButton login" href="/.auth/login/aad">Login</a></div> :
          <div className="app-login"><a className="loginButton logout" href="/.auth/logout">Logout</a></div> }
      </div>
      { userProperties?.clientPrincipal === null ? <Login /> : 
        userProperties?.clientPrincipal.profile === undefined ? <Signup fetchUserProperties={fetchUserProperties} /> :
        <Profile />
      }
    </div>
  );
}

export default App;

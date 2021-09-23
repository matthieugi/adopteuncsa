import React, { ReactElement, useEffect, useState } from "react";
import Profile from "../components/profile";
import Signup from '../components/signup';
import { UserProperties } from "../interfaces/userProperties";

import "./App.css";

function App(): ReactElement {
  const [userProperties, setUserProperties] = useState<UserProperties | null>(null);

  useEffect(() => {
    async function fetchUserProperties() {
      const userPropertiesResponse = await fetch('./.auth/me');
      console.log(userPropertiesResponse);
      userPropertiesResponse.ok ? setUserProperties(await userPropertiesResponse.json()) : setUserProperties(null); 
    }
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
      { userProperties?.clientPrincipal === null ? 
        <Signup /> :
      <Profile /> }
    </div>
  );
}

export default App;

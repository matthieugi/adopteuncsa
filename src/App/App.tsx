import React, { ReactElement, useEffect, useState } from "react";
import { UserProfile } from "../interfaces/userProfile";
import Profile from "../components/profile";
import { UserProperties } from "../interfaces/userProperties";

import "./App.css";

function App(): ReactElement {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );

  const [userProperties, setUserProperties] = useState<UserProperties | null>(null);

  useEffect(() => {
    setUserProfile({
      name: "Matthieu Girard",
      pictureUrl:
        "https://images.rtl.fr/~r/880v587/rtl/www/1316834-ben-affleck-dans-la-peau-de-batman.jpeg",
      preferences: [
        { label: "Javascript", rating: 4 },
        { label: "Java", rating: 2 },
        { label: "React", rating: 3 },
        { label: "C#", rating: 1 },
      ],
    } as UserProfile);
  }, []);

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
        { userProperties?.clientPrincipal.userDetails === null ? 
          <div className="app-login"><a className="loginButton login" href="/.auth/login/aad">Login</a></div> :
          <div className="app-login"><a className="loginButton logoff" href="/.auth/logout">Logout</a></div> }
      </div>
      <Profile userProfile={userProfile} />
    </div>
  );
}

export default App;

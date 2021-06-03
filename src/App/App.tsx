import React, { ReactElement, useEffect, useState } from 'react';
import { UserProfile } from '../interfaces/userProfile';
import Profile from '../profile';

import './App.css';

function App(): ReactElement {
  const [profil, setProfil] = useState<UserProfile>({} as UserProfile);

  useEffect(() => {
    setProfil({
      name: 'Matthieu Girard',
      pictureUrl: 'https://images.unsplash.com/photo-1474447976065-67d23accb1e3',
      preferences: {
        javascript: 5,
        java: 3,
        dotnet: 1
      }
    });
  }, [])

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-title">Adopte un CSA</div>
      </div>
        { profil.name && <Profile profil={profil} /> }
      <div>
        <a>🔒</a>
        <a>✔</a>
      </div>
    </div>
  );

}

export default App;

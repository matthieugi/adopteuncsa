import { ReactElement } from 'react';
import Rating from '@material-ui/lab/Rating';
import { UserProfile } from '../interfaces/userProfile';


import './profile.css';

function Profile(props: { profil: UserProfile }): ReactElement {
    return (
        <div className="App-profile">
            <img alt='user profile' src={props.profil.pictureUrl} />
            <h3>{props.profil.name}</h3>
            {
                <div>
                    <div>Javascript : <Rating readOnly={true} value={props.profil.preferences.javascript} /></div>
                    <div>Java : <Rating readOnly={true} value={ props.profil.preferences.java } /></div>
                    <div>Dotnet : <Rating readOnly={true} value={ props.profil.preferences.dotnet } /> </div>
                </div>
            }
        </div>
    );
}

export default Profile;

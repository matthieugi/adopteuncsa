import { ReactElement } from "react";
import { useMatch } from '../../hooks/useMatch';
import Rating from "@material-ui/lab/Rating";
import { UserProfile } from "../../interfaces/userProfile";

import "./profile.css";

function Profile(props: { userProfile: UserProfile }): ReactElement {

  const { candidateProfile, acceptMatch, refuseMatch} = useMatch();

  if(!candidateProfile.preferences) {
      return (<h2>Loading candidate...</h2>);
  } 

  return (
    <div className="profile">
      <img alt="user profile" src={candidateProfile.pictureUrl} />
      <h2 className="name">{candidateProfile.name}</h2>
      <div>
        <h3 className="preference-title">Ses préférences : </h3>
        {candidateProfile.preferences.map((preference) => (
          <div className="preference-row" key={preference.label}>
            <div className="preference-label"> {preference.label} : </div>
            <div className="preference-rating">
              <Rating
                className="rating"
                readOnly={true}
                value={preference.rating}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="actions">
        <button className="actions-refuse" onClick={refuseMatch}> 🔒 </button>
        <button className="actions-accept" onClick={acceptMatch}> ✔ </button>
      </div>
    </div>
  );
}

export default Profile;

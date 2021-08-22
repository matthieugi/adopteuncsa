import { ReactElement } from "react";
import { useMatch } from '../../hooks/useMatch';
import Rating from "@material-ui/lab/Rating";
import { UserProfile } from "../../interfaces/userProfile";
import TinderCard from "react-tinder-card";

import "./profile.css";

function Profile(props: { userProfile: UserProfile }): ReactElement {

  const { candidateProfile, acceptMatch, refuseMatch } = useMatch();

  if(candidateProfile.length === 0) {
      return (<h2>Loading candidate...</h2>);
  } 

  const cardSwipped = async (direction: string) => {
    console.log(direction);
    switch (direction) {
      case 'right': 
        await acceptMatch();
        break;
      case 'left':
        await refuseMatch();
        break;
      default:
        console.log('Unknown side');
    }
  };

  return (
    <div className="profileContainer">
      {candidateProfile.map( (candidateProfile) => 
        <TinderCard key={candidateProfile.name} preventSwipe={['up', 'down']} onSwipe={cardSwipped}>
        <div className="tindercard">
          <img alt="user profile" src={candidateProfile.pictureUrl} />
          <div className="tindercard-overlay">
            <h2 className="name">{candidateProfile.name}</h2>
            <div className="preference-block">
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
          </div>
        </div>
      </TinderCard>
      )}
    </div>
  );
}

export default Profile;

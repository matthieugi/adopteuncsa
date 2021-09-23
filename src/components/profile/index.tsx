import { ReactElement, useState, useEffect } from "react";
import { useMatch } from "../../hooks/useMatch";
import Rating from "@material-ui/lab/Rating";
import { UserProfile } from "../../interfaces/userProfile";
import TinderCard from "react-tinder-card";

import "./profile.css";

function Profile(props: { }): ReactElement {
  const { acceptMatch, refuseMatch, fetchNewCandidates } = useMatch();
  const [candidates, setCandidates] = useState([] as UserProfile[]);

  useEffect(() => { 
    const init = async () => {
      setCandidates(await fetchNewCandidates())
    }
    init();
  }, [fetchNewCandidates]);

  if (candidates.length === 0) {
    return <h2>Loading candidate...</h2>;
  }

  const cardSwipped = async (direction: string) => {
    console.log(direction);
    switch (direction) {
      case "right":
        await acceptMatch();
        break;
      case "left":
        await refuseMatch();
        break;
      default:
        console.log("Unknown side");
    }

    candidates.pop();
    candidates.length < 3 ? setCandidates([...candidates, ...(await fetchNewCandidates()) as  UserProfile[]]) :
      setCandidates([...candidates]);
  };

  return (
    <div className="profileContainer">
      {candidates.map((candidateProfile) => (
        <div className="tindercard">
          <div className="swipe">
            <TinderCard
              key={candidateProfile.name}
              preventSwipe={["up", "down"]}
              onSwipe={cardSwipped}
            >
              <div className="tindercard-profilePicture">
                <img alt="user profile" src={candidateProfile.pictureUrl} />
              </div>
              <div className="tindercard-overlay">
                <h2 className="name">{candidateProfile.name}</h2>
                <div className="preference-block">
                  <h4>Github : { candidateProfile.github }</h4>
                  <h3 className="preference-title">Ses préférences : </h3>
                  {candidateProfile.preferences.map((preference) => (
                    <div className="preference-row" key={preference.label}>
                      <div className="preference-label">
                        {" "}{preference.label} :{" "}
                      </div>
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
            </TinderCard>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;

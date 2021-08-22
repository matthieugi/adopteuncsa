import { useState, useEffect } from "react";
import { UserProfile } from "../interfaces/userProfile";


export const useMatch = () => {
    const [candidateProfile, setCandidateProfile] = useState<UserProfile[]>(
        [] as UserProfile[]
    );

    async function refuseMatch() {
        //TODO: Integrate Refuse Match API
    
        await fetchNewCandidate();
      }
    
      async function acceptMatch() {
        //TODO: Integrate Accept Match API
    
        await fetchNewCandidate();
      }
    

    useEffect(() => {
        async function fetchInitalCandidate() {
          await fetchNewCandidate();
        }
        fetchInitalCandidate();
      }, []);

    async function fetchNewCandidate() {
        //TODO: Integrate Fetch Candidate API
        console.log('fetching new candidate');

        return new Promise((resolve, reject) => {
          setCandidateProfile(
            [{
              name: "Matthieu Girard",
              pictureUrl:
                "https://randomuser.me/api/portraits/lego/1.jpg",
              preferences: [
                { label: "javascript", rating: 5 },
                { label: "java", rating: 3 },
                { label: "dotnet", rating: 1 },
              ],
            },
            {
              name: "Richard Hendricks",
              pictureUrl:
                "https://randomuser.me/api/portraits/lego/7.jpg",
              preferences: [
                { label: "javascript", rating: 5 },
                { label: "java", rating: 3 },
                { label: "dotnet", rating: 1 },
              ],
            },            
            {
              name: "Jared Dunn",
              pictureUrl:
                "https://randomuser.me/api/portraits/lego/6.jpg",
              preferences: [
                { label: "javascript", rating: 5 },
                { label: "java", rating: 3 },
                { label: "dotnet", rating: 1 },
              ],
            },             
            {
              name: "Dinesh Chugtai",
              pictureUrl:
                "https://randomuser.me/api/portraits/lego/3.jpg",
              preferences: [
                { label: "javascript", rating: 5 },
                { label: "java", rating: 3 },
                { label: "dotnet", rating: 1 },
              ],
            }],);

          resolve('fetched new candidate');
        });
      }
    
      return { candidateProfile, acceptMatch, refuseMatch };
}
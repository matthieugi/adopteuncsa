import { useState, useEffect } from "react";
import { UserProfile } from "../interfaces/userProfile";

export const useMatch = () => {
  const [candidateProfile, setCandidateProfile] = useState<UserProfile[]>(
    [] as UserProfile[]
  );

  async function refuseMatch() {
    //TODO: Integrate Refuse Match API

  }

  async function acceptMatch() {
    //TODO: Integrate Accept Match API

  }

  useEffect(() => {
    async function fetchInitalCandidate() {
      await fetchNewCandidates();
    }
    fetchInitalCandidate();
  }, []);

  async function fetchNewCandidates() : Promise<UserProfile[]> {
    //TODO: Integrate Fetch Candidate API
    console.log("fetching new candidate");

    return new Promise((resolve, reject) => {
      resolve([
        {
          name: "Matthieu Girard",
          pictureUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
          github: "@matthieugi",
          preferences: [
            { label: "javascript", rating: 5 },
            { label: "java", rating: 3 },
            { label: "dotnet", rating: 1 },
          ],
        },
        {
          name: "Richard Hendricks",
          pictureUrl: "https://randomuser.me/api/portraits/lego/7.jpg",
          github: "@richard",
          preferences: [
            { label: "javascript", rating: 5 },
            { label: "java", rating: 3 },
            { label: "dotnet", rating: 1 },
          ],
        },
        {
          name: "Jared Dunn",
          pictureUrl: "https://randomuser.me/api/portraits/lego/6.jpg",
          github: "@jared",
          preferences: [
            { label: "javascript", rating: 5 },
            { label: "java", rating: 3 },
            { label: "dotnet", rating: 1 },
          ],
        },
        {
          name: "Dinesh Chugtai",
          pictureUrl: "https://randomuser.me/api/portraits/lego/3.jpg",
          github: "@dinesh",
          preferences: [
            { label: "javascript", rating: 5 },
            { label: "java", rating: 3 },
            { label: "dotnet", rating: 1 },
          ],
        },
      ]);
    });
  }

  return { candidateProfile, acceptMatch, refuseMatch, fetchNewCandidates };
};

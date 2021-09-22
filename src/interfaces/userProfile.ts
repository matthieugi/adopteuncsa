export interface UserProfile {
    name: string,
    pictureUrl: string,
    github: string,
    preferences: { label: string, rating: number }[];
};
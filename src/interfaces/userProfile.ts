export interface UserProfile {
    name: string,
    pictureUrl: string,
    preferences: { label: string, rating: number }[];
};
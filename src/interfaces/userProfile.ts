export interface UserProfile {
    name: string,
    pictureUrl: string,
    preferences: {
        java: number,
        javascript: number,
        dotnet: number,
    }
};
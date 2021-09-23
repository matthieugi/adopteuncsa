export interface UserProperties {
    clientPrincipal: {
        identityProvider: string,
        userId: string,
        userDetails: string,
        userRoles: string[],
        profile: {
            githubId: string,
            technos: [{
                id:number,
                label: string,
                rating: number
            }]
        }
    }
}
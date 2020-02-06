export const RETRIEVING_USERNAME = 'RETREIVING_USERNAME';


export const retrieveUsername = (username) =>{
    return { type: RETRIEVING_USERNAME, payload: username };
}
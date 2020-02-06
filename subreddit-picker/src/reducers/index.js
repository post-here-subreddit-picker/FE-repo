import {RETRIEVING_USERNAME, DELETING_POST, SET_PAST_POSTS} from '../actions'
import {useLocalStorage} from "../hooks/useLocalStorage"
const initialState = {
    username: "",
    id: "",
    pastPosts: [{
        id: "1",
        user_id: "1",
        subreddit_id: null,
        headline: "this is filler data",
        content: "This is filler content"
    }]
}


export const reducer = (state = initialState, action) => {
    switch (action.type){
        case RETRIEVING_USERNAME:
            console.log("This is the username we'll use to find the posts", action.payload)
            return {
                ...state,
                username: action.payload
            }
        case DELETING_POST:
            return state
        
        case SET_PAST_POSTS:
            return {
                ...state,
                pastPosts: action.payload
            }
        default:
            return state
    }
}
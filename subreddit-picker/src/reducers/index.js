import {RETRIEVING_USERNAME} from '../actions'
import {useLocalStorage} from "../hooks/useLocalStorage"
const initialState = {
    username: "",
    id: ""
}


export const reducer = (state = initialState, action) => {
    switch (action.type){
        case RETRIEVING_USERNAME:
            console.log("This is the username we'll use to find the posts", action.payload)
            
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}
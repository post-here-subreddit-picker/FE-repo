import {axiosWithAuth} from "../utils/AxiosWithAuth"
export const RETRIEVING_USERNAME = 'RETREIVING_USERNAME';
export const DELETING_POST = "DELETING_POST";
export const SET_PAST_POSTS = "SET_PAST_POST"
export const retrieveUsername = (username) =>{
    return { type: RETRIEVING_USERNAME, payload: username };
}

export const setPastPost = (pastPosts) => {
    return { type: SET_PAST_POSTS, payload: pastPosts}
}

export const deletePost = (postId) => dispatch => {
    dispatch({type: DELETING_POST, payload: postId});
    axiosWithAuth()
        .delete(`posts/${postId}`)
        .then(res => {
            console.log("successful Deletion", res)
        })
        .catch(err => {
            console.log(err.response)
        })
}
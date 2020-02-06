import axios from 'axios'


export const axiosWithAuth = () => {
    return axios.create({
        baseURL: "http://post-here3.herokuapp.com/api/",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
}
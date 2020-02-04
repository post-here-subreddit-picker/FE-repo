import axios from 'axios'


export const axiosWithAuth = () => {
    return axios.create({
        base: "http://post-here3.herokuapp.com/",
        headers: {
            Authorization: localStorage.getItem("")
        }
    })
}
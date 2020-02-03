import axios from 'axios'


export const axiosWithAuth = () => {
    return axios.create({
        base: "",
        headers: {
            Authorization: localStorage.getItem("")
        }
    })
}
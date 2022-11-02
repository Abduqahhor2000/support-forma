import axios from "axios"

export const baseURL = process.env.REACT_APP_URL
console.log(baseURL);

export const https = axios.create({  
    baseURL : baseURL,
})
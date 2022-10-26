import axios from "axios"

export const baseURL = "http://172.16.1.1:3000/" 

export const https = axios.create({  
    baseURL : baseURL,
})
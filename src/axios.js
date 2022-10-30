import axios from "axios"

export const baseURL = "https://support-project.herokuapp.com/" 

export const https = axios.create({  
    baseURL : baseURL,
})
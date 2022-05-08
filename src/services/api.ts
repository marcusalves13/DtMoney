import axios from "axios";

export const api = axios.create({
    baseURL:'https://dtmoney-rosy.vercel.app/api'
})

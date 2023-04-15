import axios from "axios";

const url = axios.create({
    baseURL: "http://localhost:3000"
})
export default url
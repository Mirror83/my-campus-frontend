import { BASE_URL } from "@/constants"
import axios from "axios"

export default axios.create({
    baseURL: BASE_URL
})
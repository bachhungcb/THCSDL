import axios from "axios";
import { BASE_API } from "../shared/constants/app";

export const Http = axios.create({
    baseURL: BASE_API,
})
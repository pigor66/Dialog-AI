import { User } from "@/types/user"
import axios, { AxiosError } from "axios"

export const reqPost = async (body: User, query: string) => {

    const data = {
        name: body.name,
        email: body.email,
        password: body.password
    }

    try {
        const response = await axios.post(`http://localhost:3000/${query}`, data)
        return {data: response.data, status: response.status}
    } catch (error: unknown) {
        const err = error as AxiosError;
        return {data: null, error: err.response?.data, status: err.response?.status}
    }



}
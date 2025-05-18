import { Login } from "@/types/auth"
import { Register } from "@/types/auth"
import axios, { AxiosError } from "axios"

export const reqRegister = async (body: Register, query: string) => {

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

export const reqLogin = async (body: Login, query: string) => {

    const data = {
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


import { User } from "@/types/user"
import axios from "axios"

export const reqPost = async (body: User, query: string) => {

    const data = {
        name: body.name,
        email: body.email,
        password: body.password
    }

    axios.post(`http://localhost:3000/${query}`, data)
        .then(res => {return {data:res.data}})
        .catch(err => {return {data:err}})
}
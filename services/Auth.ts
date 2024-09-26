import axios from "axios"
import Services from "."
import { Response } from "."
type loginData = {
    email :any,
    password : any
    isAdmin?:boolean
}
const Auth = {
   async resetPassword(email: string) : Promise<Response> {
       return await Services.post("/reset-password",{email})
    },
   async login(data: loginData, isAdmin = true) : Promise<Response> {
        const d = {...data}
        if(isAdmin){
            d.isAdmin = true
        }
        return await Services.post("/auth/login",d) 
    },
    async  verify() : Promise<Response>{
        return await Services.post('/auth/verify',{type:"admin"})
    },
}

export default Auth
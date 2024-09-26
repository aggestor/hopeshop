import Services from "."
import { Response } from "."

const User = {
   async  register(user : Record<string, any>) : Promise<Response>{
        const data = new FormData()
        data.append('name',user.name)
        data.append('email',user.email)
        data.append('password',user.password)
        data.append('tel',user.phone)
        data.append('image',user.image)
        return await Services.post('/u/create',data)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/u/"+id : "/u")
    },
   async search(name:string) : Promise<Response>{
        return await Services.get("/u/search/"+name)
    },
   async update(id: string,user:Record<string, any>):Promise<Response>{
        return await Services.put("/u/"+id,user)
    },
   async updatePasswords(id: string,user:Record<string, any>):Promise<Response>{
        return await Services.put("/u/"+id,user)
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/u/delete/"+id)
    },
   async ban(id: string) : Promise<Response>{
        return await Services.put("/u/ban/"+id)
    },
   async unBan(id: string) : Promise<Response>{
        return await Services.put("/u/un_ban/"+id)
    },
}

export default User
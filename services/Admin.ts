import Services from "."
import { Response } from "."

const Admin = {
   async  register(admin : Record<string, any>) : Promise<Response>{
        return await Services.post('/admin/create',admin)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/admin/"+id : "/admin")
    },
   async search(name:string) : Promise<Response>{
        return await Services.get("/admin/search/"+name)
    },
   async update(id: string,admin:Record<string, any>):Promise<Response>{
        return await Services.put("/admin/"+id,admin)
    },
   async updatePasswords(id: string,admin:Record<string, any>):Promise<Response>{
        return await Services.put("/admin/"+id,admin)
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/admin/delete/"+id)
    },
   async ban(id: string) : Promise<Response>{
        return await Services.put("/admin/ban/"+id)
    },
   async unBan(id: string) : Promise<Response>{
        return await Services.put("/admin/un_ban/"+id)
    },
}

export default Admin
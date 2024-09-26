import Services from "."
import { Response } from "."

const Role = {
   async  create(role : Record<string, any>) : Promise<Response>{
        return await Services.post('/role/create',role)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/role/"+id : "/role")
    },
   async update(id: string,role:Record<string, string|number|boolean>):Promise<Response>{
        return await Services.put("/role/edit/"+id,role)
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/role/delete/"+id)
    },
}

export default Role
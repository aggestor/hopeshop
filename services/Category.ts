import Services from "."
import { Response } from "."

const Category = {
   async  create(data : Record<string, any>) : Promise<Response>{
        return await Services.post('/c/create',data)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/c/"+id : "/c")
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/c/"+id)
    },
}

export default Category
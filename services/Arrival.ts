import Services from "."
import { Response } from "."

const Arrival = {
   async  create(data : Record<string, any>) : Promise<Response>{
        return await Services.post('/arr/create',data)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/arr/"+id : "/arr")
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/arr/"+id)
    },
}

export default Arrival
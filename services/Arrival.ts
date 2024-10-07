import Services from "."
import { Response } from "."

const Arrival = {
   async  create(data : Record<string, any>) : Promise<Response>{
        return await Services.post('/arr/create',data)
    },
   async  addItem(id:string,data : Record<string, any>) : Promise<Response>{
        return await Services.put('/arr/nwitm/'+id,data)
    },
   async  getItems(id:string) : Promise<Response>{
        return await Services.get('/arr/'+id+'/itms')
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/arr/"+id : "/arr")
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/arr/"+id)
    },
    async update(id: string,arr:Record<string, any>):Promise<Response>{
        return await Services.put("/arr/"+id,arr)
    },
   async block(id: string) : Promise<Response>{
        return await Services.put("/arr/block/"+id)
    },
   async unblock(id: string) : Promise<Response>{
        return await Services.put("/arr/unblock/"+id)
    },
}

export default Arrival
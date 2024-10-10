import Services from "."
import { Response } from "."

const Sell = {
   async  add(data : Record<string, any>) : Promise<Response>{
        return await Services.post('/sl/add',data)
    },
   async  addItem(id:string,data : Record<string, any>) : Promise<Response>{
        return await Services.put('/sl/nwitm/'+id,data)
    },
   async  getItems(id:string) : Promise<Response>{
        return await Services.get('/sl/'+id+'/sl')
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/sl/"+id : "/sl")
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/sl/"+id)
    },
    async update(id: string,arr:Record<string, any>):Promise<Response>{
        return await Services.put("/sl/"+id,arr)
    },
   async block(id: string) : Promise<Response>{
        return await Services.put("/sl/block/"+id)
    },
   async unblock(id: string) : Promise<Response>{
        return await Services.put("/sl/unblock/"+id)
    },
}

export default Sell
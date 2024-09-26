import Services from "."

const Location = {
    async get(id?: string){
        return await Services.get(id ?"/location/"+id : "/location")
    },
    async create(data ?:Record<string, any>){
        return await Services.post('/location/create',data)
    },
    async update(id: string,data ?:Record<string, any>){
        return await Services.put('/location/update/'+id,data)
    },
    async remove(id: string){
        return await Services.remove('/location/delete/'+id)
    },
}

export default Location
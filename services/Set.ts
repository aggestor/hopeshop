import api from "."

const Set = {
    async create(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("description",data.description)
        d.append("model",data.model)
        d.append("category",data.category)
        d.append("image",data.image)
        return await api.post("/set/create", d)
    },
    async update(data:any) {
        const d = new FormData()
        d.append("name",data.name || '')
        d.append("description",data.description || '')
        d.append("model",data.model)
        d.append("category",data.category)
        d.append("image",data.image)
        d.append("old_image",data.oldImage)
        d.append("id",data.id)
        return await api.put("/set/update/"+data.id, d)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/set/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async byModel(id:string) {
        return await api.get("/set/by/model/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async get(id?:string) {
        return await api.get(id?"/set/"+id : "/set")
    }
}
export default Set
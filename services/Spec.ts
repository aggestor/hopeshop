import api from "."

const Spec = {
    async create(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("description",data.description)
        d.append("model",data.model)
        d.append("category",data.category)
        d.append("image",data.image)
        return await api.post("/spec/create", d)
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
        return await api.put("/spec/update/"+data.id, d)
    },
    async updateDetail(data:any) {
        return await api.post("/spec/detail/update", data)
    },
    async deleteDetail(id:string) {
        return await api.post("/spec/detail/delete", {id})
    },
    async createDetail(data:any) {
        return await api.post("/spec/d/create", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/spec/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getDetailsBySpec(id:string) {
        return await api.get("/spec/d/all/"+id)
    },
    async byModel(id:string) {
        return await api.get("/spec/by/model/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async get(id?:string) {
        return await api.get(id?"/spec/"+id : "/spec")
    }
}
export default Spec
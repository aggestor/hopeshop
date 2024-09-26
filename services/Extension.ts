import api from "."
const Extension = {
    async create(data : any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("category",data.category)
        d.append("description",data.description)
        d.append("image",data.image)
        return await api.post("/extension/create", d,true)
    },
    async update(data : any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("old_image",data.oldImage)
        d.append("category",data.category)
        d.append("description",data.description)
        d.append("image",data.image)
        return await api.put("/extension/update/"+data.id, d,true)
    },
    async get(id = "") {
        return await api.get(id?"/extension/"+id : "/extension")
    },
    async getByCategory(category : string) {
        return await api.get("/extension/by/category/"+category)
    }
}

export default Extension
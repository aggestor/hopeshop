import api from "."
const Brand = {
    async create(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("description",data.description)
        d.append("image",data.image)
        return await api.post("/mark/create", d,true)
    },
    async update(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("old_image",data.oldImage)
        d.append("image",data.image)
        d.append("description",data.description)
        return await api.put("/mark/update/"+data.id, d,true)
    },
    async get(id = "") {
        return await api.get(id?"/mark/"+id : "/mark")
    },
    async getAll() {
        return await api.get("/mark/all")
    },
}

export default Brand
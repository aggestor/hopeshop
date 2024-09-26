import api from "."
const Model = {
    async create(data:any) {
        console.log(data);
        const d = new FormData()
        d.append("name",data.name )
        d.append("category",data.category )
        d.append("description",data.description )
        d.append("image",data.image)
        return await api.post("/model/create", d,true)
    },
    async update(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("id",data.id)
        d.append("old_image",data.oldImage)
        d.append("category",data.category_id)
        d.append("description",data.description)
        d.append("image",data.image)
        return await api.put("/model/update/"+data.id, d,true)
    },
    async get(id = "") {
        return await api.get(id?"/model/"+id : "/model")
    },
    async getByCategory(category:string) {
        return await api.get("/model/by/category/"+category)
    },
}

export default Model
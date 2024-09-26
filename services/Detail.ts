import api from "."

const Detail = {

    async update(data:any) {
        return await api.post("/detail/update", data)
    },
    async delete(id:string) {
        return await api.remove("/detail/delete/"+id)
    },
    async create(data:any) {
        return await api.post("/detail/create", data)
    },
    async getAll() {
        return await api.get("/detail")
    },
    async getBySpec(id:string) {
        return await api.get("/detail/by/spec/"+id)
    },
    async get(id?:string) {
        return await api.get(id?"/detail/"+id : "/detail")
    }
}
export default Detail
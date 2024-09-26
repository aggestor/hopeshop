import api from "."

const Type = {
    async create(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("description",data.description)
        d.append("extension",data.extension)
        d.append("category",data.category)
        d.append("image",data.image)
        return await api.post("/type/create", d)
    },
    async update(data:any) {
        const d = new FormData()
        d.append("name",data.name)
        d.append("description",data.description)
        d.append("extension",data.extension)
        d.append("category",data.category)
        d.append("image",data.image)
        d.append("old_image",data.oldImage)
        d.append("id",data.id)
        return await api.put("/type/update/"+data.id, d)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/type/all")
    },
    async get(id?:string) {
        return await api.get(id?"/type/"+id : '/type')
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllByExtension(extension: string) {
        return await api.get("/type/by/extension/"+extension)
    },
    async byExtension(extension: string) {
        return await api.get("/type/by_extension/"+extension)
    },
     async searchLinks(category:string, value:string) {
        return await api.post("/type/search-links", {category, term:value})
    },
     async searchLinks_(category:string, value:string) {
        return await api.post("/type/search-links", {category, term:value})
    },
}

export default Type
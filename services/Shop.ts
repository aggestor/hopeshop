import api from "."

const Shop = {
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
     */
    async create(data_ : any) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('email', data_.email)
        data.append('town', data_.town)
        data.append('image', data_.file)
        data.append('owner', data_.owner)
        data.append('level', data_.level)
        data.append('whatsapp', data_.whatsapp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        data.append('categories', data_.pickedCategories)
        
        return await api.post("/shop/create", data)
    },
    /**
     * Updates a shop using some data given by the client
     * @param {{[key:string]:string|number}} _data  shop's informations 
     * @returns 
     */
    async update(data_ : any) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('id', data_.id)
        data.append('town', data_.town)
        data.append('town_name', data_.location)
        data.append('image', data_.image)
        data.append('old_image', data_.oldImage)
        data.append('level', data_.level)
        data.append('whatsapp', data_.whatsApp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        data.append('categories', data_.categories)
        
        return await api.post("/shop/update", data)
    },
    async updateCategorization(id: string, data : Record<string,any>){
        return await api.put('/shop/update/'+id+'/categorization', data)
    },
    async updateLogo(id: string, file : File){
        const formData = new FormData()
        formData.append('image', file)
        return await api.put('/shop/update/'+id+'/logo', formData)
    },
    async changeStatus(id: string){
        return await api.put('/shop/update/'+id+'/status')
    },
    async getAll() {
        return await api.get("/shop/all")
    },
    async showroom() {
        return await api.get("/shop/showroom")
    },
    async get(id ?:string) {
        return await api.get(id ?"/shop/"+id : '/shop')
    },
    async getWithCategoryTree(id ?:string) {
        return await api.get("/shop/with_categories_tree/"+id)
    },
    async getManagers(id :string) {
        return await api.get("/shop/"+id +'/managers')
    },
    async getBranches(id :string) {
        return await api.get("/shop/"+id+'/branches')
    },
}

export default Shop
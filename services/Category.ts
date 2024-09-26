import Services from "."
import { Response } from "."

const Category = {
   async  create(data : Record<string, any>) : Promise<Response>{
    const category = new FormData()
       category.append("name",data.name)
       category.append("description",data.description)
       category.append("image",data.image)
        return await Services.post('/category/create',category)
    },
   async get(id?:string) : Promise<Response>{
        return await Services.get(id ?"/category/"+id : "/category")
    },
   async update(id: string,data:Record<string, any>):Promise<Response>{
    const category = new FormData()
       category.append("name",data.name)
       category.append("description",data.description)
       category.append("image",data.image)
       category.append("old_image",data.oldImage)
        return (await Services.put("/category/update/"+id,category))
    },
   async delete(id: string) : Promise<Response>{
        return await Services.remove("/category/delete/"+id)
    },
}

export default Category
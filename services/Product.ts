import Services, { Response } from "."

const Product = {
    create : async function(data : any){
        return await Services.post('/prd/create', data) as Response
    },
    get: async function (id?:string){
        return await Services.get(id ? '/prd/'+id : '/prd') as Response
    },
    getDetailed: async function (id?:string){
        return await Services.get(id ? '/prd_dlt/'+id : '/prd_dlt') as Response
    },
    remove: async function (id?:string){
        return await Services.remove(id ? '/product/delete/'+id : '/product/'+id) as Response
    }
}

export default Product
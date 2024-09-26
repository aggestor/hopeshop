import Services, { Response } from "."

const Product = {
    create : async function(data : FormData){
        return await Services.post('/product/create', data,true) as Response
    },
    get: async function (id?:string){
        return await Services.get(id ? '/product/'+id : '/product') as Response
    },
    getLookalike : async function(query : string){
        return await Services.get('/product/similar/as'+query)
    },
    getUsingShop : async function(shop:string,query : string){
        return await Services.get('/product/using_shop/'+shop+query)
    },
    setProductToBranc : async function(id:number, branch:number){
        return await Services.put('/product/set_branch/'+id, {branch})
    },
    updateStep1 : async function(id:number, data: Record<string,any>){
        return await Services.put('/product/update_step_1/'+id, data)
    },
    updateStep2 : async function(id:number, data: Record<string,any>){
        return await Services.put('/product/update_step_2/'+id, data)
    },
    updateStep3 : async function(id:number, data: Record<string,any>){
        return await Services.put('/product/update_step_3/'+id, data)
    },
    updateStep4 : async function(id:number, data: FormData){
        return await Services.put('/product/update_step_4/'+id, data)
    },
    remove: async function (id?:string){
        return await Services.remove(id ? '/product/delete/'+id : '/product/'+id) as Response
    }
}

export default Product
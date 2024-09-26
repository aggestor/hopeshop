import axios,{type AxiosResponse, type AxiosError} from "axios"

axios.defaults.withCredentials = true
const baseURL =  process.env.NODE_ENV == "development" ? "http://localhost:8000/api" : 'https://server.muyisphere.com/api'
export const store = process.env.NODE_ENV == "development" ? "http://muyisphere.localhost/storage" : 'https://server.muyisphere.com/storage'
export const storeV2 = process.env.NODE_ENV == "development" ? "http://localhost:8000/uploads" : 'https://v2-server.muyisphere.com/uploads'
const instance = axios.create({baseURL})
export type Response = AxiosError & AxiosResponse<any, any>
    export async function get(path:string){
        try {
            const response = await instance.get(path)
            return response as Response
        } catch (e) {
            return e as Response
        }
    }
    export async function  remove(path:string) {
        try {
            const response = await instance.delete(path)
            return response as Response
        } catch (e) {
            return e as Response
        }
    }
    export async function  post(path:string, body = {}, binary = false) {
        try {
            if (binary) {
                const response = await instance.post(path, body, {headers:{"Content-Type":"multipart/form-data"}})
                return response as Response
            } else {
                 const response = await instance.post(path, body)
                return response as  Response
            }
        }catch(e){
            return e as Response
        }
    }
    export async function  put(path:string, body = {}, binary = false) {
        try {
            if (binary) {
                return await instance.put(path, body, {headers:{"Content-Type":"multipart/form-data"}}) as Response
            } else {
                 return await instance.put(path, body) as Response
            }
        }catch (e) {
            return e as Response
        }
    }

 const Services = {
    post,remove,get,put
 }

export default Services
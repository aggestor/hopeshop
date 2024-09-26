import { store, storeV2 } from "@/services"

export default function parseImage(image:string, suffix:string = 'trees'){
    if(!image || image.includes('placeholder')){
        return "/images/placeholder-no-prod.jpg"
    }else if(image.includes('blob')){
        return image
    }else if(image.includes('IMG_MYS')){
        return storeV2+'/'+suffix+'/'+image
    }
    return storeV2+'/'+image
}
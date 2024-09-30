import React from "react"

export type ButtonProps = {
    text ?: string
    children ?: React.ReactNode
    width?:"full"|"fit"
    type?:"button"|"reset"|"submit"
    disabled?:boolean
    onClick ?:(e:any) => void
}
export type LinkProps = {
    text ?: string
    children ?: React.ReactNode
    width?:"full"|"fit"
    href: string
}
export type UserInfoType = {
    name : string
    type : string
    image :string
    id:string,
    username :string
    mobile: string
    email : string
    status : number
    isRegistered : number
    password : boolean
    createdAt : Date
    updatedAt : Date
}
export type FormInfoType = {
    name ?: string
    description ?: string
    status ? :string
    id ?: number
    formId?:string,
    createdAt ?:string
    updatedAt ?: string
}
export type ListInfoType = {
    name ?: string
    status ? :string
    id ?: number
    listId?:string,
    createdAt ?:string
    updatedAt ?: string
}
export type QuestionInfoType = {
    questionText ?: string
    status ? :string
    option?: string[]
    id ?: number
    fieldType?:string
    formId?:string,
    questionId?:string
    createdAt ?:string
    updatedAt ?: string
}
export type CategoryInfoType = {
    id:string
    name : string
    description : string
    status : number
    createdAt :string
    updatedAt : string
}
declare module "@editorjs/header"
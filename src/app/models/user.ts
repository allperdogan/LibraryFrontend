

export interface User{
    id:number
    firstName:string
    lastName:string
    email:string
    passwordHash:BinaryType[]
    passwordSalt:BinaryType[]
    status:boolean
}
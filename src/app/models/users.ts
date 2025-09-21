export interface User {
    email: string,
    name: string,
    password: string,
    role: 'admin' | 'client'
}
import axios from 'axios'


export interface User {
    id: string,
    email: string
}

class Api {
    // @ts-ignore
    private api

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000'
        });
    }

    public async getUsers(): Promise<User[]> {
        // console.log()
        return await this.api.get("/users/getAllUsers")
    }
}

export default new Api()
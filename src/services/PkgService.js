import axios from "axios";
const BASE_URL= 'api/send-package/';
class packService{
    // get packs
    static getPacks(){
        return new Promise(async (resolve,reject)=>{
            try {
                const res = await axios.get(BASE_URL)
                const data = res.data;
                resolve(data.map(pack => ({
                    ...pack,
                    createdAt: new Date(pack.createdAt)
                })))
            } catch (error) {
                reject(error);
            }
        })
    }
    // create 
    static createPack(pack){
        return axios.post(BASE_URL,pack)
    }
    // delete
    static deletePack(pack_id){
        return axios.delete(`${BASE_URL}${pack_id}`)
    }
    static updatePack(pack_id){
        return axios.put(`${BASE_URL}${pack_id}`)
    }
}
export default packService;
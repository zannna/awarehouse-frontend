import { axiosCoreService } from "../../api/axiosConfig";

export interface Warehouse{
    id: string;
    name: string;
}

const WAREHOUSE_PATH = '/warehouse';
const GROUP_PATH = WAREHOUSE_PATH+'/group';
// function* entries<T>(obj: { [key: string]: T }): IterableIterator<[Group, Warehouse[]]> {
//     for (let key in obj){
      
//         const cos= key as unknown as Group
//         console.log( cos.name)
//         console.log(key)
//         console.log(obj[key] )
//         yield [key as unknown as Group, obj[key] as Warehouse[]];
//     }
// }

export async function getWarehouses(token :string|undefined) : Promise<Warehouse[]>{
    const response = await axiosCoreService.get(
        `${WAREHOUSE_PATH}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    )
    
    return response.data;
}
import { axiosCoreService } from "../../api/axiosConfig";
export interface GroupData {
    id: string;
    name: string;
}
const WAREHOUSE_PATH = '/warehouse';
const GROUP_PATH = WAREHOUSE_PATH+'/group';
const ADMIN_PATH = '/admin'
export async function getAdminGroups(token :string|undefined) : Promise<GroupData[]>{
    const response = await axiosCoreService.get(
        `${GROUP_PATH+ ADMIN_PATH}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );

    return response.data;
}

export interface Warehouse{
    name: string;
    unit: string;
    numberOfRows : number;
    groupIds: string[];
}

export async function createGroup(name :string, token :string|undefined) {
    const response =await axiosCoreService.post(
        `${GROUP_PATH}`,
        {name},
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );
    
    return response.data;
}

export async function createWarehouse( token :string|undefined, warehouse :Warehouse){
    const response =await axiosCoreService.post(
        `${ WAREHOUSE_PATH}`,
        warehouse,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );

    return response.data;
}
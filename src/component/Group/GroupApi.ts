import { axiosCoreService } from "../../api/axiosConfig";
import axios from 'axios';
import { CORE_SERVICE, API_VERSION_URI } from "../../api/axiosConfig";
import { PageableResponse } from "../../types/types";
const WAREHOUSE_PATH = '/warehouse';
const GROUP_PATH = '/group';
const ADMIN_PATH = '/admin'
export interface Group{
    id :string;
    name :string;
}

export interface Warehouse{
    id: string;
    name: string;
}


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

export  interface GroupWithWarehouses {
    group: Group;
    warehouses: Warehouse[];
  }
  export async function getGroupsWithWarehouses(token :string|undefined) : Promise<GroupWithWarehouses[]>{
    const response = await axiosCoreService.get(
        `${WAREHOUSE_PATH}${GROUP_PATH}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );

    return response.data;
}

export async function  addWarehouseToGroup(token :string|undefined, groupId: string, warehouseId: string) : Promise<number>{
    console.log(warehouseId);
    const response = await axiosCoreService.post(
        `${WAREHOUSE_PATH}/${warehouseId}${GROUP_PATH}`,
        {
          id:groupId 
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );
    return response.status;

}

export async function createGroup(name :string, token :string|undefined) {
    console.log(name);
    const response =await axiosCoreService.post(
        `${WAREHOUSE_PATH}${GROUP_PATH}`,
        {name},
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );
    
    return response;
}

export async function removeWarehouseFromGroup(token :string|undefined, groupId: string, warehouseId: string) : Promise<number>{
    const response = await axiosCoreService.delete(
        `${WAREHOUSE_PATH}/${warehouseId}${GROUP_PATH}/${groupId}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );
    return response.status;
}

export async function removeGroup(token :string|undefined, groupIds: string[]) : Promise<number>{
    const response = await axiosCoreService.delete(
        `${WAREHOUSE_PATH}${GROUP_PATH}/${groupIds.join(',')}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
      }
  );
  return response.status;
}    
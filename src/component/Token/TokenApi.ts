import { axiosCoreService } from "../../api/axiosConfig";
import axios from 'axios';
import { CORE_SERVICE, API_VERSION_URI } from "../../api/axiosConfig";
import { PageableResponse } from "../../types/types";
const WAREHOUSE_PATH = '/warehouse';
const GROUP_PATH = '/group';
const ADMIN_PATH = '/admin'
export interface AdminWorkers{
    id :string;
    name :string;
   workers: Worker[];
};
export interface Worker{
    workerEntityId :string;
    id :string;
    name :string;
    surname :string;
    role :string;
};

export async function getAdminWarehousesAndGroup(token :string|undefined) : Promise<AdminWorkers[]>{
    const response = await axiosCoreService.get(
        `${ADMIN_PATH} `,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    )
    
    return response.data;
}

const TOKEN_PATH = "/sharing-token";
export async function  getSharingToken(token :string|undefined, id: string) : Promise<string>{
    const response = await axiosCoreService.get(
        `${TOKEN_PATH}/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    )

    return response.data.sharingToken;
}

export async function changeRole(token :string|undefined, id: string, roleData: string) :Promise<number>{
    const role= roleData.toUpperCase();
    const response = fetch( `${CORE_SERVICE}${API_VERSION_URI}${ADMIN_PATH}/${id}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
        },
          body:  JSON.stringify({role})
      })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.status;
      });

      return response;
      
} 

export async function removeWorker(token :string|undefined, workerEntityIds: string[]) :Promise<number>{
    const response = await axiosCoreService.delete(
        `${ADMIN_PATH}/${workerEntityIds.join(',')}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    )
    return response.status;
}

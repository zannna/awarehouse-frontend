import { axiosCoreService, GROUP_PATH, WAREHOUSE_PATH, REPORT_PATH, CORE_SERVICE, API_VERSION_URI} from "../../api/axiosConfig";
import { GroupData, Warehouse } from "../../types/types";
export  interface GroupWithWarehouses {
    group: GroupData;
    warehouses: Warehouse[];
  }

  export interface GroupsAndWarehouses{
    groupWithWarehouses: GroupWithWarehouses[];
    warehousesWithoutGroup: Warehouse[];
  }

  export async function getGroupsAndWarehouses(token :string|undefined) : Promise<GroupsAndWarehouses>{
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
export interface ReportData{
id?: string;
reportScopeId?: string;   
reportScope?: string;
reportInterval: string;
email: string;
entityName?: string;
}
export async function createReport(token: string|undefined, report: ReportData) : Promise<void>{
 const respone= fetch( `${CORE_SERVICE}${API_VERSION_URI}${REPORT_PATH}/understock`,{
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
    },
     body: JSON.stringify(report) 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  return respone;

}

export async function getReports(token :string|undefined) : Promise<ReportData[]>{
  const response = await axiosCoreService.get(
      `${REPORT_PATH}`,
      {
          headers: {
              'Authorization': `Bearer ${token}`
            }
      }
  );

  return response.data;
}

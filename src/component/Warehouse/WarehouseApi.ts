import { axiosCoreService } from "../../api/axiosConfig";
export interface Dimensions{
    width: number;
    height: number;
    length: number;
}

export interface Shelf {
    id: string;
    number: number;
    name: string;
    size: boolean;
    dimensions: Dimensions;
    unit: string;
    sameSizeTiers: boolean;
    row: number;
    tiers: Tier[];
  }
  export interface Tier{
    id: string;
    number:  number;
    name :string;
    size :boolean;
    dimensions: Dimensions;
 }
  export interface ShelfCreation {
    number: number;
    name: string;
    size: boolean;
    dimensions: Dimensions;
    unit: string;
    sameSizeTiers: boolean;
    tiers: TierCreation[];
  }
  
  export interface TierCreation{
     number:  number;
     name :string;
     size :boolean;
     dimensions: Dimensions;
  }

  const WAREHOUSE_PATH = '/warehouse';
  const SHELF_PATH = '/shelf';

export async function createShelf(token :string|undefined,warehouseId : string ,data: ShelfCreation) : Promise<Shelf>{
    const response = await axiosCoreService.post(
        `${WAREHOUSE_PATH}/${warehouseId}${SHELF_PATH}`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );

    return response.data;
}

export async function getShelves(token :string|undefined, warehouseId :string) : Promise<Shelf[]>{
    const response = await axiosCoreService.get(`${WAREHOUSE_PATH}/${warehouseId}${SHELF_PATH}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    return response.data;
}
const TIER_PATH = '/tier';
export async function removeTier(token :string|undefined, warehouseId :string, shelfId :string, tierId :string){
    await axiosCoreService.delete(`${WAREHOUSE_PATH}/${warehouseId}${SHELF_PATH}/${shelfId}${TIER_PATH}/${tierId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
}

export async function removeShelf(token :string|undefined, warehouseId :string, shelfId :string){
    await axiosCoreService.delete(`${WAREHOUSE_PATH}/${warehouseId}${SHELF_PATH}/${shelfId}`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
}

export async function getRowsNumber(token :string|undefined, warehouseId :string) : Promise<number>{
    const response = await axiosCoreService.get(`${WAREHOUSE_PATH}/${warehouseId}/row`,{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    return response.data;
}

export async function addRow(token :string|undefined, warehouseId :string) : Promise<number>{
    const response = await axiosCoreService.put(
        `${WAREHOUSE_PATH}/${warehouseId}/row?rowsNumber=1`, // Przekazanie rowsNumber jako parametru zapytania
        {}, // Puste ciało żądania, jeśli nie jest wymagane
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    return response.request.status;
}

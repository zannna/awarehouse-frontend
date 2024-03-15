import { axiosCoreService } from "../../api/axiosConfig";
import axios from 'axios';
import { CORE_SERVICE, API_VERSION_URI } from "../../api/axiosConfig";
import { PageableResponse } from "../../types/types";
export interface CreateProductData {
    email: string;
    name: string;
    surname: string;
    password: string;
}
export interface  Price{
    amount: number;
    currency: string;   
}
export interface Dimensions{
    width?: number;
    height?: number;
    length?: number;
}
export interface ProductWarehouse{
    productWarehouseId?: string;
    warehouseName? :string;
    row?: number;
    amount?: number;
    shelfNumber?: number;
    tierNumber?: number;
}
export interface Group{
    id :string;
    name :string;
}
export interface ProductCreation{
    id?: string;
    title: string;
    amountGroup: number;
    groupId: string;
    price :Price;
    dimensions: Dimensions;
    productWarehouses:  ProductWarehouseCreationDto[];   
    image?: string;
}
export interface ProductWarehouseCreationDto{
    productWarehouseId?: string;
    warehouseId?: string;
    warehouseName? :string;
    amount?: number;
    shelfNumber?: number;
    tierNumber?: number;
}
export interface Product{
    id? :string;
    title?: string;
    amountGroup?: number;
    image? :string;
    group?: Group;
    price? :Price;
    dimensions?: Dimensions;
    productWarehouses?: ProductWarehouse[];   
}
const PRODUCT_PATH = '/product';
export async function createProduct(token :string|undefined, file :File|undefined, data:  ProductCreation) : Promise<Product>{
    const formData = new FormData();
    if (file) {
        formData.append('file', file);
    }
   formData.append('product', JSON.stringify(data)); 
    const response = await axios.post(
        `${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}`,
        formData,
        {
            headers: {
                'Authorization': `Bearer ${token}`
              }
        }
    );

    return response.data;
}

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
const SEARCH_PATH = '/search';
export async function getProducts(
    token: string | undefined,
    warehouseIds: string[],
    sortConditions: { [key: string]: string } = {},
    searchElements: { [key: string]: string } = {},
    page = 0,
    size = 1
  ): Promise<PageableResponse<Product>> {

      const requestBody = {
          warehouseIds: warehouseIds,
          sortConditions: sortConditions,
          searchConditions: searchElements,
          page,
          size
      };
  
      const response = await axiosCoreService.post(`${PRODUCT_PATH}${SEARCH_PATH}?page=${page}&size=${size}`, requestBody, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
  console.log(response);
      return response.data;
  }
  const BASE_GROUP_PATH = '/group';
  export async function getProductsByGroup(
    token: string | undefined,
    sortConditions: { [key: string]: string } = {},
    searchElements: { [key: string]: string } = {},
    groupIds: string[],
    page = 0,
    size = 1
  ): Promise<PageableResponse<Product>> {

      const requestBody = {
          sortConditions: sortConditions,
          searchConditions: searchElements,
          groupIds: groupIds,
          page,
          size
      };
  
      const response = await axiosCoreService.post(`${PRODUCT_PATH}${SEARCH_PATH}${BASE_GROUP_PATH}?page=${page}&size=${size}`, requestBody, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      return response.data;
    }
  

  const MOVE_PATH = '/move';

  export interface MoveProductsDto {
    productWarehouseMoveInfos: ProductWarehouseMoveInfo[];
    warehouseId: string;
    shelfNumber: number;
    tierNumber: number;
  }
  
  export interface ProductWarehouseMoveInfo {
    productWarehouseId: string;
    amount: number;
  }

  export async function moveProducts(token: string | undefined, data: MoveProductsDto): Promise<Response> {
    const response = await fetch(`${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}${MOVE_PATH}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred while creating the report');
    }
     
    return response;
  }

    export interface BasicGroupInfoDto {
        id: string;
        name: string;
      }
      
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
            `${GROUP_PATH}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
        );
  
        return response.data;
    }

    export interface RemoveProductsDto {
        productIds: string[];
        productWarehouseIds: string[];
    }

    export async function removeProducts(token: string | undefined, data: RemoveProductsDto): Promise<number> {
        const response = await axios.delete(
            `${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                  data: data
            }
        );
    
        return response.status;
        
      }

      export interface RowWithProductsDto {
        row: number;
        shelves: ShelfWithProductsDto[];
      }

      export interface ShelfWithProductsDto {
        id: string; 
        number: number;
        name: string;
        hasFreeSpace: boolean;
        tiers: TierWithProductsDto[];
      }
      
      export interface TierWithProductsDto {
        id: string;
        number: number;
        name: string;
        occupiedVolume: number;
        products: ProductInTierDto[];
      }
      
      export interface ProductInTierDto {
        id: string;
        title: string;
        amount: number;
        image: string;
      }
      

      export async function getProductsByTier(token: string | undefined, warehouseId: string, page = 0, size = 1): Promise<PageableResponse<RowWithProductsDto>> {
        const response = await axiosCoreService.get(
            `${PRODUCT_PATH}${WAREHOUSE_PATH}/${warehouseId}?page=${page}&size=${size}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
        );
    
        return response.data;
      }

      const FREE_PLACE_PATH = '/free-place';
        const SHELF_PATH = '/shelf';
        export interface FreePlaceDto {
            height: number;
            width: number;
            length: number;
            amount: number;
            warehouseIds: string[];
        }

    export async function getFreePlaces(token: string | undefined, warehouseId: string, freePlaceDto : FreePlaceDto): Promise<PageableResponse<ShelfWithProductsDto[]>> {
        const requestBody = {
            freePlaceDto : freePlaceDto,
        };
        const response = await axiosCoreService.post(
            `${WAREHOUSE_PATH}/${warehouseId}${SHELF_PATH}${FREE_PLACE_PATH}`,
            requestBody,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            }
        );
    
        return response.data;
      }

      export async function  updateProduct(token :string|undefined, file :File|undefined, data:  Product) : Promise<Product>{
        const url = `${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}/`;
        const formData = new FormData();
        console.log( data)

        if (file) {
          formData.append('file', file);
        }
      
        formData.append('product', new Blob([JSON.stringify(data)], { type: "application/json" }));
      
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      
      
        console.log(response);
        return await response.json(); 


      }
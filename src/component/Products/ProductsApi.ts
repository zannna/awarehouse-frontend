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
    title: string;
    amountGroup: number;
    groupId: string;
    price :Price;
    dimensions: Dimensions;
    productWarehouses:  ProductWarehouseCreationDto[];   
}
export interface ProductWarehouseCreationDto{
    warehouseId?: string;
    warehouseName? :string;
    amount?: number;
    shelfNumber?: number;
    tierNumber?: number;
}
export interface Product{
    id? :string;
    title?: string;
    amount?: number;
    image? :string;
    group?: Group;
    price? :Price;
    dimensions?: Dimensions;
    productWarehouses?: ProductWarehouse[];   
}
const PRODUCT_PATH = '/product';
export async function createProduct(token :string|undefined, file :File|undefined, data:  ProductCreation) : Promise<Product>{
    console.log({"title":"cbc"});
    const formData = new FormData();
    if (file) {
        formData.append('file', file);
    }
   formData.append('product', JSON.stringify(data)); // Konwersja danych produktu na ciąg JSON
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

// export async function getProduct() : Promise<Product[]>{
//     const response = await axiosCoreService.get(`${PRODUCT_PATH}`);
//     return response.data;
// }

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
    groupIds: string[],
    page = 0,
    size = 1
  ): Promise<PageableResponse<Product>> {

      const requestBody = {
          warehouseIds: warehouseIds,
          sortConditions: sortConditions,
          searchConditions: searchElements,
          groupIds: groupIds,
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

  export async function moveProducts(token: string | undefined, data: MoveProductsDto): Promise<void> {
      fetch( `${CORE_SERVICE}${API_VERSION_URI}${PRODUCT_PATH}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json'
        },
         body: JSON.stringify(data) 
      })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      })
      
    }

    export interface BasicGroupInfoDto {
        id: string;
        name: string;
      }
      
      export  interface GroupWithWarehouses {
        group: GroupData;
        warehouses: Warehouse[];
      }
      export async function getGroupsWithWarehouses(token :string|undefined) : Promise<GroupWithWarehouses[]>{
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

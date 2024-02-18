import { axiosCoreService } from "../../api/axiosConfig";
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
    width: number;
    height: number;
    length: number;
}
export interface ProductWarehouse{
    warehouseId :string;
    amount: number;
    shelfNumber: number;
    tierNumber: number;
}
export interface Group{
    id :string;
    name :string;
}
export interface ProductCreation{
    title: string;
    amountGroup: number;
    photo: string;
    groupId: string;
    price :Price;
    dimensions: Dimensions;
    productWarehouses: ProductWarehouse[];   
}
export interface Product{
    id :string;
    title: string;
    amount: number;
    photo: string;
    group: Group;
    price :Price;
    dimensions: Dimensions;
    productWarehouses: ProductWarehouse[];   
}
const PRODUCT_PATH = '/product';
export async function createProduct(token :string|undefined, data:  ProductCreation) : Promise<Product>{
    const response = await axiosCoreService.post(
        `${PRODUCT_PATH}`,
        data,
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

import { axiosCoreService } from "../../api/axiosConfig";
export interface CreateProductData {
    email: string;
    name: string;
    surname: string;
    password: string;
}
export interface Product{

}
const PRODUCT_PATH = '/product';
export async function createProduct(data: CreateProductData){
    const response = await axiosCoreService.post(
        `${PRODUCT_PATH}`,
        data
    );

    return response.data;
}

export async function getProduct() : Promise<Product[]>{
    const response = await axiosCoreService.get(`${PRODUCT_PATH}`);
    return response.data;
}
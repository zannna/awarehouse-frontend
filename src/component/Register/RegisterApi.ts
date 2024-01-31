import { axiosCoreService } from "../../api/axiosConfig";
export interface CreateRegistrationData {
    email: string;
    firstName: string;
    surname: string;
    password: string;
}
const REGISTRATIONS_PATH = '/auth/register';
export async function createRegistration(data: CreateRegistrationData){
    const response = await axiosCoreService.post(
        `${REGISTRATIONS_PATH}`,
        data
    );

    return response.data;
}
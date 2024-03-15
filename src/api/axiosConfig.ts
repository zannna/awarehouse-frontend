import axios from 'axios';

export const API_VERSION_URI = '/api/v1';

export const CORE_SERVICE = 'http://localhost:8080';

export const GROUP_PATH = '/group';

export const WAREHOUSE_PATH = '/warehouse';

export const REPORT_PATH = '/report';

export const PRODUCT_PATH = '/product';

export const axiosCoreService = axios.create({
    baseURL: CORE_SERVICE+ API_VERSION_URI,
    headers: {
        'Content-Type': 'application/json'
    },
});


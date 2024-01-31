import axios from 'axios';

const API_VERSION_URI = '/api/v1';

export const CORE_SERVICE = 'http://localhost:8080'

export const SUBSCRIPTION_PATH = '/subscriptions'
export const PAYMENT_PATH = '/payments'
export const CONFERENCE_PATH = '/conferences'
export const REGISTRATIONS_PATH = '/registrations';

export const axiosCoreService = axios.create({
    baseURL: CORE_SERVICE+ API_VERSION_URI,
    headers: {
        'Content-Type': 'application/json'
    },
});

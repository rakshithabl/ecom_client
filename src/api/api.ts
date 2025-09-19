import { getToken } from '@/config/AuthConfig';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API,
});

console.log(`API URL: ${API}`);

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth APIs
const AppLogin = () => axiosInstance.post('/login');
const AppRegister = (user: any) => axiosInstance.post('/register', user);

// Product APIs
const allProducts = () => axiosInstance.get('/products/all');
const addProduct = (product: any) => axiosInstance.post('/products/add', product);
const editProduct = (product: any, id: string) => axiosInstance.put(`/products/edit/${id}`, product);
const deleteProduct = (id: string) => axiosInstance.delete(`/products/delete/${id}`);

// User APIs
const allUsers = () => axiosInstance.get('/user/getAll');
const addUser = (user: any) => axiosInstance.post('/user/addUser', user);
const editUser = (user: any, id: string) => axiosInstance.put(`/user/editUser/${id}`, user);
const deleteUser = (id: string) => axiosInstance.delete(`/user/delete/${id}`);
const getUserByID = (id: string) => axiosInstance.get(`/user/get/${id}`);

// Order APIs
const allOrders = () => axiosInstance.get('/orders/allDetails');
const addOrder = (user: any) => axiosInstance.post('/orders/save', user);

export {
    AppLogin,
    AppRegister,
    allProducts,
    addProduct,
    editProduct,
    deleteProduct,
    allUsers,
    addUser,
    editUser,
    deleteUser,
    allOrders,
    addOrder,
    getUserByID
};

import axiosClient from './axiosClient';

const productApi = {
    getAll: () => {
        const url = 'api/products';
        return axiosClient.get(url);
    },
    get: (id) => {
        const url = `api/products/${id}`;
        return axiosClient.get(url);
    },
    delete: (id) => {
        const url = `api/products/${id}`;
        return axiosClient.delete(url)
    },
    update: (id, data) => {
        const url = `api/products/${id}`;
        return axiosClient.put(url, data);
    },
    create: (data) => {
        const url = 'api/products';
        return axiosClient.post(url, data)
    }
}

export default productApi;
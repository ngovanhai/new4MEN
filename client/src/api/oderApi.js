import axiosClient from './axiosClient';

const oderApi = {
    getAll: (page,limit) => {
        const url = `/api/oder?page=${page}&limit=${limit}`;
        return axiosClient.get(url)
    },
    createOder: (cart) => {
        const url = '/api/oder';
        return axiosClient.post(url, cart)
    },
    updateOder: (id) => {
        const url = `/api/oder/${id}`
        return axiosClient.put(url)
    }
}

export default oderApi;
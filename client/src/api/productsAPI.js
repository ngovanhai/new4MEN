import axiosClient from './axiosClient';

const productApi = {
    getAll: (page,category) => {
        let url;
        if(category){
             url = `api/products?page=${page}&limit=${9}&phanloai=${category}`;
        }else{
            url = `api/products?page=${page}&limit=${9}&phanloai=`;
        }
        
       
        return axiosClient.get(url);
    },
    search: (text) =>{
       const  url = `api/search?search=${text}`;
        return axiosClient.get(url);
    },
    getproductAdmin:(data)  => {
        const url = `api/productsAdmin?page=${data.page}&limit=${data.rowsPerPage}&sort=${data.sort}&phanloai=${data.category}`;
       return axiosClient.get(url);
    },
    getSearchProduct:(search) =>{
        const url = `api/products?search=${search}`;
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
        console.log("data",data);
        const url = `api/products/${id}`;
        return axiosClient.put(url, data);
    },
    create: (data) => {
        const url = 'api/products';
        return axiosClient.post(url, data)
    }
}

export default productApi;
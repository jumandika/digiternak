import axios from "axios";
import { URL } from "./BaseUrl"


const requestData = axios.create({ baseURL: URL });


const generalRegistration = async (body) => {
    try {
        const response = await requestData.post('auth/register/general', body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
    }
}

const staffRegistration = async (body) => {
    try {
        const response = await requestData.post('auth/register/staff', body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const phoneLogin = async (body) => {
    try {
        const response = await requestData.post('auth/otp/phone', body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const verifyOTP = async (body) => {
    try {
        const response = await requestData.post('/auth/otp/verify', body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getCompany = async (number, id) => {
    try {
        const response = await requestData.get(`/auth/companys/${number}?id=${id}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getUserDetail = async (userId) => {
    try {
        const response = await requestData.get(`/users/details?users_id=${userId}`);
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const getProduct = async (user_id) => {
    try {
        const response = await requestData.get(`/product/list?users_id=${user_id}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getCategory = async (user_id) => {
    try {
        const response = await requestData.get(`/product/category`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}
const getProductPerCat = async (user_id, id) => {
    try {
        const response = await requestData.get(`/product/categorys/list?users_id=${user_id}&categorys1=${id}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getDetailProduct = async (user_id, product_id) => {
    try {
        const response = await requestData.get(`/product/detail?users_id=${user_id}&products_id=${product_id}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const addCart = async (body) => {
    try {
        const response = await requestData.post(`/product/cart/create`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const updateCart = async (body) => {
    try {
        const response = await requestData.post(`/product/cart/update`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const deleteCart = async (body) => {
    // {
    //     "users_id" :"cd5a8e91-7d0a-46bc-acda-8776014dfba7",
    //     "carts_id" : "3"
    // }
    try {
        const response = await requestData.post(`/product/cart/delete`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getCart = async (userId) => {
    try {
        const response = await requestData.get(`/product/cart/list?users_id=${userId}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}
const getAddress = async (userId) => {
    try {
        const response = await requestData.get(`/users/address/list?users_id=${userId}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const addAddress = async (body) => {
    // {
    //     "users_id":"ea8d7f3b-0adc-4e13-a4b2-7e4835b63b09",
    //     "address" :"Jln Damai",
    //     "zipcode" :"12820",
    //     "note"    :"deket lapangan",
    //     "lat"     :"129.203949",
    //     "long"    :"98.293840",
    //     "type"    :"0",
    // }
    try {
        const response = await requestData.post(`/users/address/create`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}



const selectAddress = async (body) => {
    // {
    //     "users_id"      :"ea8d7f3b-0adc-4e13-a4b2-7e4835b63b09",
    //     "address_id"    :"1"
    // }
    try {
        const response = await requestData.post(`/users/address/priority`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}



const deleteAddress = async (body) => {
    // {
    //     "users_id"      :"ea8d7f3b-0adc-4e13-a4b2-7e4835b63b09",
    //     "address_id"    :"1"
    // }
    try {
        const response = await requestData.post(`/users/address/delete`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const getVoucherList = async (body) => {
    // {
    //     "users_id"      :"ea8d7f3b-0adc-4e13-a4b2-7e4835b63b09",
    // }
    try {
        const response = await requestData.post(`/marketing/voucher/list`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const selectVoucher = async (body) => {
    // {
    //     "users_id":"798e8983-2ef8-437e-9fcf-4135bd487d70",
    //     "vouchers_id" : "2"
    // }
    try {
        const response = await requestData.post(`/marketing/voucher/list`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const removeVoucher = async (body) => {
    // {
    //     "users_id":"798e8983-2ef8-437e-9fcf-4135bd487d70",
    //     "vouchers_id" : "2"
    // }
    try {
        const response = await requestData.post(`/marketing/voucher/delete`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getCheckout = async (userId) => {
    try {
        const response = await requestData.get(`/transaction/checkout?users_id=${userId}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}


const submitTransaction = async (body) => {
    // {
    //     "users_id" :"fcf1fea3-8ff5-49d3-b95c-5a29bbaf100d",
    //     "address_id" : "11",
    //     "payments_id" : "10",
    //     "dates_id" : "1"
    // }
    try {
        const response = await requestData.post(`/transaction/checkout/process`, body)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}

const getTransactionList = async (userId) => {
    // console.log(`/transaction/list?users_id=${userId}`)
    try {
        const response = await requestData.get(`/transaction/list?users_id=${userId}`)
        // console.log('response', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}
const getTransactionDetail = async (userId, transactionId) => {
    // console.log(`/transaction/list/details?users_id=${userId}&transactions_id=${transactionId}`)

    try {
        const response = await requestData.get(`/transaction/list/details?users_id=${userId}&transactions_id=${transactionId}`)
        // console.log('response getTransactionDetail', JSON.stringify(response));
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
            throw new Error("An error has occurred");
        }
    } catch (error) {
        console.error(error);
        return error;
    }
}



export {
    generalRegistration,
    staffRegistration,
    phoneLogin,
    verifyOTP,
    getCompany,
    getUserDetail,
    getProduct,
    getProductPerCat,
    getCategory,
    getDetailProduct,
    addCart,
    updateCart,
    deleteCart,
    getCart,
    getAddress,
    addAddress,
    selectAddress,
    deleteAddress,
    getVoucherList,
    selectVoucher,
    removeVoucher,
    getCheckout,
    submitTransaction,
    getTransactionList,
    getTransactionDetail
}
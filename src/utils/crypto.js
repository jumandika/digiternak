import CryptoJS from "react-native-crypto-js";


const encrypt = (data, secretKey) => {

    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData
}

const decrypt = (data, secretKey) => {
    let bytes = CryptoJS.AES.decrypt(data, secretKey);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData;
}

export { encrypt, decrypt }
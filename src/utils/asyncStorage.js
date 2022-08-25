import AsyncStorage from '@react-native-async-storage/async-storage';


const setLocalString = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value)
    } catch (e) {

        console.error(e)
        // saving error
    }
}

const setLocalObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
        console.error(e)
        // saving error
    }
}


const getLocalString = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`)
        if (value !== null) {
            return value
            // value previously stored
        }
    } catch (e) {
        console.error(e)
        // error reading value
    }
}

const getLocalObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
        // error reading value
    }
}

const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
        return keys
    } catch (e) {
        // read key error
    }
}


export { setLocalString, getLocalString, setLocalObject, getLocalObject, getAllKeys }
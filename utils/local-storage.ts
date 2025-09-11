import AsyncStorage from "@react-native-async-storage/async-storage"

export async function storeData(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log("Feil med storeData()" + e)
    }
}

export async function getData(key: string) {
    try {
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
            console.log("Data: " + data)
            return data
        } else {
            console.log("Ingen data funnet")
        }
    } catch (e) {
        console.log("Feil med getData()" + e)
    }
}

export async function removeData(key: string) {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log("Feil med removeData()" + e)
    }
}
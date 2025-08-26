import { storage } from "../../../lib/storage";
import { AuthData } from "../types";

const StorageKeys = {
    AccessToken: 'accessToken'
}

export const AuthStorage = {
    getAccessToken() {
        return storage.get(StorageKeys.AccessToken)
    },
    saveAuthData(data: AuthData) {
        Object.keys(StorageKeys).forEach((key) => {
            const storageKey = StorageKeys[key as keyof typeof StorageKeys];

            if (storageKey in data) {
                storage.set(storageKey, data[storageKey as keyof AuthData]);
            }
        });
    },
    clearAuthData() {
        Object.values(StorageKeys).forEach(key => {
            storage.remove(key)
        })
    }
}
const prefix = 'muz_';

export const storage = {
    get: (key: string) => {
        const value = localStorage.getItem(prefix + key);
        if(value) {
            return JSON.parse(value);
        }
    },
    set: (key: string, value: any) => {
        localStorage.setItem(prefix + key, JSON.stringify(value));
    },
    remove: (key: string) => {
        localStorage.removeItem(prefix + key)
    }
}
import { session } from "../lib/session";
import { SavedFilters } from "../types/SavedFilters";

const searchKey = 'savedFilters';

export const getSavedFilters = (key: string) => {
    const cached = session.get(searchKey) as SavedFilters;

    if(cached && cached.key === key) {
        return cached.value;
    }

    return null;
}

export const setSavedFilters = (key: string, value: any) => {
    session.set(searchKey, {
        key,
        value
    })
}

export const removeSavedFilters = () => {
    session.remove(searchKey);
}
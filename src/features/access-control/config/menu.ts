import { MenuItem } from "../types";

export const systemMenus: MenuItem[] = [
    {
        label: 'Artist',
        key: 'artist',
        path: '/artist',
        icon: 'musician',
        subject: 'Artist',
    },
    {
        label: 'Release',
        key: 'release',
        path: '/release',
        icon: 'album',
        subject: 'Album',
    }
    ,
    {
        label: 'Songs',
        key: 'songs',
        path: '/songs',
        icon: 'song',
        subject: 'Song',
    }
    ,
    {
        label: 'User',
        key: 'user',
        path: '/user',
        icon: 'group',
        subject: 'User',
    }
]
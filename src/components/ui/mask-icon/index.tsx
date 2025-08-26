const song = '/icons/song.svg';
const album = '/icons/album.svg';
const group = '/icons/group.svg';
const musician = '/icons/musician.svg';
const release = '/icons/release.svg';
const home = '/icons/home.svg';
const plus = '/icons/plus.svg';

import { cn } from "../../../lib/utils";

export type MaskIconName = | 'song' | 'album' | 'group' | 'musician' | 'release' | 'home' | 'plus';

const icons: Record<MaskIconName, string> = { song, album, group, musician, release, home, plus }

interface MaskIconProps {
    name: MaskIconName;
    size?: number;
    color?: string;
    className?: string;
}

const MaskIcon: React.FC<MaskIconProps> = ({ name, size, color = 'bg-dark', className, ...props }) => {
    const iconUrl = icons[name];

    return (
        <div
            className={cn('mask-ico', className, color)}
            style={{ 
                ...(size && { width: size, height: size }), 
                maskImage: `url(${iconUrl})`,
                WebkitMaskImage: `url(${iconUrl})`,
                maskSize: 'cover',
                WebkitMaskSize: 'cover'
            }}
            {...props}
        />
    )
}

export default MaskIcon;
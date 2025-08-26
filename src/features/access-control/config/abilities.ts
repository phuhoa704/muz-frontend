import { AbilityBuilder, createMongoAbility, MongoAbility } from "@casl/ability";
import { Actions, Role, Subjects } from "../types";

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const defineAbilitiesFor = (roles: Role[]) => {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    roles.forEach(role => {
        switch (role.key) {
            case 'account_manager':
                can('manage', 'User');
                break;
            case 'artist_manager':
                can('manage', 'Artist');
                break;
            case 'album_manager':
                can('manage', 'Album');
                break;
            case 'song_manager':
                can('manage', 'Song');
                break;
            default:
                can('manage', 'all');
        }
    });

    return build();
}
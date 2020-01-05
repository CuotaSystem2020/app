import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id: 'alumnos',
                title: 'Alumnos',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'person',
                url: '/alumnos'
            },
        ]
    }
];

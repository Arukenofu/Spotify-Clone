import type {CreateFolderOptions} from "../scripts/createTypesByFolder";

export default [
    {
        name: 'PanelsName',
        path: 'src/features/InfoPanel/Panels',
        extension: '.vue'
    },
    {
        name: 'FormatTypes',
        path: 'src/features/MedialibSidebar/Formats',
        extension: '.vue'
    }
] satisfies CreateFolderOptions[];
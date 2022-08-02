import { Tag } from 'modules/tags/utilities/types';

export interface NotebookMeta {
    tags: Tag[]
}

export interface Notebook {
    title: string
    meta: NotebookMeta
    createdAt: string
}

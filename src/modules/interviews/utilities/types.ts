import { Tag } from 'modules/tags/utilities/types';

export interface InterviewMeta {
    tags: Tag[]
}

export interface Interview {
    title: string
    notes: string
    meta: InterviewMeta
    createdAt: string
}

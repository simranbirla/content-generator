export type TPost = {
    text: string,
    userId: number,
    displayPictureUrl?: string,
    id?: number,
    createdAt: Date,
    contentType: ContentType
}


export enum ContentType {
    TWITTER = 'twitter',
    INSTAGRAM = 'instagram',
    LINKEDIN = 'linkedin'
}

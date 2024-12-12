export type TPost = {
    text: string,
    userId: number,
    displayPictureUrl?: string,
    id?: number,
    contentType: ContentType
}


export enum ContentType {
    TWITTER = 'twitter',
    INSTAGRAM = 'instagram',
    LINKEDIN = 'linkedin'
}

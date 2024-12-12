import { TUser } from "@/types/user"
import { db } from "."
import { Posts, Users } from "./schema"
import { eq } from "drizzle-orm"
import { TPost } from "@/types/posts"

export const getUser = async (user: TUser) => {

    try {
        const [userFound] = await db.select().from(Users).where(eq(Users.email, user.email))

        if (!userFound) {
            const [newUser] = await db.insert(Users).values({
                name: user.name,
                email: user.email,
                displayPictureUrl: user.displayPictureUrl
            }).returning()

            return newUser;
        }

        return userFound
    } catch (e) {
        console.log('Error getting user', e)
        return null
    }
}

export const createPosts = async (post: TPost) => {

    try {
        const [newPost] = await db.insert(Posts).values({
            text: post.text,
            userId: post.userId,
            displayPictureUrl: post.displayPictureUrl ?? ''
        }).returning()


        return newPost

    } catch (e) {
        console.log('Error creating posts', e)
        return null
    }
}

export const getPostsByUserId = async (userId: number) => {

    try {
        const posts = await db.select().from(Posts).where(eq(Posts.userId, userId)).execute()
        return posts

    } catch (e) {
        console.log('Error getting posts', e)
        return [] as TPost[]
    }
}
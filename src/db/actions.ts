import { TUser } from "@/types/user"
import { db } from "."
import { Users } from "./schema"
import { eq } from "drizzle-orm"

export const getUser = async (user: TUser) =>{

    const [userFound] = await db.select().from(Users).where(eq(Users.email, user.email))

    if(!userFound) {
        const [newUser] = await db.insert(Users).values({
            name: user.name, 
            email: user.email,
            displayPictureUrl: user.displayPictureUrl
        }).returning()
    
        return newUser;
    }

    return userFound
   
}
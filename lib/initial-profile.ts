import { RedirectToSignIn } from "@clerk/nextjs";  // Clerk RedirectToSignIn component
import { db } from "@/lib/db";  // Import your database
import { currentUser } from '@clerk/nextjs/server'

export const initialProfile = async () => {  // Explicitly type req
    const user = await currentUser();  // Correctly pass req to getAuth

    if(!user) {
        return RedirectToSignIn;
    }

    // Fetch profile from the database
    const profile = await db.profile.findUnique({ where: { userId: user.id } });
    if (profile) {
        return profile;
    }
    
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    return newProfile;
} ;

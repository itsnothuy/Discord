import { NextApiRequest } from 'next';  // Import type for req
import { getAuth } from "@clerk/nextjs/server";  // Clerk getAuth function
import { RedirectToSignIn, RedirectToSignUp } from "@clerk/nextjs";  // Clerk RedirectToSignIn component
import { db } from "@/lib/db";  // Import your database

export const initialProfile = async (req: NextApiRequest) => {  // Explicitly type req
    const { userId } = getAuth(req);  // Correctly pass req to getAuth

    if (!userId) {
        // Correct usage of RedirectToSignIn as a component with returnUrl prop
        return RedirectToSignUp;
    }

    // Fetch profile from the database
    const profile = await db.profile.findUnique({ where: { userId } });
    return profile;
};

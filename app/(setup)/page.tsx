import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// Type guard to check if the profile has an 'id'
function isProfileWithId(profile: any): profile is { id: string } {
    return profile && typeof profile.id === "string";
}

const SetupPage = async () => {
    const profile = await initialProfile();

    if (!isProfileWithId(profile)) {
        return (
            <div>
                Error: Profile is not valid or does not have an ID.
            </div>
        );
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            Create a Server
        </div>
     );
}
 
export default SetupPage;
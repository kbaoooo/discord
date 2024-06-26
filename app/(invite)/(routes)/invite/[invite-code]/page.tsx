import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        'invite-code': string
    }
}

const InviteCodePage = async ({params} : InviteCodePageProps) => {
    const profile = await currentProfile();

    if(!profile) {
        return auth().redirectToSignIn()
    }

    if(!params['invite-code']) {
        return redirect("/")
    }

    const existingServer= await db.server.findFirst({
        where: {
            inviteCode: params['invite-code'],
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(existingServer) {
        redirect(`/servers/${existingServer.id}`)
    }

    const server = await db.server.update({
        where: {
            inviteCode: params['invite-code']
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    return null;
}

export default InviteCodePage;

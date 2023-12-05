import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigaion-item";
import { ModeToggle } from "@/components/mode_toggle";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div
                        key={server.id}
                        className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="flex flex-col items-center pb-3 mt-auto gap-y-4">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[48px] w-[48px]",
                        },
                    }}
                />
            </div>
        </div>
    );
};

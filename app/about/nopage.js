"use client";

import { Spacer } from "@nextui-org/react";
import TeamMemberCard from "./team-member-card";
import CenteredNavbar from "../helper/components/navbars/sitenavbar/sitenavbar";

const teamMembers = [
    {
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
        role: "CEO",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        social: {
            twitter: "@john-doe",
            linkedin: "john-doe",
            github: "@john-doe",
        },
    },
    {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?u=a04258ab4e29066708c",
        role: "CTO",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        social: {
            twitter: "@jane-doe",
            linkedin: "jane-doe",
            github: "@jane-doe",
        },
    },
    {
        name: "Robert Doe",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29066708c",
        role: "Principal Designer",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
        social: {
            twitter: "@robert-doe",
            linkedin: "robert-doe",
            github: "@robert-doe",
        },
    },
];

export default function Component() {
    return (
        <div className="relative flex h-screen min-h-dvh w-full flex-col gap-9 overflow-y-auto bg-background p-4 md:gap-12 md:px-10 md:py-[34px]">
            <CenteredNavbar />
            <section className="flex flex-col items-center justify-center py-16 bg-white">
                <div className="flex flex-col items-center text-center max-w-2xl w-full">
                    <h1 className="text-3xl font-semibold text-gray-800">Meet our team</h1>
                    <Spacer y={2} />
                    <p className="text-base text-gray-600">
                        Our philosophy is to build a great team and then empower them to do great things.
                    </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} {...member} />
                    ))}
                </div>
            </section>
        </div>
    );
}

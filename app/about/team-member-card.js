"use client";

import React from "react";
import {Avatar, Link} from "@nextui-org/react";
import {Icon} from "@iconify/react";
import {cn} from "@nextui-org/react";

const TeamMemberCard = React.forwardRef(
  ({children, avatar, name, role, bio, social, className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center rounded-large bg-content1 px-4 py-6 text-center shadow-small",
        className,
      )}
      {...props}
    >
      <Avatar className="h-20 w-20" src={avatar} />
      <h3 className="mt-2 font-medium">{name || children}</h3>
      <span className="text-small text-default-500">{role}</span>
      <p className="mb-4 mt-2 text-default-600">{bio}</p>
      <div className="flex gap-4">
        {social?.twitter && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:twitter" width={20} />
          </Link>
        )}

        {social?.linkedin && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:linkedin" width={20} />
          </Link>
        )}

        {social?.github && (
          <Link isExternal href="#">
            <Icon className="text-default-400" icon="bi:github" width={20} />
          </Link>
        )}
      </div>
    </div>
  ),
);

TeamMemberCard.displayName = "TeamMemberCard";

export default TeamMemberCard;

"use client";

import React from "react";
import {Avatar, Badge, Button, Link, Tooltip} from "@nextui-org/react";
import {useClipboard} from "@nextui-org/use-clipboard";
import {Icon} from "@iconify/react";

import {cn} from "./cn";

const MessageCard = React.forwardRef(
  (
    {
      avatar,
      message,
      attempts = 1,
      currentAttempt = 1,
      status,
      onMessageCopy,
      onAttemptChange,
      className,
      messageClassName,
      ...props
    },
    ref,
  ) => {
    const [feedback, setFeedback] = React.useState();
    const [attemptFeedback, setAttemptFeedback] = React.useState();

    const messageRef = React.useRef(null);

    const {copied, copy} = useClipboard();

    const failedMessageClassName =
      status === "failed" ? "bg-danger-100/50 border border-danger-100 text-foreground" : "";
    const failedMessage = (
      <p>
        Something went wrong, if the issue persists please contact us through our help center
        at&nbsp;
        <Link href="mailto:songrichard99@gmail.com" size="sm">
          songrichard99@gmail.com
        </Link>
      </p>
    );

    const hasFailed = status === "failed";

    const handleCopy = React.useCallback(() => {
      let stringValue = "";

      if (typeof message === "string") {
        stringValue = message;
      } else if (Array.isArray(message)) {
        message.forEach((child) => {
          // @ts-ignore
          const childString =
            typeof child === "string" ? child : child?.props?.children?.toString();

          if (childString) {
            stringValue += childString + "\n";
          }
        });
      }

      const valueToCopy = stringValue || messageRef.current?.textContent || "";

      copy(valueToCopy);

      onMessageCopy?.(valueToCopy);
    }, [copy, message, onMessageCopy]);

    return (
      <div {...props} ref={ref} className={cn("flex gap-3", className)}>
        <div className="relative flex-none">
          <Badge
            isOneChar
            color="danger"
            content={<Icon className="text-background" icon="gravity-ui:circle-exclamation-fill" />}
            isInvisible={!hasFailed}
            placement="bottom-right"
            shape="circle"
          >
            <Avatar src={avatar} />
          </Badge>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div
            className={cn(
              "relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600",
              failedMessageClassName,
              messageClassName,
            )}
          >
            <div ref={messageRef} className={"pr-20 text-small"}>
              {hasFailed ? failedMessage : message}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MessageCard;

MessageCard.displayName = "MessageCard";

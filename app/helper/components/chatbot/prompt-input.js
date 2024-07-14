"use client";

import React from "react";
import {Textarea} from "@nextui-org/react";

import {cn} from "./cn";

const PromptInput = React.forwardRef(({classNames = {}, ...props}, ref) => {
  return (
    <Textarea
      ref={ref}
      aria-label="Prompt"
      className="min-h-[40px]"
      classNames={{
        ...classNames,
        label: cn("hidden", classNames?.label),
        input: cn("py-0", classNames?.input),
      }}
      minRows={1}
      placeholder="Enter a prompt here"
      radius="lg"
      variant="bordered"
      {...props}
    />
  );
});

export default PromptInput;

PromptInput.displayName = "PromptInput";

"use client";
import React, { useState } from "react";
import { PlaygroundComponent } from ".";
import { CommandUserInput, CommandUserInputKeybind } from "./fcs-ui/cli-input";

export const CLIInput = () => {
  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const replaceWithMusou = (input: string) => {
      const pattern = /(^|\n)(mu|musou|ms) /g;
      const checkedValue = input.replace(pattern, "$1夢想 ");
      return checkedValue;
    };

    const musouCheckedValue = replaceWithMusou(event.target.value);

    setInput(musouCheckedValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInput("");
  };

  const keyBinds: CommandUserInputKeybind[] = [
    {
      bindLabel: "Submit", // because this is a form submission, we need to use the "Submit" bindLabel and we don't need to specify an action
      key: "Enter",
      modifier: ["ctrlKey", "metaKey"],
    },
    {
      bindLabel: "Musou",
      key: "m",
      modifier: ["ctrlKey"],
      action: () => {
        console.log("夢想");
      },
    },
  ];

  return (
    <CommandUserInput
      onChange={handleChange}
      value={input}
      onSubmit={handleSubmit}
      keyBinds={keyBinds}
      placeholder="Type musou..."
      inputClassName="bg-VoidBlack placeholder:text-OffWhite-dark text-xs"
    />
  );
};

export const CLIInput_Playground_Info: PlaygroundComponent = {
  component: CLIInput as React.ElementType,
  title: "FCS CLI Input",
  description:
    "Simple expandable cli input component for use in FCS UI components.",
  dependencies: ["shadcn/text-area", "shadcn/button", "@radix-ui/react-icons"],
  type: "component",
};

import { Textarea } from "@/components/ui/textarea";
import { useComposedRefs } from "./compose-refs";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import React, { RefObject, createRef, useRef } from "react";
import { useAutoAdjustTextArea } from "./useAutoAdjustTextArea";
import { KeyBind, useKeyboardShortcuts } from "./useKeyboardShortcuts";
import { Button } from "@/components/ui/button";

type BaseKeyBind = Omit<KeyBind, "action">; // Base type without the action property

type SubmitKeyBind = BaseKeyBind & {
  bindLabel: "Submit";
  action?: (e: KeyboardEvent, ref: RefObject<HTMLTextAreaElement>) => void;
};

type NonSubmitKeyBind = KeyBind & {
  bindLabel: Exclude<string, "Submit">;
};

export type CommandUserInputKeybind = SubmitKeyBind | NonSubmitKeyBind;

export interface CommandUserInputProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "value" | "onSubmit"
  > {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  placeholder?: string;
  keyBinds?: CommandUserInputKeybind[];
  nonInteractable?: boolean;
  inputClassName?: string;
}
export const CommandUserInput = React.forwardRef<
  HTMLTextAreaElement,
  CommandUserInputProps
>(
  (
    {
      className,
      onChange,
      value,
      onSubmit,
      placeholder,
      keyBinds = [],
      nonInteractable,
      disabled,
      inputClassName,
      ...props
    },
    forwardedRef
  ) => {
    const localRef = useRef<HTMLTextAreaElement>(null);
    const ref = useComposedRefs<HTMLTextAreaElement>(forwardedRef, localRef);
    useAutoAdjustTextArea(localRef, value, 208); //? This hook dynamically adjusts a textarea's height to fit its content, based on height constraints.
    const submitButtonRef: RefObject<HTMLButtonElement> = createRef();
    // Function to determine if the form input is valid
    const canSubmit = validInput(value);

    // Determines whether the text area is disabled
    // If nonInteractable is true, the text area is disabled regardless of the 'disabled' prop
    // If nonInteractable is false, the 'disabled' prop controls the disabled state of the text area
    const textAreaIsDisabled = nonInteractable ? true : disabled;

    // Determines whether the submit button is disabled
    // If the text area is disabled (either due to nonInteractable being true or 'disabled' being true),
    // the button is also disabled
    // If the text area is not disabled, the button's disabled state depends on the validity of the input
    // i.e., the button is disabled if the input is not valid
    const buttonisDisabled = textAreaIsDisabled ? true : !canSubmit;

    const submitAction = () => {
      if (submitButtonRef.current && canSubmit) {
        submitButtonRef.current.click();
      }
    };
    const updatedKeyBinds = keyBinds.map<KeyBind>((bind) =>
      updateSubmitAction(bind, submitAction)
    );
    useKeyboardShortcuts(updatedKeyBinds, localRef);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        const textArea = localRef.current;
        if (textArea) {
          const cursorPosition = textArea.selectionStart;
          const textBeforeCursor = textArea.value.substring(0, cursorPosition);
          const textAfterCursor = textArea.value.substring(cursorPosition);

          // Check if the text after the cursor consists only of spaces or new lines
          const isOnlySpacesOrNewLines = /^[\s\n]*$/.test(textAfterCursor);

          //? Submit if the cursor is at the end of a word and the rest of the text is empty
          if (!textBeforeCursor.endsWith(" ") && isOnlySpacesOrNewLines) {
            event.preventDefault();
            submitAction();
          }
          // Otherwise, this allows default behavior (new line)
        }
      }
    };

    return (
      <form className={cn("grid w-full gap-2", className)} onSubmit={onSubmit}>
        <div className="relative flex items-center group">
          <Textarea
            ref={ref}
            id="prompt-textarea"
            rows={1}
            className={cn(
              "pr-8 scroll-pr-8 text-base md:text-sm font-mono resize-none min-h-[42px] sm:min-h-9 overflow-auto border  border-OffWhite/[33] transition-colors duration-500  focus:scroll-pr-8 focus:border-input focus:rounded focused:h-auto text-OffWhite/75 hover:text-OffWhite",
              nonInteractable
                ? "disabled:cursor-default disabled:opacity-100"
                : "",
              inputClassName
            )}
            disabled={textAreaIsDisabled}
            value={value}
            onKeyDown={handleKeyDown}
            onChange={onChange}
            placeholder={placeholder ? placeholder : "Message Musou..."}
            {...props}
          />
          <Button
            disabled={buttonisDisabled}
            ref={submitButtonRef}
            className={cn(
              "h-[42px] md:h-9 absolute z-20 px-2 right-0 top-0 grid place-items-center",
              nonInteractable
                ? "disabled:cursor-default disabled:pointer-events-none disabled:opacity-100"
                : ""
            )}
            type="submit"
            variant={"link"}
          >
            <ArrowUpIcon className="h-4 w-4 text-OffWhite-dark hover:text-OffWhite-light transition-colors duration-500" />
          </Button>
        </div>
      </form>
    );
  }
);

CommandUserInput.displayName = "CommandUserInput";

// Validates if user should be allowed to submit
function validInput(input: string | undefined) {
  return input && input.length > 0;
}

// Updates the submit keybind action
function updateSubmitAction(
  bind: CommandUserInputKeybind,
  submitAction: () => void
): KeyBind {
  if (bind.bindLabel === "Submit") {
    // Explicitly return a KeyBind type for the 'Submit' case
    return {
      ...bind,
      action: submitAction,
    };
  } else {
    // Use type assertion for non-'Submit' cases
    return bind as KeyBind;
  }
}
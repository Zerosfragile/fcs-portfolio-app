import React, { FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: {
    state: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const EmailForm = ({ afterSave }: { afterSave: () => void }) => {
  const [saving, setSaving] = React.useState(false);
  const openEmailClient = ({
    name,
    email,
    message,
  }: {
    name: string;
    email: string;
    message: string;
  }) => {
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`;
    window.location.href = `mailto:info@FragileServices.com?subject=Contact from ${name}&body=${encodeURIComponent(
      emailBody
    )}`;
  };

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.currentTarget)) as {
      name: string;
      email: string;
      message: string;
    };
    setSaving(true);
    openEmailClient(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    afterSave();
  }

  return (
    <form
      id="Contact"
      action="index.html"
      method="post"
      className="flex min-h-full flex-col"
      onSubmit={submitEmail}
    >
      <fieldset disabled={saving} className="group flex h-full flex-col">
        <input
          name="name"
          type="text"
          className="
              duration-250 my-[2.5vh] w-full appearance-none border-0 border-b-2 border-LunarGrey-darkest bg-transparent px-[3.75px] py-[7.5px] 
              font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite outline-none transition-all ease-linear 
              hover:border-OffWhite hover:text-[13.5px] hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none active:text-[13.5px] group-disabled:opacity-50
            "
          placeholder="NAME"
          required={true}
        />
        <input
          name="email"
          type="email"
          className="
              duration-250 my-[2.5vh] w-full appearance-none border-0 border-b-2 border-LunarGrey-darkest bg-transparent px-[3.75px] py-[7.5px] 
              font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite outline-none transition-all ease-linear 
              hover:border-OffWhite hover:text-[13.5px] hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none active:text-[13.5px] group-disabled:opacity-50
            "
          placeholder="E-MAIL"
          required={true}
        />
        <textarea
          name="message"
          className="
                  duration-250 my-[2.5vh] flex min-h-max w-full flex-grow resize-none appearance-none border-0 border-b-2 border-LunarGrey-darkest 
                  bg-transparent px-[5px] py-[10px] font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite outline-none transition-all ease-linear 
                  hover:border-OffWhite hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none group-disabled:opacity-50
                "
          placeholder="MESSAGE"
          required={true}
        ></textarea>

        <div className="flex justify-between max-lg:flex-wrap">
          <span className="cursor-pointer font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite transition-all duration-100 ease-linear hover:text-OffWhite-dark max-lg:text-[10px]">
            info@FragileServices.com
          </span>
          <button
            type="submit"
            className="
                duration-250 transition-margin duration-1 truncate rounded-md border-2 border-LunarGrey bg-transparent px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] 
                text-[11.25px] font-normal  text-OffWhite-dark transition-all ease-linear hover:border-OffWhite-dark hover:text-OffWhite group-disabled:cursor-default group-disabled:opacity-50 max-lg:mx-0 max-lg:my-4 max-lg:w-full max-lg:text-xs
              "
            name="submit"
          >
            <span className="hidden group-disabled:block">
              Sending Message...
            </span>
            <span className="group-disabled:hidden">Initilize Contact</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
};

const HudEmail = ({ open }: Props) => {
  return (
    <Dialog.Root open={open.state} onOpenChange={open.set}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-VoidBlack/[.25] backdrop-blur-sm data-[state=closed]:animate-[dialog-hide_1000ms] data-[state=open]:animate-[dialog-show_1000ms]" />
        <Dialog.Content
          className="hud-border fixed left-1/2 top-1/2 z-30 flex h-1/2 w-[calc(100%-78px)] md:w-6/12 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden p-12 
        backdrop-blur data-[state=closed]:animate-[dialog-hide_1000ms] data-[state=open]:animate-[dialog-show_1000ms] max-md:p-5"
        >
          <Dialog.Title className="hidden">HUD-Email</Dialog.Title>
          <div className="flex flex-row-reverse">
            <Dialog.Close
              aria-label="Close"
              className="cursor-pointer font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite-dark hover:text-OffWhite hover:underline max-md:text-[10px]"
              onClick={() => open.set(false)}
            >
              Close
            </Dialog.Close>
          </div>
          <EmailForm afterSave={() => open.set(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HudEmail;

import React, { FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: {
    state: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const HudEmail = ({ open }: Props) => {
  const [saving, setSaving] = React.useState(false);
  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.currentTarget));
    console.log(data);
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  }

  return (
    <Dialog.Root open={open.state} onOpenChange={open.set}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-VoidBlack/[.25] backdrop-blur-sm" />
        <Dialog.Content className="hud-border fixed left-1/2 top-1/2 z-30 flex h-1/2 w-6/12 -translate-x-1/2 -translate-y-1/2 flex-col p-12 backdrop-blur max-md:p-5">
          <Dialog.Title className="hidden">HUD-Email</Dialog.Title>
          <form
            id="Contact"
            action="index.html"
            method="post"
            className="flex min-h-full flex-col"
            onSubmit={submitEmail}
          >
            <div className="flex flex-row-reverse">
              <Dialog.Close
                aria-label="Close"
                className="cursor-pointer font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite-dark hover:text-OffWhite hover:underline max-md:text-[10px]"
                onClick={() => open.set(!open.state)}
              >
                Close
              </Dialog.Close>
            </div>
            <fieldset disabled={saving} className="group flex h-full flex-col">
              <input
                name="name"
                type="text"
                className="
              duration-250 my-[2.5vh] w-full appearance-none border-0 border-b-2 border-LunarGrey-darkest bg-transparent px-[3.75px] py-[7.5px] 
              font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite outline-none transition-all ease-linear 
              hover:border-OffWhite hover:text-[13.5px] hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none active:text-[13.5px]
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
              hover:border-OffWhite hover:text-[13.5px] hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none active:text-[13.5px]
            "
                placeholder="E-MAIL"
                required={true}
              />
              <textarea
                name="message"
                className="
                  duration-250 my-[2.5vh] flex min-h-max w-full flex-grow resize-none appearance-none border-0 border-b-2 border-LunarGrey-darkest 
                  bg-transparent px-[5px] py-[10px] font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite outline-none transition-all ease-linear 
                  hover:border-OffWhite hover:text-OffWhite focus:border-OffWhite focus:text-OffWhite focus:outline-none
                "
                placeholder="MESSAGE"
                required={true}
              ></textarea>

              <div className="flex justify-between max-md:flex-wrap">
                <span className="cursor-pointer font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite transition-all duration-100 ease-linear hover:text-OffWhite-dark max-md:text-[10px]">
                  info@FragileServices.com
                </span>
                <button
                  type="submit"
                  className="
                duration-250 transition-margin duration-1 rounded-md border-2 border-LunarGrey bg-transparent px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] 
                text-[11.25px] font-normal text-OffWhite-dark transition-all ease-linear hover:border-OffWhite-dark hover:text-OffWhite group-disabled:cursor-default group-disabled:opacity-10 max-md:mx-0 max-md:my-4 max-md:w-full max-md:text-xs
              "
                  name="submit"
                >
                  Initilize Contact
                </button>
              </div>
            </fieldset>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HudEmail;

//Todo
// Mount - Unmount Animations
//? Child animations
//Form SubmitEmail function

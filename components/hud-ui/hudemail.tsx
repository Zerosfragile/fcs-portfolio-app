import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

type Props = {
  open: {
    state: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
const submitEmail = () => {};

const HudEmail = ({ open }: Props) => (
  <Dialog.Root open={open.state}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-20 bg-VoidBlack/[.25] backdrop-blur-sm" />
      <Dialog.Content className="hud-border fixed left-1/2 top-1/2 z-30 flex h-1/2 w-6/12 -translate-x-1/2 -translate-y-1/2 flex-col p-12 backdrop-blur max-md:p-5">
        <Dialog.Title className="hidden">HUD-Email</Dialog.Title>
        <form
          id="Contact"
          action="index.html"
          method="post"
          className="flex min-h-full flex-col"
        >
          <div className="flex flex-row-reverse">
            <Dialog.Close
              aria-label="Close"
              className="cursor-pointer font-[CygnitoMono-011] text-[11.25px] font-normal text-OffWhite-dark hover:text-OffWhite hover:underline max-md:text-[10px]"
              onClick={() => open.set((prev) => !prev)}
            >
              Close
            </Dialog.Close>
          </div>
          <input
            id="Name"
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
            id="Email"
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
            id="Message"
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
            <input
              type="button"
              className="
                duration-250 transition-margin duration-1 rounded-md border-2 border-LunarGrey bg-transparent px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] 
                text-[11.25px] font-normal text-OffWhite-dark transition-all ease-linear hover:border-OffWhite-dark hover:text-OffWhite max-md:mx-0 max-md:my-4 max-md:w-full max-md:text-xs
              "
              name="button"
              onClick={() => alert("SubmitEmail()")}
              value="Initilize Contact"
            />
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default HudEmail;

//Todo
// Mount - Unmount Animations
//? Child animations
//Form SubmitEmail function

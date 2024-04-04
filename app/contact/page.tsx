"use client";
import Link from "next/link";
import TranslateWrapper from "@/components/hud-ui/translatewrapper";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { socials, tags } from "@/lib/marcus";
import { useHudState } from "@/components/hud-ui/hud-state-context";

export default function Contact() {
  const { setOpenEmail } = useHudState();

  return (
    <div className="w-full flex justify-center ">
      <div className="max-md:max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10">
        <div className="w-full">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none text-left">
              Marcus Lim
            </h4>
            <p className="text-sm text-muted-foreground text-left">
              Fullstack Developer
            </p>

            <TranslateWrapper
              wrapperClassName="max-w-[500px] w-[80vw]"
              className="py-2 gap-x-4 gap-y-1 w-full "
              repeat={3}
              duration={20}
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </TranslateWrapper>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <Button
                variant="outline"
                className="w-full"
                key={social.name}
                asChild
              >
                <Link href={social.link}>
                  <social.icon className="mr-2 h-4 w-4" />
                  {social.name}
                </Link>
              </Button>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpenEmail(true)}
            >
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

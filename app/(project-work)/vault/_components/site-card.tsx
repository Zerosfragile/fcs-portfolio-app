import Image from "next/image";
import React from "react";
import { InspirationSiteResource } from "@/lib/vault/sites/inspiration";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InfoCircledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/fcs-seperator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function SiteCard(props: InspirationSiteResource) {
  return (
    <TooltipProvider>
      <Sheet>
        <SheetTrigger className="rounded-xl focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2">
          <CardContent {...props} />
        </SheetTrigger>
        <CardSheet {...props} />
      </Sheet>
    </TooltipProvider>
  );
}

function CardContent({
  title,
  description,
  context,
  category,
  icon,
  preview,
  lastEdited,
  url,
  external_links,
}: InspirationSiteResource) {
  const lastEditedDate = lastEdited ? new Date(lastEdited) : new Date();

  return (
    <div className="w-full h-fit border border-LunarGrey-dark relative overflow-hidden rounded-xl bg-LunarGrey-darkest p-1 font-mono flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-lg box-border group">
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden z-10 transition-all duration-200 ease-linear group-hover:grid place-items-center gap-2">
          <InfoCircledIcon className="animate-pulse h-4 w-4" />
          <p className="w-full md:w-[350px] text-center text-xs text-OffWhite/60">
            {description || url}
          </p>
        </div>
        <Image
          alt={title + " site preview"}
          src={preview ? preview : "/posts/missing.png"}
          width="1200"
          height="630"
          className="group-hover:grayscale group-hover:brightness-50 group-hover:blur-sm transition-all duration-200 ease-linear select-none"
        />
        <div className="w-full h-10 gap-3 absolute bottom-0 px-4 left-0 z-10 transition-all duration-1000 delay-200 ease-linear whitespace-nowrap flex justify-between items-center flex-nowrap box-border bg-gradient-to-t from-VoidBlack/75 via-VoidBlack/50 via-[66%] to-transparent group-hover:from-transparent group-hover:via-transparent">
          <div className="text-OffWhite overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
            {title}
          </div>
          <div className="text-OffWhite/50 overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
            {lastEditedDate.toLocaleDateString("en-US", {
              month: "long",
            }) +
              " " +
              lastEditedDate.getFullYear()}
          </div>
        </div>
      </div>
      <Link
        href={url}
        target="_blank"
        className="flex items-center justify-center p-2 rounded-lg whitespace-nowrap text-ellipsis bg-LunarGrey-dark/30 hover:bg-LunarGrey-dark text-OffWhite/75  hover:text-OffWhite/80 transition-all duration-200 ease-linear flex-nowrap gap-2 text-sm font-semibold"
      >
        Vist Site
        <ArrowRightIcon className="h-4 w-4 text-OffWhite/50 " />
      </Link>
    </div>
  );
}

function CardSheet({
  title,
  description,
  context,
  category,
  icon,
  preview,
  lastEdited,
  url,
  external_links,
}: InspirationSiteResource) {
  return (
    <SheetContent className="md:m-2 h-[100dvh-16px] overflow-y-auto overflow-x-visible bg-OffWhite/25 backdrop-blur-md border-OffWhite/10 supports-[backdrop-filter]:bg-OffWhite/5 rounded-md xl:min-w-[25vw] xl:w-[25vw]">
      <section className=" md:m-4">
        <SheetHeader>
          <SheetTitle className="max-sm:text-left">{title}</SheetTitle>
          <SheetDescription className="text-OffWhite/60 max-sm:text-left">
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          <div className="flex w-full rounded-sm shadow-sm text-xs font-mono resize-none min-h-9 border border-OffWhite/25  p-2 scroll-p-1 transition-colors duration-500 text-OffWhite/75 hover:text-OffWhite bg-OffWhite/10">
            <Avatar className="mr-1 h-4 w-4">
              <AvatarImage src={icon ? icon : "/images/001-Down_Hands.png"} />
              <AvatarFallback>i</AvatarFallback>
            </Avatar>{" "}
            = [ {category.join(", ") || ""} ]
          </div>

          <Separator className="py-2" />

          {context ? (
            <div className="flex flex-col gap-2 mb-2 md:mb-10">
              <label htmlFor="context" className="text-sm text-OffWhite/75">
                Notes:
              </label>
              <p className="text-xs text-OffWhite/50" id="context">
                {context}
              </p>
            </div>
          ) : null}
        </div>

        <Tooltip>
          <TooltipTrigger className="rounded-md focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2">
            <Link href={url} target="_blank">
              <Image
                alt={title + " site preview"}
                src={preview ? preview : "/posts/missing.png"}
                width="1200"
                height="630"
                className="rounded-md brightness-50 hover:brightness-100  border border-OffWhite/50 transition-all duration-200 ease-linear"
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="hidden sm:block">
            <p className="w-[350px] text-center">{context || url}</p>
          </TooltipContent>
        </Tooltip>
        <Button className="mt-0 md:mt-4 w-full" asChild>
          <Link
            href={url}
            target="_blank"
            className="flex items-center justify-center gap-1 rounded-md focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2"
          >
            Visit Site <ArrowRightIcon className="h-4 w-4 opacity-50 " />
          </Link>
        </Button>
        {external_links && external_links?.length > 0 ? (
          <section className="py-4 md:py-8">
            <label
              htmlFor="Additional Links"
              className="text-sm text-LunarGrey-light"
            >
              Additional Links:
            </label>
            <Separator className="py-2 mb-2" />
            <div id="Additional Links" className="flex flex-col gap-4">
              {external_links.map((link) => (
                <Tooltip key={link.url}>
                  <TooltipTrigger>
                    <Link href={link.url} target="_blank">
                      <div className="relative">
                        <Avatar className="absolute top-0 left-0 m-2 h-4 w-4 z-10">
                          <AvatarImage
                            src={
                              link.icon
                                ? link.icon
                                : "/images/001-Down_Hands.png"
                            }
                          />
                          <AvatarFallback>i</AvatarFallback>
                        </Avatar>
                        <div className="w-full h-10 gap-3 absolute bottom-0 px-4 left-0 z-10 transition-all duration-1000 delay-200 ease-linear whitespace-nowrap flex justify-between items-center flex-nowrap box-border">
                          <div className="text-OffWhite overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
                            {link.title}
                          </div>
                          <div className="text-OffWhite/50 overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
                            {new Date(link.lastEdited ?? 0).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                              }
                            ) +
                              " " +
                              new Date(link.lastEdited ?? 0).getFullYear()}
                          </div>
                        </div>
                        <Image
                          alt={link.title + " site preview"}
                          src={
                            link.preview ? link.preview : "/posts/missing.png"
                          }
                          width="1200"
                          height="630"
                          className="rounded-md brightness-50 hover:brightness-100  border border-OffWhite/50 transition-all duration-200 ease-linear"
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[350px] text-center">
                      {link.context || link.url}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </SheetContent>
  );
}

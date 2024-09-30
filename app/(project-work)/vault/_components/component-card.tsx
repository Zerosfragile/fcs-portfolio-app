import React, { useState } from "react";
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
import {
  ArrowRightIcon,
  CardStackPlusIcon,
  CopyIcon,
  ExternalLinkIcon,
  TextAlignBottomIcon,
  TextAlignTopIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/fcs-seperator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ComponentDependencyInformation,
  ComponentTypeInformation,
  InspirationComponentResource,
  InspirationUtilFunctionInfo,
} from "@/lib/vault/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { CodeInput } from "@/components/hud-ui/code-block";
import { useHandleCopyCode } from "@/components/hud-ui/handle-copy-code";
import { cn, mergeUniqueByKey } from "@/lib/utils";

export default function ComponentCard(props: InspirationComponentResource) {
  return (
    <TooltipProvider>
      <Sheet>
        <div className="w-full h-fit border border-LunarGrey-dark relative overflow-hidden rounded-xl bg-LunarGrey-darkest p-1 font-mono flex flex-col gap-2">
          <CardContent {...props} />
          <SheetTrigger
            className="rounded-xl focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2"
            asChild
          >
            <Button
              variant={"ghost"}
              className="flex items-center justify-center p-2 rounded-lg whitespace-nowrap text-ellipsis bg-LunarGrey-dark/30 hover:bg-LunarGrey-dark text-OffWhite/75  hover:text-OffWhite/80 transition-all duration-200 ease-linear flex-nowrap gap-2 text-sm font-semibold"
            >
              View Component
              <CardStackPlusIcon className="h-4 w-4 text-OffWhite/50 " />
            </Button>
          </SheetTrigger>
        </div>
        <CardSheet {...props} />
      </Sheet>
    </TooltipProvider>
  );
}

function CardContent({
  type,
  title,
  display,
  description,
  category,
  credits,
  createdAt,
  dependencies,
  code,
  types,
  props,
  utilDependencies,
  componentDependencies,
}: InspirationComponentResource) {
  const createdAtDate = createdAt ? new Date(createdAt) : new Date();

  return (
    <ScrollArea>
      <div className="relative overflow-hidden rounded-lg box-border group bg-VoidBlack p-4 grid place-items-center peer pb-14">
        {display}
      </div>
      <div className="opacity-75 peer-hover:opacity-100 w-full h-10 gap-3 absolute bottom-0 px-4 left-0 z-10 transition-all duration-1000 delay-200 ease-linear whitespace-nowrap flex justify-between items-center flex-nowrap box-border bg-gradient-to-t from-VoidBlack/75 via-VoidBlack/50 via-[66%] to-transparent group-hover:from-transparent group-hover:via-transparent">
        <div className="text-OffWhite overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
          {title}
        </div>
        <div className="text-OffWhite/50 overflow-hidden whitespace-nowrap text-ellipsis h-7 text-xs">
          {createdAtDate.toLocaleDateString("en-US", {
            month: "long",
          }) +
            " " +
            createdAtDate.getFullYear()}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function CardSheet({ ...Props }: InspirationComponentResource) {
  return (
    <SheetContent className="md:m-2 h-[100dvh-16px] overflow-y-auto overflow-x-visible bg-OffWhite/25 backdrop-blur-md border-OffWhite/10 supports-[backdrop-filter]:bg-OffWhite/5 rounded-md min-w-[75vw] md:min-w-[30vw]  2xl:min-w-[25vw] 2xl:w-[25vw]">
      <section className=" md:m-4">
        <SheetHeader>
          <SheetTitle className="max-sm:text-left">{Props.title}</SheetTitle>
          <SheetDescription className="text-OffWhite/60 max-sm:text-left">
            {Props.description}
          </SheetDescription>
        </SheetHeader>
        <ComponentContentLayout {...Props} />
      </section>
    </SheetContent>
  );
}

function ComponentContentLayout({
  type,
  title,
  display,
  description,
  category,
  credits,
  createdAt,
  dependencies,
  code,
  types,
  props,
  utilDependencies,
  componentDependencies,
}: InspirationComponentResource) {
  const dependenciesList = mergeUniqueByKey<
    ComponentDependencyInformation,
    "name"
  >({
    key: "name",
    arrays: [
      dependencies,
      utilDependencies
        ?.flatMap((util) => util.dependencies)
        .filter((dep): dep is ComponentDependencyInformation => Boolean(dep)) ||
        [],
      componentDependencies
        ?.flatMap((component) => component.dependencies)
        .filter((dep): dep is ComponentDependencyInformation => Boolean(dep)) ||
        [],
    ],
  });

  const typeList = mergeUniqueByKey<ComponentTypeInformation, "name">({
    key: "name",
    arrays: [props, types],
  });

  return (
    <div className="flex flex-col gap-2 py-4">
      <ListBox>Category = [ {category.join(", ") || ""} ]</ListBox>
      <CreditsSection credits={credits} createdAt={createdAt} />
      <DependenciesSection dependencies={dependenciesList} />
      <TypesSection types={typeList} />
      <CodeTabSection
        title={title}
        display={display}
        code={code}
        componentDependencies={componentDependencies}
        utilDependencies={utilDependencies}
      />
    </div>
  );
}

function ListBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full rounded-sm shadow-sm text-xs font-mono resize-none min-h-9 border border-OffWhite/25  p-2 scroll-p-1 transition-colors duration-500 text-OffWhite/75 hover:text-OffWhite bg-OffWhite/10">
      {children}
    </div>
  );
}

function CreditsSection({
  credits,
  createdAt,
}: Pick<InspirationComponentResource, "credits" | "createdAt">) {
  const createdAtDate = createdAt ? new Date(createdAt) : new Date();

  if (!credits)
    return (
      <div className="flex items-center justify-between gap-2 py-1 border-b">
        <label htmlFor="createdAt" className="text-xs text-OffWhite/75">
          Created:
        </label>
        <div className="text-xs text-OffWhite/50" id="createdAt">
          {createdAtDate.toLocaleDateString("en-US", {
            month: "long",
          }) +
            " " +
            createdAtDate.getFullYear()}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="credits"
        className="text-sm text-OffWhite/80 font-semibold"
      >
        Credits:
      </label>
      <div
        className="text-xs text-OffWhite/50 flex flex-col gap-1"
        id="credits"
      >
        {credits.map((person) => (
          <Tooltip key={person.name} delayDuration={1000}>
            <TooltipTrigger className="focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2 border-b py-1 hover:border-OffWhite/75 group">
              <Link
                href={person.link}
                className=" flex justify-between items-center"
                target="_blank"
              >
                <span className="text-OffWhite/75">{person.role}: </span>
                <span className="text-OffWhite/70 flex gap-2 items-center">
                  {person.name}{" "}
                  <ExternalLinkIcon className="group-hover:text-OffWhite" />
                </span>
              </Link>
            </TooltipTrigger>

            <TooltipContent className="hidden sm:block">
              <p className="w-[350px] text-center">
                {person.info ?? "See Reference"}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
        <div className="flex items-center justify-between gap-2 py-1 border-b">
          <label htmlFor="createdAt" className="text-xs text-OffWhite/75">
            Created:
          </label>
          <div className="text-xs text-OffWhite/50" id="createdAt">
            {createdAtDate.toLocaleDateString("en-US", {
              month: "long",
            }) +
              " " +
              createdAtDate.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}

function DependenciesSection({
  dependencies,
}: {
  dependencies: ComponentDependencyInformation[] | null;
}) {
  if (!dependencies) return null;

  return (
    <div className="flex flex-col gap-2 my-2">
      <label
        htmlFor="dependenciesList"
        className="text-sm text-OffWhite/75 font-medium"
      >
        Dependencies:
      </label>
      <Accordion type="single" collapsible>
        {dependencies.map((dependency) => (
          <AccordionItem value={dependency.name} key={dependency.name}>
            <AccordionTrigger className="text-xs text-OffWhite/75 py-1.5 font-normal  data-[state=open]:text-OffWhite/90 data-[state=open]:font-medium data-[state=open]:underline underline-offset-2 transition-all duration-500">
              {dependency.name}
            </AccordionTrigger>
            <AccordionContent className="text-OffWhite/60 text-xs flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor={dependency.name + "version"}
                  className="text-xs text-OffWhite/80 font-medium "
                >
                  Version:
                </label>
                <div
                  className="text-xs text-OffWhite/50"
                  id={dependency.name + "version"}
                >
                  {dependency.version}
                </div>
              </div>
              {dependency.description}

              {dependency.links ? (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="credits"
                    className="text-xs text-OffWhite/80 font-medium"
                  >
                    Links:
                  </label>
                  <div
                    className="text-xs text-OffWhite/50 flex flex-col ml-2"
                    id="credits"
                  >
                    {Object.entries(dependency.links).map(([name, link]) => (
                      <Link
                        key={name}
                        href={link}
                        className="flex gap-2 items-center text-OffWhite/70 focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2 border-b border-transparent  hover:border-OffWhite/75 hover:text-OffWhite group"
                        target="_blank"
                      >
                        {name}{" "}
                        <ExternalLinkIcon className="group-hover:text-OffWhite" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function TypesSection({ types }: { types: ComponentTypeInformation[] | null }) {
  if (!types) return null;

  return (
    <div className="flex flex-col gap-2 my-2">
      <label htmlFor="types" className="text-sm text-OffWhite/70 font-medium">
        Types:
      </label>
      <Accordion type="single" collapsible id={"types"}>
        {types.map((type) => (
          <AccordionItem value={type.name} key={type.name}>
            <AccordionTrigger className="text-xs text-OffWhite/75 py-1.5 font-normal  data-[state=open]:text-OffWhite/90 data-[state=open]:font-medium data-[state=open]:underline underline-offset-2 transition-all duration-500">
              {type.name}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                <span className="text-xs text-OffWhite/50 mb-2">
                  {type.description}
                </span>
                <ScrollArea className="text-xs text-OffWhite/70">
                  <CodeInput code={type.code} hoverToCopy={true} />
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export function LargeCodeBlock({
  code,
  title,
  size = "lg",
}: {
  code: string;
  title: string;
  size?: "sm" | "md" | "lg";
}) {
  const { handleCopyCode } = useHandleCopyCode();
  return (
    <div className="flex flex-col relative gap-4">
      <button
        className="text-xs flex justify-between items-center focus-visible:outline-none focus-visible:ring-OffWhite/75 focus-visible:ring-2 border-b border-border-OffWhite/10 py-1 hover:border-OffWhite/75 group peer"
        onClick={() => handleCopyCode(code ?? "")}
        tabIndex={0}
        type="button"
        id="copy-code-button"
      >
        <span className="text-OffWhite/75">{title}: </span>
        <CopyIcon className=" text-OffWhite/75 group-hover:text-OffWhite" />
      </button>
      <ScrollArea
        className={cn(
          "text-xs text-OffWhite/70 peer-hover:opacity-25 transition-all duration-200 ease-out w-full",
          size === "sm"
            ? "max-sm:h-[200px] h-[20vh]"
            : size === "md"
            ? "max-sm:h-[300px] h-[40vh]"
            : "max-sm:h-[400px] h-[50vh]"
        )}
      >
        <CodeInput code={code ?? "No code"} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden z-50 transition-all duration-200 ease-linear peer-hover:grid place-items-center gap-2 cursor-pointer">
        <CopyIcon className="animate-pulse h-4 w-4" tabIndex={0} />
        <p className="w-full md:w-[350px] text-center text-xs text-OffWhite/60">
          Click to copy code
        </p>
      </div>
    </div>
  );
}

function CodeTabSection({
  title,
  display,
  code,
  componentDependencies,
  utilDependencies,
}: Pick<
  InspirationComponentResource,
  "title" | "code" | "componentDependencies" | "utilDependencies" | "display"
>) {
  const tabs = [
    display ? "Display_" + title : null,
    code ? "Code_" + title : null,
    componentDependencies ? "Components_" + title : null,
    utilDependencies ? "Utils_" + title : null,
  ].filter(Boolean) as string[];

  if (tabs.length === 0) return null;

  return (
    <Tabs defaultValue={tabs[0]} className="min-h-[500px]">
      <ScrollArea className="text-xs text-OffWhite/70 peer-hover:opacity-25 transition-all duration-200 ease-out h-full w-full">
        <div className="grid place-items-center">
          <TabsList className="font-mono border-b border-OffWhite/25 text-OffWhite/75 hover:text-OffWhite bg-transparent rounded-none w-full justify-start gap-4">
            {tabs.map((tab) => (
              <TabsTrigger
                value={tab}
                key={tab}
                className={
                  "px-0 data-[state=active]:bg-transparent text-OffWhite/75 py-1.5 font-normal text-sm  data-[state=active]:text-OffWhite/90 data-[state=active]:font-medium data-[state=active]:underline underline-offset-2 transition-all duration-500"
                }
              >
                {tab.split("_")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value={tabs[0]}>
        <ScrollArea className="text-xs text-OffWhite/70 peer-hover:opacity-25 transition-all duration-200 ease-out max-sm:h-[400px] h-full w-full">
          {display}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TabsContent>

      <TabsContent value={tabs[1]}>
        <LargeCodeBlock code={code ?? "No code Found"} title={title} />
      </TabsContent>
      <TabsContent value={tabs[2]}>
        <Accordion type="single" collapsible>
          {componentDependencies &&
            componentDependencies.map((component) => (
              <AccordionItem
                value={component.title}
                key={component.title + title}
              >
                <AccordionTrigger className="text-xs text-OffWhite/75 py-1.5 font-normal  data-[state=open]:text-OffWhite/90 data-[state=open]:font-medium data-[state=open]:underline underline-offset-2 transition-all duration-500">
                  {component.title}
                </AccordionTrigger>
                <AccordionContent className="pl-2 rounded-sm border-l border-dashed border-border/20">
                  <span className="text-OffWhite/60 text-xs">
                    {component.description}
                  </span>
                  <ComponentContentLayout {...component} />
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </TabsContent>
      <TabsContent value={"Utils_" + title}>
        {/*! The value doesn't correspond when i used tabs[3] :( */}
        <Accordion type="single" collapsible>
          {utilDependencies?.map((util) => (
            <AccordionItem value={util.name} key={util.name + title}>
              <AccordionTrigger className="text-xs text-OffWhite/75 py-1.5 font-normal  data-[state=open]:text-OffWhite/90 data-[state=open]:font-medium data-[state=open]:underline underline-offset-2 transition-all duration-500">
                {util.name}
              </AccordionTrigger>
              <AccordionContent className="pl-2 rounded-sm border-l border-dashed border-border/20">
                <UtilContentLayout {...util} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}

function UtilContentLayout({
  name,
  description,
  code,
  category,
  dependencies,
  credits,
  createdAt,
}: InspirationUtilFunctionInfo) {
  console.log(name);

  return (
    <div className="flex flex-col gap-2 py-4">
      <span className="text-OffWhite/60 text-xs">{description}</span>
      <ListBox>Category = [ {category.join(", ") || ""} ]</ListBox>
      <CreditsSection credits={credits} createdAt={createdAt ?? ""} />
      <DependenciesSection dependencies={dependencies ?? null} />
      <LargeCodeBlock code={code} title={"Copy Function"} size="sm" />
    </div>
  );
}

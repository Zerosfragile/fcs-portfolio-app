"use client";

import { Separator } from "@/components/fcs-seperator";
import useRotatingString from "@/lib/hooks";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const validNames = ["Rodrick", "Cathy", "Emma", "Anna"];

const nameSchema = z.string().superRefine((data: string, ctx: any) => {
  if (
    !validNames.map((name) => name.toLowerCase()).includes(data.toLowerCase())
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Name must be either 'Rodrick', 'Cathy', 'Emma', or 'Anna'",
    });
  }
});

const formSchema = z.object({
  name: nameSchema,
});

const NameInput = ({
  setName,
}: {
  setName: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const rotatingString = useRotatingString(validNames, 2500);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-col space-y-2 text-left">
        <h1 className="text-2xl font-semibold tracking-tight font-[arthemys] bg-clip-text text-transparent bg-gradient-to-r from-christmas-red to-christmas-green">
          Christmas Cards
        </h1>
        <p className="text-sm text-muted-foreground font-sans">
          A collection of Christmas cards I've written for 2023.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 font-sans"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <Separator text="enter first name" />
                <FormControl>
                  <Input
                    type="text"
                    placeholder={rotatingString}
                    className="mt-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NameInput;

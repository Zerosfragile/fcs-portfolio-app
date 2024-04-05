"use client";
import Link from "next/link";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:grid md:place-items-center">
      <div className="max-md:max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10 relative">
        <div className="w-full h-full grid place-content-center">
          <div className="space-y-1">
            <Badge variant={"outline"} className="rounded-full py-1 px-4">
              About Me
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="max-w-[500px] w-[80vw] text-left text-muted-foreground items-center max-md:pb-10">
            <p>
              <b className="mr-2 text-OffWhite/75">
                Full Stack Developer, specializing in crafting creative
                solutions.
              </b>
              Currently, I&lsquo;m using a modern tech stack that includes
              Next.js, TypeScript and Tailwind.
            </p>
            <br />
            <p>
              I&lsquo;ve contributed to products attracting
              <span className="mx-1 text-OffWhite-dark/75 italic">
                175K monthly
              </span>
              impressions and businesses generating over
              <span className="mx-1 text-OffWhite-dark/75 italic">
                $2 million in sales,
              </span>
              utilizing stacks like React and Node.js, as well as e-commerce
              platforms like OpenCart.
            </p>
            <br />
            <p>
              My roles have facilitated interactions with diverse stakeholders,
              including businessmen, engineers, technical leads, content
              creators, creatives, and medical professionals.
            </p>
            <br />
            <p>
              As I advance my academic pursuits, I&lsquo;m eager to expand my
              portfolio and collaborate with talented individuals and teams.
            </p>
            <p>
              I&lsquo;m
              <b className="mx-1 text-OffWhite-dark/60 font-semibold">
                open to professional and networking opportunities
              </b>
              to further hone my skills.
            </p>
            <br />
            <p>
              If you&lsquo;ve read this far, feel free to
              <Link
                href={"/contact"}
                className="font-[cygnitomono-011] underline underline-offset-2 font-thin text-OffWhite-dark/75 hover:text-OffWhite/90 transition-color duration-500 ease mx-2"
              >
                contact
              </Link>
              me.
            </p>
            <br />
            <p>- Marcus Lim</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-1" />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { TypingLabel } from "../hud-nav-system";
import Link from "next/link";

type infoOverlayProps = {
  route: string;
  title: string;
  subtitle: string;
};

const Infolay = ({ route, title, subtitle }: infoOverlayProps) => {
  return (
    <div className="h-full cursor-default p-12 backdrop-blur-md">
      <div className="ease flex w-[100%] justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.33] duration-500 ease-cubic hover:text-OffWhite/[.66] max-sm:mt-8">
        <p>CODE</p>
        <p>PROJECTS</p>
        <p>DESIGN</p>
      </div>
      <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={route}
          className="  flex flex-col items-center justify-center"
        >
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
          />
        </Link>
        <p
          className="m-6
          font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66]"
        >
          Vist Project
        </p>
      </div>
      <div className="absolute bottom-5 left-5">
        <Image
          src={"/images/037-Graphics.png"}
          alt={""}
          width={500}
          height={500}
          className="scale-x-[-1] opacity-[0.02] invert"
        />
      </div>
      <div
        className="
          z-10 flex h-full flex-col items-end justify-end  text-right font-[CygnitoMono-011]
          text-[11.25px] font-normal transition-all duration-100 ease-linear max-lg:text-[10px]
        "
      >
        <h1 className="text-[50px] text-OffWhite/[.50]">
          <TypingLabel text={title} />
        </h1>
        <div className="min-h-5 text-OffWhite/[.33]">
          <TypingLabel text={subtitle} speed={25} wrap={true} />
        </div>
      </div>
    </div>
  );
};

export default Infolay;

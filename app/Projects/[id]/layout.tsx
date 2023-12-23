import Link from "next/link";
import Image from "next/image";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Link href="/">
        <Image
          id="img001"
          src="/images/001-Down_Hands.png"
          alt=""
          width={250}
          height={250}
          className="
            ease absolute top-0 z-20 m-2 w-[10%] min-w-[150px] opacity-25 invert duration-500 ease-cubic
            hover:animate-shake-slow hover:opacity-75 max-md:m-4 max-md:min-w-[100px]
          "
        />
      </Link>
      <div className="hud-border relative flex h-full min-h-[calc(100vh-38px)] justify-end">
        {children}
        <a href="#img001">
          <Image
            src="/images/002-Large_Thumbs_Up.png"
            alt=""
            width={250}
            height={250}
            className="ease absolute bottom-0 right-0 m-2 w-[10%] min-w-[150px] max-w-[10%] opacity-25 invert duration-500 ease-cubic hover:animate-shake-slow hover:opacity-75 max-md:min-w-[100px]"
          />
        </a>
      </div>
    </section>
  );
}

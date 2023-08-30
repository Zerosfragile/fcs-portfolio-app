import Image from "next/image";
import { RefObject } from "react";
import { PostMetaData } from "@/lib/posts";

export const HudPostsCard = ({
  data: { title, subtitle, preview, id },
}: {
  data: PostMetaData;
}) => {

  console.log(preview)
  return (
    <a
      href={`/projects/${id}`}
      className="
        card-hover-glow relative flex h-[260px] w-[300px] cursor-pointer flex-col rounded-[10px] 
        bg-OffWhite/[.33]
      "
    >
      <div className="absolute inset-[1px] z-[2] flex grow flex-col rounded-[10px] bg-VoidBlack p-[10px]">
        <div className="flex h-[140px] items-center justify-center overflow-hidden">
          <Image
            src={preview}
            alt={`${title} preview`}
            height={140}
            width={265}
            priority
            className="h-auto w-full"
          />
        </div>
        <div className="flex grow flex-col items-center justify-start overflow-hidden rounded-md px-[5px] py-0">
          <h3 className="text-center font-[CygnitoMono-011] text-[1.1em] font-light leading-5 text-OffWhite/[0.66]">
            {title}
          </h3>
          <h4 className="mt-2 text-center font-[CygnitoMono-011] text-[0.75em] font-light text-OffWhite/50">
            {subtitle}
          </h4>
        </div>
      </div>
    </a>
  );
};

export const handleCardMouseMove = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ref: RefObject<HTMLDivElement>
) => {
  if (!ref.current) {
    return;
  }
  const cards = Array.from(ref.current.children) as HTMLDivElement[];

  for (const card of cards) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

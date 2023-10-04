import { TeamMember, teamMembers } from "@/lib/extractHeaders/types";
import { formatNumberWithLeadingZeros } from "@/lib/utils";
import {
  MotionValue,
  useTransform,
  motion,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";

const UserCard = ({
  x,
  y,
  user,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  user: TeamMember;
}) => {
  const CARDHEIGHT = 800;
  const CARDWIDTH = 500;

  const rotateX = useTransform(y, [0, CARDWIDTH], [15, -15]);
  const rotateY = useTransform(x, [0, CARDHEIGHT], [-15, 15]);

  const rotateCardX = useTransform(y, [0, CARDWIDTH], [5, -5]);
  const rotateCardY = useTransform(x, [0, CARDHEIGHT], [-15, 15]);

  const router = useRouter();

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }
  return (
    <motion.div
      className="bg-OffWhite/90 text-VoidBlack w-[500px] h-[800px] p-2 font-[CygnitoMono-011] uppercase relative rounded-md hud-border perspective-[400px]"
      style={{
        width: CARDWIDTH,
        height: CARDHEIGHT,
        rotateX: rotateCardX,
        rotateY: rotateCardY,
      }}
      onDoubleClick={() => router.push(`/about/${user.UID}`)}
    >
      <div className="text-4xl font-bold  w-full flex border-VoidBlack rounded-md select-none">
        <div className="text-left">Fragile Creative Services</div>
        <Image
          src={user.profilePicture}
          alt={`${user.firstName} profile picture`}
          className="ease duration-500 ease-cubic rounded-lg grayscale hover:grayscale-0"
          width={80}
          height={80}
          style={{ objectFit: "contain" }}
          priority
          onDragStart={(e) => e.preventDefault()}
          onClick={() => router.push(`/about/${user.UID}`)}
        />
      </div>
      <div className="w-full text-left select-none">
        <p>{user.dateJoined}</p>
        <p>{user.title}</p>
        <p>{formatNumberWithLeadingZeros(user.id, 3)}</p>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <h1 className="text-[450px]">
          {formatNumberWithLeadingZeros(user.id, 2).toString().slice(-2)}
        </h1>
      </div>
      <motion.div
        style={{
          display: "flex",
          placeItems: "center",
          placeContent: "center",
          userSelect: "none",
          width: 484,
          height: 520,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      >
        <Image
          src={user.image}
          alt={user.image.split("/")[3]}
          className="ease duration-500 ease-cubic select-none "
          width={400}
          height={300}
          style={{ objectFit: "contain" }}
          priority
          onDragStart={(e) => e.preventDefault()}
        />
      </motion.div>
      <div className=" font-bold absolute bottom-0 right-0 p-2 text-right select-none">
        <div className="pl-[50%] text-[11.25px]">{user.description}</div>
        <div className="text-6xl">
          {user.firstName} {user.lastName}
        </div>
      </div>
    </motion.div>
  );
};

const AboutContent = ({
  setShowNav,
}: {
  setShowNav: Dispatch<SetStateAction<boolean>>;
}) => {
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => any };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (container) {
      if (e.deltaY > 0) {
        container.scrollLeft += 100;
      } else {
        container.scrollLeft -= 100;
      }
    }
  };

  return (
    <motion.div
      // onClick={() => setShowNav((prev) => !prev)}
      className="pt-20 px-10 w-full h-fit"
      onMouseMove={handleMouse}
      onWheel={handleWheelScroll}
      ref={scrollRef}
    >
      <motion.div
        className="w-fit flex overflow-x-auto cursor-grab h-full items-center"
        drag="x"
        dragConstraints={scrollRef}
      >
        {teamMembers.map((user) => (
          <UserCard key={user.id} x={x} y={y} user={user} />
        ))}
      </motion.div>
    </motion.div>
  );
};

const QuoteInitializing = ({
  setInit,
}: {
  setInit: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <Link href={"/"}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 1, delay: 3.5, ease: "easeInOut" }}
          // onClick={() => setInit(true)} //! REMOVE When Finished
          className="flex flex-col items-center justify-center p-6 w-full"
        >
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
          />
        </motion.button>
      </Link>
      <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] text-center min-w-[90vw]">
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          To get something you never had
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        >
          You Have to do something you have never done.
        </motion.p>
      </div>
    </div>
  );
};

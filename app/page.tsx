import Image from 'next/image'

export default function Home() {
  const border = "border border-[#e2e2e233]";
  const hud = "w-auto m-[18px] rounded-[18.75px]";
  return (
    <div className="h-full w-full overflow-y-hidden">
      <div
        className={`bg-black h-[calc(100vh-129px)] overflow-x-hidden text-center relative ${border} ${hud}`}
      ></div>
      <div
        className={`flex justify-between items-center h-[75px] bottom-0 text-center ${border} ${hud}`}
      ></div>
    </div>
  );
}

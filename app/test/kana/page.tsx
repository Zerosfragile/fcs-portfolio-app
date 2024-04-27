import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="h-screen w-screen grid place-items-center bg-gradient-nordic-dark bright">
      <div className="w-full h-full p-10 bg-VoidBlack/25">
        <div className="w-full h-full box-border border border-OffWhite-light/25 bg-VoidBlack p-4 rounded-lg font-mono">
          <h1 className="font-bold">Kana Typer</h1>
        </div>
      </div>
    </div>
  );
}

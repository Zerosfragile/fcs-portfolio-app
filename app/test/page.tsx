"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { AnimatedLines } from "@/lib/vault/components/src/animated-lines";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="grid place-items-center min-h-screen ">
      <AnimatedLines />
    </div>
  );
}

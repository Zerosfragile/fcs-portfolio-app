"use client";
import React from "react";
import { playground } from "@/lib/playground";
import ComponentCard from "./_components/component-card";

export default function PlaygroundPage() {
  return (
    <main className="p-4 flex flex-col items-center">
      {/* Small Screens - 1 Column */}
      <section className="max-w-4xl flex flex-col gap-2">
        {playground.map((item, i) => (
          <ComponentCard key={item.title} {...item} />
        ))}
      </section>
    </main>
  );
}

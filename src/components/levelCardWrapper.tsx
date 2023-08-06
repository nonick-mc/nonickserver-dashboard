'use client';

import { FadeUpCard } from "./animation";
import { ReactNode } from "react";

export async function LevelCardWrapper({ children, index, isAdmin }: { index: number, isAdmin: boolean, children: ReactNode }) {
  return (
    <>
      <FadeUpCard
        className='px-6 py-4 flex gap-4 items-center'
        key={index}
      >
        {children}
      </FadeUpCard>
    </>
  );
}
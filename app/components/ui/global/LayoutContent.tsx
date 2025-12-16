import { ReactNode } from "react";

import Navigation from "./Navigation";

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white w-full">
      <main className="w-full max-w-150 px-6 mx-auto mt-24 lg:mt-36">
        {/** Navigation tab */}
        <Navigation />

        {/** Layout children */}
        {children}
      </main>
    </div>
  );
}

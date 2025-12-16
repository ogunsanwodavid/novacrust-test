import { ReactNode } from "react";

import Navigation from "./Navigation";

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white w-full min-h-screen flex items-center justify-center">
      <main className="w-full max-w-150 px-6">
        {/** Navigation tab */}
        <Navigation />

        {/** Layout children */}
        {children}
      </main>
    </div>
  );
}

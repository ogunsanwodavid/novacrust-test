import { ReactNode } from "react";

import ReduxProvider from "./ReduxProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  );
}

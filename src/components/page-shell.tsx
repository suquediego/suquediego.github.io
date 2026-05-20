import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#E8E8E8] text-[#303030]">
      <Navbar />
      <div className="px-4 pb-[96px] pt-[144px] md:px-8">{children}</div>
      <Footer />
    </main>
  );
}

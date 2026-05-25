import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type PageShellProps = {
  children: ReactNode;
  variant?: "default" | "case";
};

export function PageShell({ children, variant = "default" }: PageShellProps) {
  const isCase = variant === "case";

  return (
    <main
      className={
        isCase
          ? "min-h-screen bg-white text-[#303030]"
          : "min-h-screen bg-[#E8E8E8] text-[#303030]"
      }
    >
      <Navbar />

      <div
        className={
          isCase
            ? "pb-[96px] pt-[84px]"
            : "px-4 pb-[96px] pt-[144px] md:px-8"
        }
      >
        {children}
      </div>

      <Footer />
    </main>
  );
}
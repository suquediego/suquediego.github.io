"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { useTranslation } from "@/hooks/use-translation";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/diegosuque/",
  },
  {
    label: "GitHub",
    href: "https://github.com/suquediego",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/diegocostasuu",
  },
];

export default function ContatoPage() {
  const t = useTranslation();

  return (
    <PageShell>
      <section className="mx-auto max-w-[1180px]">
        <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#777777]">
          {t.pages.contact.eyebrow}
        </p>

        <h1 className="mt-5 text-[56px] font-black leading-[0.92] tracking-[-0.055em] text-[#303030] sm:text-[74px] lg:text-[96px]">
          {t.pages.contact.title}
        </h1>

        <p className="mt-7 max-w-[780px] text-[18px] leading-[1.7] text-[#727272] sm:text-[20px]">
          {t.pages.contact.description}
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-[820px] gap-5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-[24px] border border-[#E2E2E2] bg-[#F2F2F2] p-6 text-[#303030] shadow-[8px_8px_18px_#cfcfcf,-8px_-8px_18px_#ffffff] transition hover:-translate-y-1"
          >
            <span className="text-[24px] font-black tracking-[-0.04em]">
              {link.label}
            </span>
            <ArrowUpRight className="size-6 text-[#606060]" />
          </Link>
        ))}
      </section>
    </PageShell>
  );
}

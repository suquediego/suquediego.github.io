import { FrontendScrollStory } from "@/components/frontend-scroll-story";
import { PageShell } from "@/components/page-shell";

export default function FrontEndPage() {
  return (
    <PageShell>
      <div className="-mx-4 -mb-[96px] -mt-[144px] bg-white px-4 pb-[96px] pt-[144px] md:-mx-8 md:px-8">
        <FrontendScrollStory />
      </div>
    </PageShell>
  );
}

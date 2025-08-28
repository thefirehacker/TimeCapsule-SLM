import { DeepResearchNavigation } from "@/components/DeepResearch/DeepResearchNavigation";

export default function DeepResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <DeepResearchNavigation />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}

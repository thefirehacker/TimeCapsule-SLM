import { DeepResearchNavigation } from "@/components/DeepResearch/DeepResearchNavigation";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function DeepResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="h-screen flex flex-col">
          <DeepResearchNavigation />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}

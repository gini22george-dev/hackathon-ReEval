import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReEval - Academic Verification & Audit Platform",
  description: "Enterprise-grade academic verification platform for answer sheet re-evaluation, official marking scheme alignment, and step-by-step logic auditing.",
  keywords: ["Academic Verification", "Re-evaluation Audit", "Marking Scheme Audit", "Answer Sheet Audit", "Institutional Assessment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}

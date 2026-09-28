import type { Metadata } from 'next';
import './globals.css';
import { FestivalProvider } from '@/context/FestivalContext';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'LiveFestival OS — Mega Festival Operations & Stage Telemetry System',
  description:
    'Titan #39: High-energy kinetic maximalism management console for multi-stage festival timetables, crowd ingress heatmap, SPL decibel limit compliance, and artist hospitality riders.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-[#0b0a10] text-white">
        <FestivalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </FestivalProvider>
      </body>
    </html>
  );
}

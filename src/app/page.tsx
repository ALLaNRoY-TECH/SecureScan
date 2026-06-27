import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Features } from "@/components/sections/Features";
import { ThreatIntelligence } from "@/components/sections/ThreatIntelligence";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { SecurityTimeline } from "@/components/sections/SecurityTimeline";
import { VulnerabilityShowcase } from "@/components/sections/VulnerabilityShowcase";
import { ReportPreview } from "@/components/sections/ReportPreview";
import { EnterpriseFeatures } from "@/components/sections/EnterpriseFeatures";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { AICopilot } from "@/components/ui/AICopilot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-jet selection:bg-neon selection:text-jet">
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <ThreatIntelligence />
      <Features />
      <InteractiveDemo />
      <DashboardPreview />
      <ProductShowcase />
      <SecurityTimeline />
      <VulnerabilityShowcase />
      <ReportPreview />
      <EnterpriseFeatures />
      <Statistics />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      
      {/* Global Interactive Elements */}
      <AICopilot />
    </main>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { PartnersSection } from '@/components/partners-section';
import { TechStackSection } from '@/components/tech-stack-section';
import { FeaturesSection } from '@/components/features-section';
import { TeamSection } from '@/components/team-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <FeaturesSection />
      <PartnersSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}
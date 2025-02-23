'use client';

import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

export function PartnersSection() {
  const partners = [
    { src: "/images/nextjs_logo.png", alt: "DataCorp" },
    { src: "/images/FastAPI_logo.png", alt: "ServerTech" },
    { src: "/images/cnn_logo.png", alt: "CloudSys" },
    { src: "/images/nodejs_logo.png", alt: "SecureHealth" },
    { src: "/images/onnx_logo.png", alt: "AITech" },
    { src: "/images/python_logo.png", alt: "AITech" },
    { src: "/images/mongodb_logo.png", alt: "AITech" },
    { src: "/images/mlh_logo.png", alt: "AITech" },
    { src: "/images/diversion_logo.avif", alt: "AITech" },
    { src: "/images/devfolio_logo.png", alt: "AITech" },
    { src: "/images/iemacm_logo.webp", alt: "AITech" },
    { src: "/images/iem_logo.webp", alt: "AITech" },
    { src: "/images/uem_logo.png", alt: "AITech" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900">Thanks of Gratitude</h2>
        </motion.div>

        <Marquee gradient={false} speed={50}>
          <div className="flex space-x-16 py-4">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center px-8">
                <img src={partner.src} alt={partner.alt} className="h-12 w-auto" />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
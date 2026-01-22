import React from "react";
import { motion, useAnimation } from "framer-motion";

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface OurPartnersProps {
  brands: Brand[];
}

const OurPartners: React.FC<OurPartnersProps> = ({ brands }) => {
  const controls = useAnimation();

  // duplicate brands for seamless effect
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="bg-white py-16 dark:bg-slate-900 md:py-20 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8 2xl:px-0">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl font-cinzel">
            Our Partners
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 md:text-lg">
            Trusted automotive brands around the world.
          </p>
        </div>

        {/* Marquee */}
        <div
          className="relative overflow-hidden rounded-lg py-12"
          onMouseEnter={() => controls.stop()}
          onMouseLeave={() => controls.start({ x: ["0%", "-50%"] })}
        >
          {/* Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent dark:from-slate-900 z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent dark:from-slate-900 z-10" />

          {/* Scrolling Brands */}
          <motion.div
            className="flex whitespace-nowrap gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
            ref={controls as any}
          >
            {duplicatedBrands.map((brand, i) => (
              <div
                key={`${brand.id}-${i}`}
                className="flex flex-shrink-0 items-center justify-center hover:scale-110 transition-all"
                style={{ minWidth: "150px" }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 w-auto object-contain dark:brightness-150"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;

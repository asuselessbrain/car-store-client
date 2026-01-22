import React from 'react';
import {
  Shield,
  CreditCard,
  Award,
  Truck,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: 'Certified Used Cars',
    description: 'All vehicles go through strict inspection and certification process.',
  },
  {
    icon: CreditCard,
    title: 'EMI & Financing Support',
    description: 'Flexible loan & EMI plans from top financial partners.',
  },
  {
    icon: Award,
    title: 'Warranty Included',
    description: 'Standard warranty available on most models.',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    description: 'Receive your car directly at your doorstep.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Return',
    description: '7-day return policy for peace of mind.',
  },
  {
    icon: BadgeCheck,
    title: 'Verified Dealers',
    description: 'Buy only from trusted and verified dealerships.',
  },
];

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.icon;

  return (
    <div className="group h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        {feature.title}
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {feature.description}
      </p>
    </div>
  );
};

export default function WhyChooseUs(): React.ReactElement {
  return (
    <section className="md:py-20 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-8 2xl:px-0">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Why Choose AutoSphere?
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
            Experience a trusted way to buy your next car.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

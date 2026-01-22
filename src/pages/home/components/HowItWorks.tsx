import React from 'react';
import {
    Search,
    BarChart3,
    CreditCard,
    Truck,
} from 'lucide-react';
import { Link } from 'react-router';

interface Step {
    number: number;
    icon: React.ElementType;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        number: 1,
        icon: Search,
        title: 'Browse Cars',
        description: 'Explore hundreds of verified listings and find what suits you.',
    },
    {
        number: 2,
        icon: BarChart3,
        title: 'Compare & Choose',
        description: 'Compare key details like price, mileage, features & reviews.',
    },
    {
        number: 3,
        icon: CreditCard,
        title: 'Secure Payment / EMI',
        description: 'Buy directly or apply for EMI through trusted financial partners.',
    },
    {
        number: 4,
        icon: Truck,
        title: 'Delivery / Pickup',
        description: 'Get doorstep delivery or collect from our partner showrooms.',
    },
];

const StepCard: React.FC<{ step: Step; isLast: boolean }> = ({ step, isLast }) => {
    const Icon = step.icon;

    return (
        <div className="relative flex flex-col items-center">
            {/* Step Container */}
            <div className="group mb-8 flex flex-col items-center">
                {/* Step Circle with Number and Glow Effect */}
                <div className="relative mb-6">
                    {/* Glow Background */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-50" />

                    {/* Step Circle */}
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 shadow-2xl transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-slate-700/50 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800">
                        <span className="text-2xl font-black text-white drop-shadow-lg">{step.number}</span>
                    </div>
                </div>

                {/* Icon Container with Gradient Background */}
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-slate-400/30 dark:from-slate-800 dark:to-slate-700">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-400/0 via-transparent to-slate-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon className="relative h-10 w-10 text-slate-700 transition-all duration-300 group-hover:scale-110 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100" />
                </div>
            </div>

            {/* Card Content with Premium Styling */}
            <div className="group/card relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-slate-600">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 bg-gradient-to-br from-slate-50/50 to-transparent dark:from-slate-800/30 dark:to-transparent" />

                <div className="relative">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition-all duration-300 group-hover/card:text-slate-800 dark:text-white dark:group-hover/card:text-slate-100">
                        {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover/card:text-slate-700 dark:text-slate-400 dark:group-hover/card:text-slate-300">
                        {step.description}
                    </p>
                </div>
            </div>

            {/* Connection Line with Animation */}
            {!isLast && (
                <div className="absolute right-0 top-20 hidden lg:block">
                    <div className="h-1 w-full overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-slate-400 via-slate-300 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function HowItWorks(): React.ReactElement {
    return (
        <section className="relative overflow-hidden py-6">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-slate-300/10 blur-3xl dark:bg-slate-700/10" />
                <div className="absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-slate-200/10 blur-3xl dark:bg-slate-800/10" />
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8 2xl:px-0">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <div className="mb-4 inline-block">
                        <span className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 font-cinzel">
                            Our Process
                        </span>
                    </div>
                    <h2 className="mb-6 text-4xl font-black text-slate-900 md:text-5xl dark:text-white font-cinzel tracking-tight">
                        How It Works
                    </h2>
                    <p className="mx-auto max-w-xl text-lg text-slate-700 dark:text-slate-300">
                        A seamless way to buy your next car.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <StepCard
                            key={step.number}
                            step={step}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <div className="mt-20 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-12 text-center shadow-2xl dark:from-slate-700 dark:to-slate-800">
                    <h3 className="mb-4 text-2xl font-bold text-white font-cinzel">Ready to find your perfect car?</h3>
                    <p className="mb-6 text-slate-100">Join thousands of satisfied customers who trusted us with their car purchase.</p>
                    <Link to="/products">
                        <button className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg dark:text-slate-800">
                            Start Exploring Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

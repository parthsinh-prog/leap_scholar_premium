"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, Star, Plane, ArrowRight, Globe, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { plansData, EuropeCountry, USProgram, Plan } from "../constants/plans";
import { motion } from 'framer-motion';

// France: What makes Leap Scholar different?
const leapStatsFrance = [
  { value: '100k+', label: 'Success Stories' },
  { value: '$7M', label: 'Worth of Scholarships Granted' },
  { value: '$175M', label: 'In Loan Disbursement' },
  { value: '1M+', label: 'Downloads on IELTS app' },
];

// France: Testimonials
const testimonialsFrance = [
  {
    name: 'Adarsh Patil',
    university: 'Technical University of Munich',
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: 'Poonam',
    university: 'Heidelberg University',
    text: `I never thought getting a France study permit would be such a smooth task.`,
  },
  {
    name: 'Akhil Surendi',
    university: 'Humboldt University',
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: 'Sai Teja',
    university: 'Ludwig Maximilian University of Munich',
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
];

// France: Journey Steps
const stepsFrance = [
  {
    title: 'Connect',
    items: [
      {
        name: 'Profile Evaluation Session',
        description: 'Discuss your preferences, get answers to your questions & a personalised goal plan',
      },
      {
        name: 'University Shortlisting',
        description: 'Our experts will come back with an ideal list of Universities suited only for you',
      },
      {
        name: 'Finalising your University',
        description: 'Discuss your shortlist and finalise universities that you want to apply for',
      },
    ],
  },
  {
    title: 'Application',
    items: [
      {
        name: 'SOP, LOR & Resume Assistance',
        description: 'Get 100+ templates and a professional editor to craft the SOP & LOR for your profile',
      },
      {
        name: 'Application assistance',
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: 'Visa Filing',
    items: [
      {
        name: 'Prep for Visa Interview',
        description: 'Once admit is received, a Visa expert will review your documents and also prep you up for the interview',
      },
    ],
  },
];

// France: FAQ
const faqsFrance = [
  {
    question: 'How can we utilise the credits offered?',
    answer: 'Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.',
  },
  {
    question: 'What are the required application documents?',
    answer: 'Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship',
  },
  {
    question: 'How can Leap help in building profile?',
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: 'How cheaper are the forex charges from the market?',
    answer: 'If payments are done through Leap, you can save upto 25% on forex transactions.',
  },
  {
    question: 'Are there any no-cost EMI options?',
    answer: 'Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.',
  },
  {
    question: 'What if I want to apply to more universities?',
    answer: 'If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.',
  },
];

// Rest of Europe: What makes Leap Scholar different?
const leapStatsRestOfEurope = [
  { value: '100k+', label: 'Success Stories' },
  { value: '$7M', label: 'Worth of Scholarships Granted' },
  { value: '$175M', label: 'In Loan Disbursement' },
  { value: '1M+', label: 'Downloads on IELTS app' },
];

// Rest of Europe: Testimonials
const testimonialsRestOfEurope = [
  {
    name: 'Adarsh Patil',
    university: 'Technical University of Munich',
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: 'Poonam',
    university: 'Heidelberg University',
    text: `I never thought getting a German study permit would be such a smooth task.`,
  },
  {
    name: 'Akhil Surendi',
    university: 'Humboldt University',
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: 'Sai Teja',
    university: 'Ludwig Maximilian University of Munich',
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
];

// Rest of Europe: Journey Steps
const stepsRestOfEurope = [
  {
    title: 'Connect',
    items: [
      {
        name: 'Profile Evaluation Session',
        description: 'Discuss your preferences, get answers to your questions & a personalised goal plan',
      },
      {
        name: 'University Shortlisting',
        description: 'Our experts will come back with an ideal list of Universities suited only for you',
      },
      {
        name: 'Finalising your University',
        description: 'Discuss your shortlist and finalise universities that you want to apply for',
      },
    ],
  },
  {
    title: 'Application',
    items: [
      {
        name: 'SOP, LOR & Resume Assistance',
        description: 'Get 100+ templates and a professional editor to craft the SOP & LOR for your profile',
      },
      {
        name: 'Application assistance',
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: 'Visa Filing',
    items: [
      {
        name: 'Prep for Visa Interview',
        description: 'Once admit is received, a Visa expert will review your documents and also prep you up for the interview',
      },
    ],
  },
];

// Rest of Europe: FAQ
const faqsRestOfEurope = [
  {
    question: 'How can we utilise the credits offered?',
    answer: 'Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.',
  },
  {
    question: 'What are the required application documents?',
    answer: 'Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship',
  },
  {
    question: 'How can Leap help in building profile?',
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: 'How cheaper are the forex charges from the market?',
    answer: 'If payments are done through Leap, you can save upto 25% on forex transactions.',
  },
  {
    question: 'Are there any no-cost EMI options?',
    answer: 'Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.',
  },
  {
    question: 'What if I want to apply to more universities?',
    answer: 'If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.',
  },
];

const investors = ["Investor 1", "Investor 2", "Investor 3", "Investor 4"];

const countryLabels: Record<EuropeCountry, string> = {
  germany: "🇩🇪 Germany",
  france: "🇫🇷 France",
  "rest-of-europe": "🇪🇺 Rest of Europe",
};
const programLabels: Record<USProgram, string> = {
  ug: "UG",
  mba: "MBA",
  ms: "MS",
};

// Germany: What makes Leap Scholar different?
const leapStatsGermany = [
  { value: '100k+', label: 'Success Stories' },
  { value: '$7M', label: 'Worth of Scholarships Granted' },
  { value: '$175M', label: 'In Loan Disbursement' },
  { value: '1M+', label: 'Downloads on IELTS app' },
];

// Germany: Testimonials
const testimonialsGermany = [
  {
    name: 'Adarsh Patil',
    university: 'Technical University of Munich',
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: 'Poonam',
    university: 'Heidelberg University',
    text: `I never thought getting a German study permit would be such a smooth task.`,
  },
  {
    name: 'Akhil Surendi',
    university: 'Humboldt University',
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: 'Sai Teja',
    university: 'Ludwig Maximilian University of Munich',
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
];

// Germany: Journey Steps
const stepsGermany = [
  {
    title: 'Connect',
    items: [
      {
        name: 'Profile Evaluation Session',
        description: 'Discuss your preferences, get answers to your questions & a personalised goal plan',
      },
      {
        name: 'University Shortlisting',
        description: 'Our experts will come back with an ideal list of Universities suited only for you',
      },
      {
        name: 'Finalising your University',
        description: 'Discuss your shortlist and finalise universities that you want to apply for',
      },
    ],
  },
  {
    title: 'Application',
    items: [
      {
        name: 'SOP, LOR & Resume Assistance',
        description: 'Get 100+ templates and a professional editor to craft the SOP & LOR for your profile',
      },
      {
        name: 'Application assistance',
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: 'Visa Filing',
    items: [
      {
        name: 'Prep for Visa Interview',
        description: 'Once admit is received, a Visa expert will review your documents and also prep you up for the interview',
      },
    ],
  },
];

// Germany: FAQ
const faqsGermany = [
  {
    question: 'How can we utilise the credits offered?',
    answer: 'Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.',
  },
  {
    question: 'What are the required application documents?',
    answer: 'Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship',
  },
  {
    question: 'How can Leap help in building profile?',
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: 'How cheaper are the forex charges from the market?',
    answer: 'If payments are done through Leap, you can save upto 25% on forex transactions.',
  },
  {
    question: 'Are there any no-cost EMI options?',
    answer: 'Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.',
  },
  {
    question: 'What if I want to apply to more universities?',
    answer: 'If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.',
  },
];

export default function HomePage() {
  const [section, setSection] = useState<"europe" | "usa">("europe");
  const [countryOrProgram, setCountryOrProgram] = useState<string>("germany");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  let options: { key: string; label: string }[] = [];
  let plans: Plan[] = [];

  if (section === "europe") {
    options = Object.entries(countryLabels).map(([key, label]) => ({ key, label }));
    if (countryOrProgram && countryOrProgram in plansData.europe) {
      plans = plansData.europe[countryOrProgram as EuropeCountry]?.plans || [];
    }
  } else if (section === "usa") {
    options = Object.entries(programLabels).map(([key, label]) => ({ key, label }));
    if (countryOrProgram === 'ug') {
      plans = plansData.usa['ug']?.plans || [];
    } else if (countryOrProgram === 'mba') {
      plans = plansData.usa['mba']?.plans || [];
    } else if (countryOrProgram === 'ms') {
      plans = plansData.usa['ms']?.plans || [];
    }
  }

  // Only show one set of three buttons for USA: UG, MBA, MS
  const usaPrograms = [
    { key: 'ug', label: 'UG' },
    { key: 'mba', label: 'MBA' },
    { key: 'ms', label: 'MS' },
  ];

  // Determine which data to use based on selected region/country
  let leapStats = leapStatsGermany;
  let testimonials = testimonialsGermany;
  let steps = stepsGermany;
  let faqs = faqsGermany;

  if (section === 'europe') {
    if (countryOrProgram === 'germany') {
      leapStats = leapStatsGermany;
      testimonials = testimonialsGermany;
      steps = stepsGermany;
      faqs = faqsGermany;
    } else if (countryOrProgram === 'france') {
      leapStats = leapStatsFrance;
      testimonials = testimonialsFrance;
      steps = stepsFrance;
      faqs = faqsFrance;
    } else if (countryOrProgram === 'rest-of-europe') {
      leapStats = leapStatsRestOfEurope;
      testimonials = testimonialsRestOfEurope;
      steps = stepsRestOfEurope;
      faqs = faqsRestOfEurope;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F4F3FF] to-white pt-20 pb-16 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 font-heading">
          LEAP SCHOLAR <span className="bg-gradient-to-r from-[#5B5FE3] to-[#FF6B35] bg-clip-text text-transparent">PREMIUM</span>
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-10 max-w-2xl mx-auto font-body">
          The premium service which helps you land your dream College
        </p>
        <div className="flex flex-row gap-6 mb-12 justify-center">
          <button
            className={`flex items-center gap-2 px-8 py-3 rounded-full border-2 font-semibold shadow transition-all duration-200 text-lg text-primary ${section === "europe" ? "bg-primary text-white border-primary" : "bg-white border-primary hover:bg-primary hover:text-white"}`}
            onClick={() => { setSection("europe"); setCountryOrProgram("germany"); }}
            aria-pressed={section === "europe"}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '0.25rem', verticalAlign: 'middle' }}>🇪🇺</span> Europe
          </button>
          <button
            className={`flex items-center gap-2 px-8 py-3 rounded-full border-2 font-semibold shadow transition-all duration-200 text-lg text-primary ${section === "usa" ? "bg-primary text-white border-primary" : "bg-white border-primary hover:bg-primary hover:text-white"}`}
            onClick={() => { setSection("usa"); setCountryOrProgram("ug"); }}
            aria-pressed={section === "usa"}
          >
            <span style={{ fontSize: '1.5rem', marginRight: '0.25rem', verticalAlign: 'middle' }}>🇺🇸</span> USA
          </button>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-900 font-heading">
            Select a plan that's best for your study abroad goals
          </h2>
          {section === 'europe' && (
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {options.map(option => (
                <button
                  key={option.key}
                  className={`px-8 py-3 rounded-full font-semibold shadow transition-all duration-200 text-lg border-2 text-primary ${countryOrProgram === option.key ? "bg-primary text-white border-primary" : "bg-white border-primary hover:bg-primary hover:text-white"}`}
                  onClick={() => setCountryOrProgram(option.key)}
                  aria-pressed={countryOrProgram === option.key}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          {/* USA program selector */}
          {section === 'usa' && (
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {usaPrograms.map(program => (
                <button
                  key={program.key}
                  className={`px-8 py-3 rounded-full font-semibold shadow transition-all duration-200 text-lg border-2 text-primary ${countryOrProgram === program.key ? "bg-primary text-white border-primary" : "bg-white border-primary hover:bg-primary hover:text-white"}`}
                  onClick={() => setCountryOrProgram(program.key)}
                  aria-pressed={countryOrProgram === program.key}
                >
                  {program.label}
                </button>
              ))}
            </div>
          )}
          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full">
            {plans.map((plan, index) => (
              <div
                key={plan.tier + index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${plan.tier === "LS Premium" ? "border-primary ring-4 ring-blue-100" : "border-gray-200"}`}
              >
                {plan.tier === "LS Premium" && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
                    <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-10 flex flex-col items-center">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">{plan.tier}</h3>
                    <div className="flex flex-col items-center justify-center mb-2">
                      <span className="text-4xl font-extrabold text-primary">₹{plan.priceRange[0].toLocaleString("en-IN")}</span>
                      <span className="text-lg text-gray-500 line-through mt-0.5">₹{plan.priceRange[1].toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8 w-full">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.applications}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.counsellor}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.ielts}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.sopLorSupport}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.visaSupport}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{plan.scholarshipSupport}</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Accommodation Support: {plan.accommodationSupport ? "Yes" : "No"}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full">
                    <h4 className="font-semibold text-primary mb-2">Credits Worth ₹{plan.creditTotal.toLocaleString("en-IN")}</h4>
                    <ul className="space-y-1">
                      {Object.entries(plan.creditBreakdown).map(([key, value], idx) =>
                        value ? (
                          <li key={key} className="text-sm text-gray-600">• {key.replace(/([A-Z])/g, " $1")}: ₹{value.toLocaleString("en-IN")}</li>
                        ) : null
                      )}
                    </ul>
                  </div>
                  {plan.addOns && (
                    <div className="mb-6 w-full">
                      <h4 className="font-semibold text-primary mb-2">Available add-ons:</h4>
                      <ul className="space-y-1">
                        {plan.addOns.map((addon, idx) => (
                          <li key={idx} className="text-sm text-gray-600">• {addon}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 mt-2 ${plan.tier === "LS Premium" ? "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl" : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white"}`}>
                    Enrol Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white font-heading">
            What makes Leap Scholar different?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {leapStats.map((stat: { value: string; label: string }, index: number) => (
              <div key={index} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-heading">
            See why our students ❤ us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial: { name: string; university: string; text: string }, index: number) => (
              <div key={index} className="bg-gradient-to-br from-background to-secondary/10 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.university}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section - Smart Animated Zig-Zag Stepper */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900 font-heading">
            Your study abroad journey with Leap Scholar
          </h2>
          <div className="relative flex flex-col items-center">
            {/* Animated SVG line with pulse dot */}
            <motion.svg
              className="hidden md:block absolute left-0 right-0 top-20 w-full h-48 z-0"
              viewBox="0 0 1200 192"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.path
                d="M 80 96 Q 300 0 600 96 Q 900 192 1120 96"
                stroke="#5B5FE3"
                strokeWidth="3"
                fill="none"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
                }}
                initial="hidden"
                animate="visible"
              />
              {/* Pulse dot animation */}
              <motion.circle
                r="10"
                fill="#5B5FE3"
                initial={{ cx: 80, cy: 96, opacity: 0 }}
                animate={{
                  cx: [80, 300, 600, 900, 1120],
                  cy: [96, 0, 96, 192, 96],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.svg>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full z-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className={`flex flex-col items-center relative ${idx % 2 === 1 ? 'md:mt-24' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.15 }}
                >
                  <motion.div
                    className="bg-white border-4 border-primary rounded-full w-20 h-20 flex items-center justify-center mb-2 shadow-lg z-20"
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(91,95,227,0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 + idx * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Icon for each step */}
                    {idx === 0 && <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10l-3-3m3 3l3-3" /></svg>}
                    {idx === 1 && <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>}
                    {idx === 2 && <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M3 20h9" /></svg>}
                  </motion.div>
                  <div className="bg-white rounded-xl shadow-md px-4 py-2 mb-6 -mt-2">
                    <h3 className="text-lg md:text-xl font-bold text-center font-heading text-gray-900 whitespace-normal">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    {step.items.map((item, itemIdx) => (
                      <motion.div
                        key={itemIdx}
                        className={`bg-gray-100 rounded-xl p-4 shadow text-center mx-auto max-w-xs cursor-pointer ${itemIdx === 0 ? 'border-2 border-primary bg-white' : ''}`}
                        whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(91,95,227,0.10)' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + itemIdx * 0.1 }}
                      >
                        <div className="font-semibold text-primary mb-1">{item.name}</div>
                        <div className="text-gray-600 text-sm font-body">{item.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 font-heading">
            Trusted and backed by marquee global investors
          </h2>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {investors.map((inv, idx) => (
              <div key={idx} className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 font-semibold">{inv}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Accordion) */}
      <section className="py-16 px-4 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-heading">
            Got questions? Find your answers here
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none hover:bg-gray-50 transition"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <span className="text-lg font-semibold text-gray-900 font-heading">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary" />
                  )}
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`px-6 pb-6 text-gray-600 font-body transition-all duration-300 ${openFaq === index ? 'block' : 'hidden'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-heading">
            Ready to start your journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 font-body">
            Join thousands of students who have successfully studied abroad with Leap Scholar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
              View All Plans
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-primary mr-2" />
                <span className="text-2xl font-bold font-heading">LEAP SCHOLAR</span>
              </div>
              <p className="text-gray-400 font-body">
                Your trusted partner for studying abroad
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Destinations</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li><a href="#" className="hover:text-white transition-colors">Germany</a></li>
                <li><a href="#" className="hover:text-white transition-colors">France</a></li>
                <li><a href="#" className="hover:text-white transition-colors">USA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rest of Europe</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Services</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li><a href="#" className="hover:text-white transition-colors">IELTS Preparation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SOP Writing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Visa Guidance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Loan Assistance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Support</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 font-body">
            <p>&copy; 2025 Leap Scholar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
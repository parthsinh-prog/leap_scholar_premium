"use client"
import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from "react"
import { CheckCircle, Star, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { plansData, unifiedPlansData, type EuropeCountry, type USProgram, type Plan, type UnifiedSelection } from "../constants/plans"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { setRegion, setCountryOrProgram, setUnifiedSelection, setOpenFaqIndex } from "../store/uiSlice"
import JourneyTimeline from "../components/JourneyTimeline/JourneyTimeline"
import { AnimatedStatCard } from "../components/AnimatedStatCard/AnimatedStatCard"
import { countryProgramData } from "../data/countryProgramData"

// France: What makes Leap Scholar different?
const leapStatsFrance = [
  { value: "100k+", label: "Success Stories" },
  { value: "$7M", label: "Worth of Scholarships Granted" },
  { value: "$175M", label: "In Loan Disbursement" },
  { value: "1M+", label: "Downloads on IELTS app" },
]

// France: Testimonials
const testimonialsFrance = [
  {
    name: "Adarsh Patil",
    university: "Sorbonne University",
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: "Poonam",
    university: "École Polytechnique",
    text: `I never thought getting a France study permit would be such a smooth task.`,
  },
  {
    name: "Akhil Surendi",
    university: "Sciences Po",
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: "Sai Teja",
    university: "HEC Paris",
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
]

// France: Journey Steps
const stepsFrance = [
  {
    title: "Connect",
    items: [
      {
        name: "Profile Evaluation Session",
        description: "Discuss your preferences, get answers to your questions & a personalised goal plan",
      },
      {
        name: "University Shortlisting",
        description: "Our experts will come back with an ideal list of Universities suited only for you",
      },
      {
        name: "Finalising your University",
        description: "Discuss your shortlist and finalise universities that you want to apply for",
      },
    ],
  },
  {
    title: "Application",
    items: [
      {
        name: "SOP, LOR & Resume Assistance",
        description: "Get 100+ templates and a professional editor to craft the SOP & LOR for your profile",
      },
      {
        name: "Application assistance for your Dream Universities",
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: "Visa Filing",
    items: [
      {
        name: "Prep for Visa Interview",
        description:
          "Once admit is received, a Visa expert will review your documents and also prep you up for the interview",
      },
    ],
  },
  {
    title: "Finally",
    items: [
      {
        name: "Fly to your dream college ✈️",
        description:
          "That's it, you're ready to fly! Leap Community will be waiting to welcome you in your dream college",
      },
    ],
  },
]

// France: FAQ
const faqsFrance = [
  {
    question: "How can we utilise the credits offered?",
    answer: "Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.",
  },
  {
    question: "What are the required application documents?",
    answer:
      "Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship",
  },
  {
    question: "How can Leap help in building profile?",
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: "How cheaper are the forex charges from the market?",
    answer: "If payments are done through Leap, you can save upto 25% on forex transactions.",
  },
  {
    question: "Are there any no-cost EMI options?",
    answer:
      "Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.",
  },
  {
    question: "What if I want to apply to more universities?",
    answer:
      "If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.",
  },
]

// Rest of Europe: What makes Leap Scholar different?
const leapStatsRestOfEurope = [
  { value: "100k+", label: "Success Stories" },
  { value: "$7M", label: "Worth of Scholarships Granted" },
  { value: "$175M", label: "In Loan Disbursement" },
  { value: "1M+", label: "Downloads on IELTS app" },
]

// Rest of Europe: Testimonials
const testimonialsRestOfEurope = [
  {
    name: "Adarsh Patil",
    university: "University of Amsterdam",
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: "Poonam",
    university: "KU Leuven",
    text: `I never thought getting a European study permit would be such a smooth task.`,
  },
  {
    name: "Akhil Surendi",
    university: "University of Zurich",
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: "Sai Teja",
    university: "Trinity College Dublin",
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
]

// Rest of Europe: Journey Steps
const stepsRestOfEurope = [
  {
    title: "Connect",
    items: [
      {
        name: "Profile Evaluation Session",
        description: "Discuss your preferences, get answers to your questions & a personalised goal plan",
      },
      {
        name: "University Shortlisting",
        description: "Our experts will come back with an ideal list of Universities suited only for you",
      },
      {
        name: "Finalising your University",
        description: "Discuss your shortlist and finalise universities that you want to apply for",
      },
    ],
  },
  {
    title: "Application",
    items: [
      {
        name: "SOP, LOR & Resume Assistance",
        description: "Get 100+ templates and a professional editor to craft the SOP & LOR for your profile",
      },
      {
        name: "Application assistance for your Dream Universities",
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: "Visa Filing",
    items: [
      {
        name: "Prep for Visa Interview",
        description:
          "Once admit is received, a Visa expert will review your documents and also prep you up for the interview",
      },
    ],
  },
  {
    title: "Finally",
    items: [
      {
        name: "Fly to your dream college ✈️",
        description:
          "That's it, you're ready to fly! Leap Community will be waiting to welcome you in your dream college",
      },
    ],
  },
]

// Rest of Europe: FAQ
const faqsRestOfEurope = [
  {
    question: "How can we utilise the credits offered?",
    answer: "Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.",
  },
  {
    question: "What are the required application documents?",
    answer:
      "Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship",
  },
  {
    question: "How can Leap help in building profile?",
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: "How cheaper are the forex charges from the market?",
    answer: "If payments are done through Leap, you can save upto 25% on forex transactions.",
  },
  {
    question: "Are there any no-cost EMI options?",
    answer:
      "Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.",
  },
  {
    question: "What if I want to apply to more universities?",
    answer:
      "If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.",
  },
]

const investors = [
  { name: "Sequoia Capital India", img: "/sequoia_leap.webp" },
  { name: "Owl Ventures", img: "/owl_leap.webp" },
  { name: "Jungle Ventures", img: "/Jungle_leap.webp" },
  { name: "Harvard Management Company", img: "/Harvard_leap.webp" },
]

// Germany: What makes Leap Scholar different?
const leapStatsGermany = [
  { value: "100k+", label: "Success Stories" },
  { value: "$7M", label: "Worth of Scholarships Granted" },
  { value: "$175M", label: "In Loan Disbursement" },
  { value: "1M+", label: "Downloads on IELTS app" },
]

// Germany: Testimonials
const testimonialsGermany = [
  {
    name: "Adarsh Patil",
    university: "Technical University of Munich",
    text: `Even when my visa looked difficult, Leap didn’t give up and guided me throughout the process.`,
  },
  {
    name: "Poonam",
    university: "Heidelberg University",
    text: `I never thought getting a German study permit would be such a smooth task.`,
  },
  {
    name: "Akhil Surendi",
    university: "Humboldt University",
    text: `Leap Scholar's expert guidance transformed my profile, helping me get into my dream university!`,
  },
  {
    name: "Sai Teja",
    university: "Ludwig Maximilian University of Munich",
    text: `I had an outstanding experience with Leap Scholar. I completed my IELTS coaching and achieved my desired band score in just 1.5 months.`,
  },
]

// Germany: Journey Steps
const stepsGermany = [
  {
    title: "Connect",
    items: [
      {
        name: "Profile Evaluation Session",
        description: "Discuss your preferences, get answers to your questions & a personalised goal plan",
      },
      {
        name: "University Shortlisting",
        description: "Our experts will come back with an ideal list of Universities suited only for you",
      },
      {
        name: "Finalising your University",
        description: "Discuss your shortlist and finalise universities that you want to apply for",
      },
    ],
  },
  {
    title: "Application",
    items: [
      {
        name: "SOP, LOR & Resume Assistance",
        description: "Get 100+ templates and a professional editor to craft the SOP & LOR for your profile",
      },
      {
        name: "Application assistance for your Dream Universities",
        description: `You're almost at the finish line, all that's left now is to put in your application (Don't worry our team of experts will do that for you!)`,
      },
    ],
  },
  {
    title: "Visa Filing",
    items: [
      {
        name: "Prep for Visa Interview",
        description:
          "Once admit is received, a Visa expert will review your documents and also prep you up for the interview",
      },
    ],
  },
  {
    title: "Finally",
    items: [
      {
        name: "Fly to your dream college ✈️",
        description:
          "That's it, you're ready to fly! Leap Community will be waiting to welcome you in your dream college",
      },
    ],
  },
]

// Germany: FAQ
const faqsGermany = [
  {
    question: "How can we utilise the credits offered?",
    answer: "Credits can be utilised in terms of Amazon Vouchers, if mentioned services are opted in through Leap.",
  },
  {
    question: "What are the required application documents?",
    answer:
      "Application process for Germany may require following documents to be prepared and submitted by the student.\n1. SOP\n2. LOR\n3. Resume\n4. Essay\n5. Visa SOP\n6. Scholarship",
  },
  {
    question: "How can Leap help in building profile?",
    answer: `Dedicated counsellors with 10+ years of expertise are assigned that will counsel the students in evaluating the profile, and recommend methods through which student can improve their profile to improve their chances of admissions. This is highly recommended for students who are planning for future intakes.`,
  },
  {
    question: "How cheaper are the forex charges from the market?",
    answer: "If payments are done through Leap, you can save upto 25% on forex transactions.",
  },
  {
    question: "Are there any no-cost EMI options?",
    answer:
      "Yes, we have partnered with 10+ national banks to offer no-cost EMI options to you, so that paying for this package, does not become a blocker for your study abroad dreams.",
  },
  {
    question: "What if I want to apply to more universities?",
    answer:
      "If you wish to get more shortlists and apply to more universities, Leap will charge a flat ₹10,000 fee, if the deposit to the university is done through us.",
  },
]

// USA: Testimonials
const testimonialsUSAUG = [
  {
    name: "Emily Johnson",
    university: "University of California, Berkeley",
    text: `Leap Scholar made my undergraduate application process seamless and stress-free!`,
  },
  {
    name: "Rahul Mehta",
    university: "University of Michigan",
    text: `Thanks to Leap Scholar, I got into my dream UG program in the US!`,
  },
  {
    name: "Samantha Lee",
    university: "University of Texas at Austin",
    text: `The guidance and support from Leap Scholar was invaluable for my UG journey.`,
  },
  {
    name: "Carlos Ramirez",
    university: "University of Washington",
    text: `Leap Scholar's expert team helped me every step of the way!`,
  },
]

const testimonialsUSAMBA = [
  {
    name: "Priya Singh",
    university: "Harvard Business School",
    text: `Leap Scholar's MBA counseling was top-notch and helped me get into a top B-school!`,
  },
  {
    name: "John Smith",
    university: "Stanford Graduate School of Business",
    text: `The personalized support from Leap Scholar made all the difference for my MBA applications.`,
  },
  {
    name: "Mei Chen",
    university: "Wharton School, University of Pennsylvania",
    text: `Leap Scholar's team was always there to answer my questions and guide me.`,
  },
  {
    name: "Ahmed Al-Farsi",
    university: "Kellogg School of Management",
    text: `I couldn't have navigated the MBA process without Leap Scholar!`,
  },
]

const testimonialsUSAMS = [
  {
    name: "Ananya Gupta",
    university: "Massachusetts Institute of Technology",
    text: `Leap Scholar's MS counseling helped me get into MIT!`,
  },
  {
    name: "David Kim",
    university: "California Institute of Technology",
    text: `The expert advice from Leap Scholar was crucial for my MS applications.`,
  },
  {
    name: "Fatima Zahra",
    university: "Carnegie Mellon University",
    text: `Leap Scholar's support made my MS journey smooth and successful.`,
  },
  {
    name: "Lucas Rossi",
    university: "University of Illinois Urbana-Champaign",
    text: `I highly recommend Leap Scholar for anyone applying to MS programs in the US!`,
  },
]

// --- Auto-scrolling Testimonials Carousel ---
function AutoScrollTestimonials({
  testimonials,
}: { testimonials: { name: string; university: string; text: string }[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    let scrollAmount = 0
    let frameId: number
    const speed = 0.5 // px per frame
    function animate() {
      if (container && container.scrollWidth - container.clientWidth > 0) {
        scrollAmount += speed
        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          scrollAmount = 0
        }
        container.scrollLeft = scrollAmount
      }
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [testimonials])

  // Duplicate testimonials for seamless loop
  const items = [...testimonials, ...testimonials]

  return (
    <div
      ref={scrollRef}
      className="flex gap-8 overflow-x-auto no-scrollbar py-2 px-1 justify-center items-center"
      style={{ scrollBehavior: "auto", whiteSpace: "nowrap" }}
    >
      {items.map((testimonial, idx) => (
        <div
          key={idx}
          className="min-w-[320px] max-w-xs bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/10 border border-white/30 p-8 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-3xl hover:shadow-primary/15 hover:scale-[1.03] flex-shrink-0"
        >
          <div className="flex items-center mb-4 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-700 mb-4 italic text-center text-lg font-body leading-relaxed break-words whitespace-pre-line w-full">
            {testimonial.text}
          </p>
          <div className="border-t pt-4 w-full flex flex-col items-center">
            <p className="font-semibold text-gray-900 text-center text-base font-heading mb-1">{testimonial.name}</p>
            <p className="text-sm text-gray-500 text-center font-body">{testimonial.university}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const dispatch = useDispatch()
  const section = useSelector<RootState, string>((state) => state.ui.region)
  const countryOrProgram = useSelector<RootState, string>((state) => state.ui.countryOrProgram)
  const unifiedSelection = useSelector<RootState, UnifiedSelection>((state) => state.ui.unifiedSelection)
  const openFaq = useSelector<RootState, number | null>((state) => state.ui.openFaqIndex)

  // Helper function to highlight key terms (but not for LS Plus)
  const highlightKeyTerms = (text: string, planTier: string) => {
    // Don't highlight anything for LS Plus - keep it basic
    if (planTier === 'LS Plus') {
      return text;
    }
    
    // Only highlight premium features for LS Premium and LS Elite
    const keyTerms = [
      'Unlimited', 'Upto 3', 'Upto 7',
      'Premium', 'Lead Counsellor', 'Senior Counsellor',
      'Band Assurance',
      'End-to-End', 'APS',
      'Accommodation', 'Forex Partners'
    ];
    
    let highlightedText = text;
    keyTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="font-bold text-[#6F5ACC]">${term}</span>`);
    });
    
    return highlightedText;
  };

  // Modal state for add-ons and credits
  const [openAddOnsModal, setOpenAddOnsModal] = useState<number | null>(null)
  const [openCreditsModal, setOpenCreditsModal] = useState<number | null>(null)

  // Modal close handler (ESC key, click outside, close button)
  useEffect(() => {
    if (openAddOnsModal !== null || openCreditsModal !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpenAddOnsModal(null)
          setOpenCreditsModal(null)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [openAddOnsModal, openCreditsModal])

  // Modal overlay click handler
  // const handleModalOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (e.target === e.currentTarget) setOpenAddOnsModal(null);
  // };

  // Add scroll tracking for header shadow adjustment
  useEffect(() => {
    const handleScroll = () => {
      const countrySelector = document.querySelector('[data-section="country-selector"]') as HTMLElement
      if (countrySelector) {
        const rect = countrySelector.getBoundingClientRect()
        const isInCountrySelectorArea = rect.top <= 100 && rect.bottom >= 100

        // Dispatch action to adjust header shadow based on scroll position
        // This will be handled in the header component
        if (isInCountrySelectorArea) {
          // Add a class to body or dispatch action to reduce header shadow
          document.body.classList.add("header-reduced-shadow")
        } else {
          document.body.classList.remove("header-reduced-shadow")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top when site loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // New unified options for the 4-button layout
  const unifiedOptions = useMemo(() => [
    { key: 'germany', label: '🇩🇪 Germany', icon: '🇩🇪' },
  ] as const, []);

  // Get plans from unified data structure
  const plans: Plan[] = unifiedPlansData[unifiedSelection]?.plans || []

  // --- Unified Selector Animation State ---
  const optionBtnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [optionIndicator, setOptionIndicator] = useState({ left: 0, width: 0 })
  useLayoutEffect(() => {
    const idx = unifiedOptions.findIndex((opt) => opt.key === unifiedSelection)
    const btn = optionBtnRefs.current[idx]
    if (btn) {
      const newLeft = btn.offsetLeft
      const newWidth = btn.offsetWidth
      if (optionIndicator.left !== newLeft || optionIndicator.width !== newWidth) {
        setOptionIndicator({ left: newLeft, width: newWidth })
      }
    }
  }, [unifiedSelection, unifiedOptions, optionIndicator.left, optionIndicator.width, optionBtnRefs])

  // Only show one set of three buttons for USA: UG, MBA, MS
  // const usaPrograms = [
  //   { key: 'ug', label: 'UG' },
  //   { key: 'mba', label: 'MBA' },
  //   { key: 'ms', label: 'MS' },
  // ];

  // Determine which data to use based on unified selection
  let leapStats = leapStatsGermany
  let testimonials = testimonialsGermany
  let faqs = faqsGermany
  let steps = stepsFrance // Default to France steps

  switch (unifiedSelection) {
    case 'usa-unified':
      // For USA unified, we can use any of the USA testimonials - let's use UG as default
      leapStats = leapStatsGermany // USA doesn't have separate stats, use default
      testimonials = testimonialsUSAUG
      faqs = faqsGermany // USA doesn't have separate FAQs, use default
      steps = stepsFrance // Use France steps as default
      break
    case 'germany':
      leapStats = leapStatsGermany
      testimonials = testimonialsGermany
      faqs = faqsGermany
      steps = stepsFrance // Use France steps for now
      break
    case 'france':
      leapStats = leapStatsFrance
      testimonials = testimonialsFrance
      faqs = faqsFrance
      steps = stepsFrance
      break
    case 'rest-of-europe':
      leapStats = leapStatsRestOfEurope
      testimonials = testimonialsRestOfEurope
      faqs = faqsRestOfEurope
      steps = stepsFrance // Use France steps for now
      break
  }

  const segmentedControlRef = useRef<HTMLDivElement>(null)
  const prevUnifiedSelection = useRef(unifiedSelection)
  useEffect(() => {
    if (prevUnifiedSelection.current !== unifiedSelection && segmentedControlRef.current) {
      const header = document.querySelector("header")
      const headerHeight = header ? header.getBoundingClientRect().height : 80
      const top = segmentedControlRef.current.getBoundingClientRect().top + window.scrollY - headerHeight - 12
      window.scrollTo({ top, behavior: "smooth" })
      prevUnifiedSelection.current = unifiedSelection
    }
  }, [unifiedSelection])

  // Calculate the number of plans for the current selection
  const numPlans = plans.length

  // Function to get the "Most Popular" tag based on selected destination
  const getMostPopularTag = (selection: UnifiedSelection) => {
    return 'Most Popular'
  }

  const [selectedRegion, setSelectedRegion] = React.useState("Germany");
  const [selectedSubRegion, setSelectedSubRegion] = React.useState("Germany");

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    // Reset sub-region to default when region changes
    const defaultSubRegion = Object.keys(countryProgramData[region])[0];
    setSelectedSubRegion(defaultSubRegion);
  };

  const handleSubRegionChange = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
  };

  const selectedData = countryProgramData[selectedRegion][selectedSubRegion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white min-w-full">
      {/* Hero Section - HGI iOS Design */}
      <section className="bg-gradient-to-b from-[#F4F3FF] to-white pt-20 md:pt-32 pb-16 md:pb-24 text-center flex flex-col items-center">
        {/* Brand Identifier - Smaller and Elegant */}
        <div className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#6F5ACC]/20">
            <span className="text-sm md:text-base font-semibold text-gray-700 tracking-wide">LEAP SCHOLAR</span>
            <span className="text-sm md:text-base font-bold bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent">PREMIUM</span>
          </div>
          <div className="mt-3">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent">Germany</span>
          </div>
        </div>
        
        {/* Hero Statement - The Main Focus */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight font-heading px-6 leading-[1.1] max-w-6xl mx-auto">
            <span className="bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent">
              Your Dream University
            </span>
            <br />
            <span className="text-gray-900">
              Awaits
            </span>
          </h1>
        </div>
      </section>

      {/* Main Content Sections */}
      {/* Plan Selection */}
      <section
        className="py-8 md:py-12 bg-gradient-to-br from-gray-50/50 to-white"
        data-section="plans"
      >
            <div className="flex flex-col items-center px-6">
              {/* Plans Grid with HGI iOS spacing */}
              <div
                className={`grid gap-8 w-full justify-center items-stretch mx-auto ${
                  numPlans === 4
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    : numPlans === 3
                      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                      : numPlans === 2
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
                        : "grid-cols-1"
                }`}
                style={{ maxWidth: numPlans === 4 ? "1280px" : numPlans === 3 ? "960px" : "640px" }}
              >
                {plans.map((plan, index) => (
                  <div
                    key={plan.tier + index}
                    className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/8 border border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/12 hover:scale-[1.02] group ${plan.tier === "LS Elite" ? "ring-2 ring-primary/30 bg-gradient-to-br from-white/98 to-primary/8" : "bg-white/95"}`}
                  >
                    {plan.tier === "LS Elite" && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
                        <span className="bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/30 whitespace-nowrap">
                          {getMostPopularTag(unifiedSelection)}
                        </span>
                      </div>
                    )}
                    <div className="p-8 md:p-10 flex flex-col items-center">
                      <div className="text-center mb-8 md:mb-10">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 font-heading tracking-tight">
                          {plan.tier}
                        </h3>
                        <div className="flex flex-col items-center justify-center mb-3 md:mb-4">
                          <span className={`text-4xl md:text-5xl font-bold tracking-tight ${plan.tier === "LS Elite" ? "text-primary" : "text-gray-900"}`}>
                            ₹{plan.priceRange[0].toLocaleString("en-IN")}
                          </span>
                          <span className="text-base md:text-lg text-gray-400 line-through mt-2 font-medium">
                            ₹{plan.priceRange[1].toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 w-full">
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.applications, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.counsellor, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.ielts, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.sopLorSupport, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.visaSupport, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightKeyTerms(plan.scholarshipSupport, plan.tier) }}
                          />
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover:item:scale-110 transition-transform duration-200" />
                          <span 
                            className="text-gray-700 font-medium leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: highlightKeyTerms(
                                plan.accommodationSupport ? "Access to Accommodation and Forex Partners" : "No Accommodation and Forex Support",
                                plan.tier
                              ) 
                            }}
                          />
                        </div>
                      </div>
                      {/* Credits Modal Trigger */}
                      <div className="w-full flex justify-center relative mb-4">
                        <button
                          type="button"
                          className="bg-gradient-to-r from-[#6F5ACC]/10 to-[#A291FB]/10 border border-primary text-primary px-6 py-3 rounded-xl font-semibold text-base shadow hover:bg-gradient-to-r hover:from-[#6F5ACC] hover:to-[#A291FB] hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary h-12 min-w-[240px] whitespace-nowrap"
                          onClick={() => setOpenCreditsModal(index)}
                          aria-label="View Credits Details"
                        >
                          View Credits
                        </button>
                        {/* Credits Modal */}
                        {openCreditsModal === index && (
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-40 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fadeIn"
                            style={{ minWidth: "300px" }}
                          >
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-primary text-lg flex items-center">
                                  <div className="w-2 h-2 bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] rounded-full mr-3 animate-pulse"></div>
                                  Credits Worth ₹{plan.creditTotal.toLocaleString("en-IN")}
                                </h4>
                                <button
                                  onClick={() => setOpenCreditsModal(null)}
                                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                  aria-label="Close modal"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                  </svg>
                                </button>
                              </div>
                              <div className="space-y-3">
                                {Object.entries(plan.creditBreakdown).map(([key, value], idx) =>
                                  value ? (
                                    <div key={key} className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100/50 hover:bg-gray-100/80 transition-all duration-300 group/item">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                          <div className="w-8 h-8 bg-gradient-to-br from-[#6F5ACC]/20 to-[#A291FB]/20 rounded-lg flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-300">
                                            <div className="w-2 h-2 bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] rounded-full"></div>
                                          </div>
                                          <span className="font-semibold text-gray-800 text-sm">
                                            {key.replace(/([A-Z])/g, " $1").replace(/^\s/, "")}
                                          </span>
                                        </div>
                                        <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg text-sm">
                                          ₹{value.toLocaleString("en-IN")}
                                        </span>
                                      </div>
                                    </div>
                                  ) : null,
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* Add-ons Modal Trigger */}
                      {plan.addOns ? (
                        <div className="w-full flex justify-center relative mb-4">
                          <button
                            type="button"
                            className="bg-white border border-primary text-primary px-6 py-3 rounded-xl font-semibold text-base shadow hover:bg-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary h-12 min-w-[240px] whitespace-nowrap"
                            onClick={() => setOpenAddOnsModal(index)}
                            aria-label="View Available Add-ons"
                          >
                            View Available Add-ons
                          </button>
                          {/* Contextual Popover Modal */}
                          {openAddOnsModal === index && (
                            <div
                              className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 z-40 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fadeIn"
                              style={{ minWidth: "260px" }}
                            >
                              {/* Arrow indicator */}
                              <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 shadow" />
                              <div className="p-6">
                                <div className="flex justify-between items-center mb-4">``
                                  <h4 className="font-bold text-[#3B5AFE] text-lg">Available add-ons</h4>
                                  <button
                                    type="button"
                                    className="text-gray-400 hover:text-primary text-lg font-bold focus:outline-none"
                                    onClick={() => setOpenAddOnsModal(null)}
                                    aria-label="Close"
                                  >
                                    &times;
                                  </button>
                                </div>
                                <ul className="space-y-3 w-full pl-2">
                                  {plan.addOns.map((addon, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-3 text-sm text-gray-700 font-medium py-2 px-3 rounded-lg bg-gray-50"
                                    >
                                      <span className="mt-1 w-2 h-2 rounded-full bg-[#3B5AFE] flex-shrink-0"></span>
                                      <span>{addon}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Empty spacer to maintain consistent spacing when no add-ons */
                        <div className="h-4"></div>
                      )}
                      
                      {/* Primary Action Button */}
                      <div className="w-full flex justify-center">
                        <button
                          className={`py-3 px-8 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 h-12 min-w-[240px] whitespace-nowrap ${plan.tier === "LS Elite" ? "bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] text-white hover:from-[#A291FB] hover:to-[#6F5ACC] shadow-primary/25" : "bg-white border border-primary text-primary hover:bg-primary hover:text-white shadow-primary/10"}`}
                        >
                          Enrol Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-[#3B5AFE] via-[#4C67FF] to-[#5B78FF]">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-white font-heading tracking-tight drop-shadow-sm">
                What makes{" "}
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-extrabold">
                  Leap Scholar
                </span>{" "}
                different?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {leapStats.map((stat: { value: string; label: string }, index: number) => (
                  <AnimatedStatCard
                    key={index}
                    stat={stat}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Study Abroad Journey Section - Progressive Timeline */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6F5ACC] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <JourneyTimeline />
            </div>
          </section>

          {/* Testimonials - Auto-scrolling Carousel */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" data-section="testimonials">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900 font-heading tracking-tight">
                See why our students{" "}
                <span className="text-red-500 text-4xl md:text-5xl">❤</span>{" "}
                <span className="bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent font-extrabold">
                  us
                </span>
              </h2>
              <div className="relative">
                <AutoScrollTestimonials testimonials={testimonials} />
              </div>
            </div>
          </section>


          {/* FAQ Section - HGI iOS Glassmorphism Accordion */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8F7FF] via-white to-blue-50/40" data-section="faqs">
            <div className="max-w-5xl mx-auto px-4">
              <div className="max-w-3xl w-full mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-900 font-heading tracking-tight drop-shadow-sm">
                  Got questions?{" "}
                  <span className="bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent font-extrabold">
                    Find your answers here
                  </span>
                </h2>
                <div className="space-y-4 md:space-y-6">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div
                      key={index}
                      className={`relative transition-all duration-400 overflow-hidden rounded-2xl shadow-lg shadow-gray-200/40 ${isOpen ? "shadow-xl shadow-gray-300/50" : ""}`}
                    >
                      <button
                        className={`w-full flex justify-between items-center px-7 py-6 text-left focus:outline-none focus:ring-0 border-0 outline-0 transition-all duration-300 font-heading text-lg font-bold text-gray-900 active:scale-[0.98]`}
                        onClick={() => dispatch(setOpenFaqIndex(isOpen ? null : index))}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        style={{ 
                          WebkitTapHighlightColor: "transparent",
                          border: "none",
                          outline: "none",
                          boxShadow: "none"
                        }}
                      >
                        <span className="flex-1 text-left leading-snug">{faq.question}</span>
                        <span className="ml-4 flex items-center justify-center">
                          {isOpen ? (
                            <ChevronUp className="w-7 h-7 text-[#6F5ACC] transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-7 h-7 text-[#6F5ACC] transition-transform duration-300" />
                          )}
                        </span>
                      </button>
                      <div
                        id={`faq-panel-${index}`}
                        className={`px-7 pb-7 text-gray-700 font-body text-base transition-all duration-400 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                        style={{
                          transitionProperty: "max-height, opacity",
                        }}
                        aria-hidden={!isOpen}
                      >
                        <div className="pt-2 whitespace-pre-line break-words">{faq.answer}</div>
                      </div>
                      {/* Animated border indicator for open state */}
                      {isOpen && (
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#6F5ACC] to-[#A291FB] animate-fadeIn" />
                      )}
                    </div>
                  )
                })}
                </div>
              </div>
            </div>
          </section>

          {/* Trust Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
            <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-16 text-gray-900 font-heading tracking-tight">
              Trusted and backed by{" "}
              <span className="bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] bg-clip-text text-transparent font-extrabold">
                marquee global investors
              </span>
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {investors.map((inv, idx) => (
                <div key={idx} className="flex flex-col items-center w-32 md:w-40 group hover:scale-105 transition-all duration-300">
                  <div className="w-28 md:w-36 h-14 md:h-18 flex items-center justify-center mb-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 group-hover:shadow-xl group-hover:bg-white/90 transition-all duration-300">
                    <Image
                      src={inv.img || "/placeholder.svg"}
                      alt={inv.name}
                      width={128}
                      height={64}
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-semibold text-center leading-tight group-hover:text-gray-800 transition-colors duration-300">
                    {inv.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

          {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#3B5AFE] via-[#4C67FF] to-[#5B78FF] text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 font-heading tracking-tight">
            Ready to start your{" "}
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-extrabold">
              journey
            </span>
            ?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 md:mb-16 font-medium leading-relaxed max-w-2xl mx-auto">
            Join thousands of students who have successfully studied abroad with Leap Scholar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <button className="bg-white/95 backdrop-blur-sm text-[#3B5AFE] px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl shadow-xl border border-white/50 hover:bg-white hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 group">
              <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                Get Free Consultation
              </span>
            </button>
            <button className="bg-transparent border-2 border-white/80 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-lg md:text-xl backdrop-blur-sm hover:bg-white/10 hover:border-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 group">
              <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                View All Plans
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="p-1 bg-white/10 backdrop-blur-sm rounded-2xl mr-4 overflow-visible">
                  <Image 
                    src="/leap.png" 
                    alt="Leap Scholar Logo" 
                    width={80} 
                    height={80} 
                    className="object-contain transform scale-125"
                  />
                </div>
                <span className="text-2xl md:text-3xl font-bold font-heading bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LEAP SCHOLAR
                </span>
              </div>
              <p className="text-gray-400 font-medium leading-relaxed text-lg">
                Your trusted partner for studying abroad
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-6 font-heading text-white">Destinations</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🇩🇪 Germany
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🇫🇷 France
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🇺🇸 USA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🇪🇺 Rest of Europe
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-6 font-heading text-white">Services</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    📚 IELTS Preparation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    ✍️ SOP Writing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🛂 Visa Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    💰 Loan Assistance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold mb-6 font-heading text-white">Support</h4>
              <ul className="space-y-3 text-gray-400 font-medium">
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    📞 Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    ❓ FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    🔒 Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    📋 Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-8 md:pt-10 text-center">
            <p className="text-gray-400 font-medium text-lg">
              &copy; 2025{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
                Leap Scholar
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

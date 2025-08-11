"use client"
import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from "react"
import { CheckCircle, Star, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { plansData, unifiedPlansData, type EuropeCountry, type USProgram, type Plan, type UnifiedSelection } from "../constants/plans"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store"
import { setRegion, setCountryOrProgram, setUnifiedSelection, setOpenFaqIndex, setMainSection, type MainSection } from "../store/uiSlice"
import SegmentedControl from "../components/SegmentedControl/SegmentedControl"

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
  const mainSection = useSelector<RootState, string>((state) => state.ui.mainSection)

  // Modal state for add-ons
  const [openAddOnsModal, setOpenAddOnsModal] = useState<number | null>(null)

  // Modal close handler (ESC key, click outside, close button)
  useEffect(() => {
    if (openAddOnsModal !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpenAddOnsModal(null)
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [openAddOnsModal])

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

  // Function to handle segmented control option clicks and scroll to respective sections
  const handleSegmentedControlClick = (value: string) => {
    setTimeout(() => {
      let targetSection: string
      let headerOffset: number

      switch (value) {
        case "plans":
          targetSection = "plans"
          headerOffset = 120 // Increased offset for plans section to appear below header
          break
        case "testimonials":
          targetSection = "testimonials"
          headerOffset = 80 // Standard header height
          break
        case "faqs":
          targetSection = "faqs"
          headerOffset = 80 // Standard header height
          break
        default:
          return
      }

      const sectionElement = document.querySelector(`[data-section="${targetSection}"]`) as HTMLElement
      if (sectionElement) {
        const elementTop = sectionElement.offsetTop
        window.scrollTo({
          top: elementTop - headerOffset,
          behavior: "smooth",
        })
      }
    }, 100)
  }

  // New unified options for the 4-button layout
  const unifiedOptions = [
    { key: 'usa-unified', label: '🇺🇸 UG/MBA/MS', icon: '🇺🇸' },
    { key: 'germany', label: '🇩🇪 Germany', icon: '🇩🇪' },
    { key: 'france', label: '🇫🇷 France', icon: '🇫🇷' },
    { key: 'rest-of-europe', label: '🇪🇺 Rest of Europe', icon: '🇪🇺' },
  ] as const;

  // Get plans from unified data structure
  let plans: Plan[] = unifiedPlansData[unifiedSelection]?.plans || []

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

  switch (unifiedSelection) {
    case 'usa-unified':
      // For USA unified, we can use any of the USA testimonials - let's use UG as default
      leapStats = leapStatsGermany // USA doesn't have separate stats, use default
      testimonials = testimonialsUSAUG
      faqs = faqsGermany // USA doesn't have separate FAQs, use default
      break
    case 'germany':
      leapStats = leapStatsGermany
      testimonials = testimonialsGermany
      faqs = faqsGermany
      break
    case 'france':
      leapStats = leapStatsFrance
      testimonials = testimonialsFrance
      faqs = faqsFrance
      break
    case 'rest-of-europe':
      leapStats = leapStatsRestOfEurope
      testimonials = testimonialsRestOfEurope
      faqs = faqsRestOfEurope
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white min-w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F4F3FF] to-white pt-10 md:pt-20 pb-8 md:pb-16 text-center flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 font-heading px-4">
          LEAP SCHOLAR{" "}
          <span className="bg-gradient-to-r from-[#5B5FE3] to-[#FF6B35] bg-clip-text text-transparent">PREMIUM</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 mb-6 md:mb-10 max-w-2xl mx-auto font-body px-4">
          The premium service which helps you land your dream College
        </p>
        
        {/* Unified Selector - 4 buttons */}
        <div className="flex justify-center mb-8" data-section="unified-selector">
          <div className="inline-flex gap-2 bg-transparent rounded-xl p-1 flex-wrap justify-center">
            {unifiedOptions.map((option, idx: number) => (
              <button
                key={option.key}
                ref={(el) => {
                  optionBtnRefs.current[idx] = el
                  return undefined
                }}
                className={`px-4 py-3 rounded-xl font-semibold text-sm sm:text-base focus:outline-none transition-colors duration-200
                  ${unifiedSelection === option.key ? "bg-[#443EFF] text-white" : "bg-gray-100 text-[#443EFF]"}
                `}
                onClick={() => {
                  dispatch(setUnifiedSelection(option.key as UnifiedSelection))
                  setTimeout(() => {
                    if (segmentedControlRef.current) {
                      const headerHeight = 80
                      const elementTop = segmentedControlRef.current.offsetTop
                      window.scrollTo({
                        top: elementTop - headerHeight,
                        behavior: "smooth",
                      })
                    }
                  }, 100)
                }}
                aria-pressed={unifiedSelection === option.key}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Segmented Control for main content */}
      <div className="py-8" ref={segmentedControlRef}>
        <SegmentedControl
          options={[
            { label: "Plans", value: "plans" },
            { label: "Testimonials", value: "testimonials" },
            { label: "FAQs", value: "faqs" },
          ]}
          value={mainSection}
          onChange={(val) => dispatch(setMainSection(val as MainSection))}
          onOptionClick={handleSegmentedControlClick}
        />
      </div>
      {/* Main Content Sections */}
      {mainSection === "plans" && (
        <>
          {/* Plan Selection */}
          <section
            className="py-12 md:py-20 bg-gradient-to-br from-gray-50/50 to-white"
            data-section="plans"
          >
            <div className="flex flex-col items-center">
              {/* Plans Grid */}
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
                style={{ maxWidth: numPlans === 4 ? "1200px" : numPlans === 3 ? "900px" : "600px" }}
              >
                {plans.map((plan, index) => (
                  <div
                    key={plan.tier + index}
                    className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/5 border border-white/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-3xl hover:shadow-primary/15 hover:scale-[1.02] group ${plan.tier === "LS Elite" ? "ring-4 ring-primary/20 bg-gradient-to-br from-white/95 to-primary/5" : "bg-white/95"}`}
                  >
                    {plan.tier === "LS Elite" && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full">
                        <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-full text-sm font-black shadow-xl whitespace-nowrap">
                          {getMostPopularTag(unifiedSelection)}
                        </span>
                      </div>
                    )}
                    <div className="p-6 md:p-8 flex flex-col items-center">
                      <div className="text-center mb-6 md:mb-8">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 md:mb-4 font-heading tracking-tight">
                          {plan.tier}
                        </h3>
                        <div className="flex flex-col items-center justify-center mb-2 md:mb-3">
                          <span className={`text-3xl md:text-5xl font-black tracking-tight ${plan.tier === "LS Elite" ? "text-primary" : "text-gray-900"}`}>
                            ₹{plan.priceRange[0].toLocaleString("en-IN")}
                          </span>
                          <span className="text-base md:text-lg text-gray-400 line-through mt-1 font-medium">
                            ₹{plan.priceRange[1].toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 w-full">
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.applications}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.counsellor}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.ielts}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.sopLorSupport}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.visaSupport}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">{plan.scholarshipSupport}</span>
                        </div>
                        <div className="flex items-start group/item">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" />
                          <span className="text-gray-700 font-medium leading-relaxed">
                            Accommodation Support: {plan.accommodationSupport ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-50/80 to-white/60 backdrop-blur-sm rounded-2xl p-5 mb-6 w-full border border-gray-100/50">
                        <h4 className="font-black text-primary mb-3 text-lg">
                          Credits Worth ₹{plan.creditTotal.toLocaleString("en-IN")}
                        </h4>
                        <ul className="space-y-2">
                          {Object.entries(plan.creditBreakdown).map(([key, value]) =>
                            value ? (
                              <li key={key} className="text-sm text-gray-600 font-medium flex items-center">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                                {key.replace(/([A-Z])/g, " $1")}: ₹{value.toLocaleString("en-IN")}
                              </li>
                            ) : null,
                          )}
                        </ul>
                      </div>
                      {/* Add-ons Modal Trigger */}
                      {plan.addOns && (
                        <div className="mb-6 w-full flex justify-end relative">
                          <button
                            type="button"
                            className="bg-white border border-primary text-primary px-5 py-2 rounded-xl font-semibold text-sm shadow hover:bg-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={() => setOpenAddOnsModal(index)}
                            aria-label="View Available Add-ons"
                          >
                            View Available Add-ons
                          </button>
                          {/* Contextual Popover Modal */}
                          {openAddOnsModal === index && (
                            <div
                              className="absolute right-0 top-full mt-2 z-40 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 animate-fadeIn"
                              style={{ minWidth: "260px" }}
                            >
                              {/* Arrow indicator */}
                              <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 shadow" />
                              <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
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
                      )}
                      <button
                        className={`w-full py-4 px-8 rounded-2xl font-black text-lg transition-all duration-300 mt-4 shadow-lg hover:shadow-xl active:scale-95 ${plan.tier === "LS Elite" ? "bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary shadow-primary/25" : "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-primary/10"}`}
                      >
                        Enrol Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 bg-[#3B5AFE]">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white font-heading px-4">
              What makes Leap Scholar different?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center px-4 max-w-7xl mx-auto">
              {leapStats.map((stat: { value: string; label: string }, index: number) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-60 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold mb-2 text-[#3B5AFE]">{stat.value}</div>
                  <div className="text-base sm:text-lg text-[#3B5AFE] font-medium opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
      {mainSection === "testimonials" && (
        <>
          {/* Testimonials - Auto-scrolling Carousel */}
          <section className="py-16 bg-white" data-section="testimonials">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-heading px-4">
              See why our students ❤ us
            </h2>
            <div className="relative">
              <AutoScrollTestimonials testimonials={testimonials} />
            </div>
          </section>
        </>
      )}

      {mainSection === "faqs" && (
        <>
          {/* FAQ Section - HGI iOS Glassmorphism Accordion */}
          <section className="py-16 bg-gradient-to-br from-[#F4F3FF] to-white/80" data-section="faqs">
            <div className="flex justify-center px-4 max-w-5xl mx-auto">
              <div className="max-w-3xl w-full">
              <h2 className="text-4xl font-extrabold text-center mb-14 text-gray-900 font-heading tracking-tight drop-shadow-sm">
                Got questions?{" "}
                <span className="bg-gradient-to-r from-[#443EFF] to-[#FF6B35] bg-clip-text text-transparent">
                  Find your answers here
                </span>
              </h2>
              <div className="space-y-7">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div
                      key={index}
                      className={`relative rounded-3xl border border-gray-100/60 bg-white/80 backdrop-blur-xl shadow-2xl shadow-primary/10 transition-all duration-400 overflow-hidden ${isOpen ? "ring-2 ring-primary/20" : ""}`}
                    >
                      <button
                        className={`w-full flex justify-between items-center px-7 py-6 text-left focus:outline-none transition-all duration-300 font-heading text-lg font-bold text-gray-900 hover:bg-primary/5 active:scale-[0.98]`}
                        onClick={() => dispatch(setOpenFaqIndex(isOpen ? null : index))}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${index}`}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        <span className="flex-1 text-left leading-snug">{faq.question}</span>
                        <span className="ml-4 flex items-center justify-center">
                          {isOpen ? (
                            <ChevronUp className="w-7 h-7 text-[#443EFF] transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="w-7 h-7 text-[#443EFF] transition-transform duration-300" />
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
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#443EFF] to-[#FF6B35] animate-fadeIn" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            </div>
          </section>
        </>
      )}

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="text-center px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 font-heading">
            Trusted and backed by marquee global investors
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {investors.map((inv, idx) => (
              <div key={idx} className="flex flex-col items-center w-36">
                <div className="w-32 h-16 flex items-center justify-center mb-2">
                  <Image
                    src={inv.img || "/placeholder.svg"}
                    alt={inv.name}
                    width={128}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-gray-500 font-semibold text-center leading-tight">{inv.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3B5AFE] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-heading">Ready to start your journey?</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 font-body">
            Join thousands of students who have successfully studied abroad with Leap Scholar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#3B5AFE] px-8 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200">
              Get Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#3B5AFE] focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200">
              View All Plans
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <GraduationCap className="w-8 h-8 text-primary mr-2" />
                <span className="text-2xl font-bold font-heading">LEAP SCHOLAR</span>
              </div>
              <p className="text-gray-400 font-body">Your trusted partner for studying abroad</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Destinations</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Germany
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    France
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    USA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rest of Europe
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Services</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IELTS Preparation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    SOP Writing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Visa Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Loan Assistance
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 font-heading">Support</h4>
              <ul className="space-y-2 text-gray-400 font-body">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 font-body">
            <p>&copy; 2025 Leap Scholar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

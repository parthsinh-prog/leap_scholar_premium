"use client"
import React, { useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface JourneyStep {
  title: string
  items: Array<{
    name: string
    description: string
  }>
}

const journeySteps: JourneyStep[] = [
  {
    title: "Profile Assessment & Goal Setting",
    items: [
      {
        name: "Academic Background Evaluation",
        description: "Comprehensive review of your educational credentials and academic performance"
      },
      {
        name: "Career Aspirations Analysis",
        description: "Understanding your professional goals and aligning them with study abroad opportunities"
      },
      {
        name: "Country & Program Selection",
        description: "Expert guidance on choosing the right destination and academic program"
      }
    ]
  },
  {
    title: "Test Preparation & Documentation",
    items: [
      {
        name: "IELTS/TOEFL Preparation",
        description: "Comprehensive language test prep with band assurance programs"
      },
      {
        name: "GMAT/GRE Coaching",
        description: "Standardized test preparation for graduate programs"
      },
      {
        name: "Document Compilation",
        description: "Gathering and organizing all required academic and personal documents"
      }
    ]
  },
  {
    title: "University Applications",
    items: [
      {
        name: "University Shortlisting",
        description: "Strategic selection of universities based on your profile and preferences"
      },
      {
        name: "Application Submission",
        description: "Complete application process management with expert review"
      },
      {
        name: "SOP & LOR Writing",
        description: "Professional Statement of Purpose and Letter of Recommendation assistance"
      }
    ]
  },
  {
    title: "Admission & Visa Processing",
    items: [
      {
        name: "Admission Decision Support",
        description: "Guidance on accepting offers and scholarship negotiations"
      },
      {
        name: "Visa Application",
        description: "End-to-end visa processing with interview preparation"
      },
      {
        name: "Financial Planning",
        description: "Education loan assistance and financial documentation support"
      }
    ]
  },
  {
    title: "Pre-Departure & Beyond",
    items: [
      {
        name: "Accommodation Arrangement",
        description: "On-campus and off-campus housing assistance and booking"
      },
      {
        name: "Travel & Insurance",
        description: "Flight booking assistance and comprehensive travel insurance"
      },
      {
        name: "Post-Arrival Support",
        description: "Ongoing support during your initial months abroad"
      }
    ]
  }
]

interface VerticalTimelineStepProps {
  step: JourneyStep
  index: number
  isVisible: boolean
  delay: number
  isLeft: boolean
}

const VerticalTimelineStep: React.FC<VerticalTimelineStepProps> = ({ 
  step, 
  index, 
  isVisible, 
  delay, 
  isLeft 
}) => {
  const stepNumber = index + 1
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className={`flex items-center ${isLeft ? 'justify-end' : 'justify-start'}`}>
          {/* Content Card */}
          <div 
            className={`w-5/12 transition-all duration-800 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 translate-x-0' 
                : `opacity-0 translate-y-8 ${isLeft ? 'translate-x-8' : '-translate-x-8'}`
            }`}
            style={{ transitionDelay: `${delay}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/50 transition-all duration-500 overflow-hidden ${
              isHovered ? 'shadow-2xl scale-105 border-[#6F5ACC]/20' : ''
            }`}>
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#6F5ACC]/5 to-[#A291FB]/5 rounded-3xl transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`} />
              
              {/* Step Number Badge - Positioned to avoid text overlap with HGI iOS spacing */}
              <div className={`absolute ${isLeft ? 'right-4 top-4' : 'left-4 top-4'} w-10 h-10 bg-gradient-to-br from-[#6F5ACC] to-[#A291FB] rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 z-10 ${
                isHovered ? 'scale-110 shadow-xl' : ''
              }`}>
                {stepNumber}
              </div>
              
              {/* Content */}
              <div className={`relative z-10 ${isLeft ? 'pr-16' : 'pl-16'}`}>
                <h3 className={`text-xl md:text-2xl font-bold mb-4 transition-all duration-300 ${
                  isHovered ? 'text-[#6F5ACC] transform scale-105' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                
                <div className="space-y-4">
                  {step.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex}
                      className={`transition-all duration-400 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      } ${isHovered ? 'transform translate-x-1' : ''}`}
                      style={{ transitionDelay: `${delay + 200 + itemIndex * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-300 ${
                          isHovered ? 'bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] scale-125' : 'bg-gray-400'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{item.name}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shine Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
                isHovered ? 'translate-x-full' : '-translate-x-full'
              }`} />
            </div>
          </div>
        </div>

        {/* Center Circle */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6">
          <div 
            className={`w-16 h-16 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            } ${isHovered ? 'shadow-xl scale-110 border-[#6F5ACC]/30' : ''}`}
            style={{ transitionDelay: `${delay + 100}ms` }}
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-300 ${
                isVisible ? 'bg-gradient-to-br from-[#6F5ACC] to-[#A291FB]' : 'bg-gray-300'
              } ${isHovered ? 'scale-110' : ''}`}
            >
              {stepNumber}
            </div>
          </div>
          
          {/* Pulsing rings */}
          {isVisible && (
            <>
              <div 
                className="absolute inset-0 w-16 h-16 rounded-full bg-[#6F5ACC]/20 animate-pulse-ring"
                style={{ 
                  animationDelay: `${delay + 400}ms`,
                  animationDuration: '2s'
                }}
              />
              <div 
                className="absolute inset-0 w-16 h-16 rounded-full bg-[#FF6B35]/15 animate-pulse-ring"
                style={{ 
                  animationDelay: `${delay + 800}ms`,
                  animationDuration: '2.5s'
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex items-start space-x-4">
          {/* Step Circle */}
          <div 
            className={`flex-shrink-0 w-12 h-12 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center shadow-lg transition-all duration-600 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            } ${isHovered ? 'shadow-xl scale-110' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-xs transition-all duration-300 ${
              isVisible ? 'bg-gradient-to-br from-[#6F5ACC] to-[#A291FB]' : 'bg-gray-300'
            }`}>
              {stepNumber}
            </div>
          </div>
          
          {/* Content */}
          <div 
            className={`flex-1 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 transition-all duration-600 relative overflow-hidden ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            } ${isHovered ? 'shadow-2xl scale-105 border-[#6F5ACC]/20' : ''}`}
            style={{ transitionDelay: `${delay + 100}ms` }}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-[#6F5ACC]/5 to-[#A291FB]/5 rounded-3xl transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
            
            <div className="relative z-10">
              <h3 className={`text-lg font-bold mb-4 transition-all duration-300 ${
                isHovered ? 'text-[#6F5ACC]' : 'text-gray-900'
              }`}>
                {step.title}
              </h3>
              
              <div className="space-y-3">
                {step.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className={`transition-all duration-400 ${
                      isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay + 200 + itemIndex * 100}ms` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 transition-all duration-300 ${
                        isHovered ? 'bg-gradient-to-r from-[#6F5ACC] to-[#A291FB] scale-125' : 'bg-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const JourneyTimeline: React.FC = () => {
  const { ref, isInView } = useIntersectionObserver({ 
    threshold: 0.1,
    triggerOnce: false // Enable bidirectional animations
  })

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Enhanced Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/20 via-transparent to-orange-50/20" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#6F5ACC]/5 to-[#A291FB]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-[#A291FB]/5 to-[#6F5ACC]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-6 transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-[#6F5ACC] via-purple-600 to-[#A291FB] bg-clip-text text-transparent">
              Study Abroad Journey
            </span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${
            isInView 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            Your comprehensive roadmap to studying abroad, from initial planning to graduation
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Connecting Line - Desktop Only */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gray-200 via-[#6F5ACC]/30 to-[#A291FB]/30 rounded-full" style={{ height: `${journeySteps.length * 400}px` }}>
            <div
              className={`w-full bg-gradient-to-b from-[#6F5ACC] to-[#A291FB] rounded-full transition-all duration-2000 ease-out ${
                isInView ? 'h-full opacity-100' : 'h-0 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12 md:space-y-24">
            {journeySteps.map((step, index) => {
              const delay = index * 200
              const isLeft = index % 2 === 0
              
              return (
                <VerticalTimelineStep
                  key={index}
                  step={step}
                  index={index}
                  isVisible={isInView}
                  delay={delay}
                  isLeft={isLeft}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JourneyTimeline

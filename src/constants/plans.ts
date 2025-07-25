export type Region = 'europe' | 'usa';

export type EuropeCountry = 'germany' | 'france' | 'rest-of-europe';
export type USProgram = 'ug' | 'mba' | 'ms';

export type PlanTier = 'LS Plus' | 'LS Premium' | 'LS Elite' | 'LS Platinum';

export interface CreditBreakdown {
  loanProcessing?: number;
  universityDeposit?: number;
  accommodation?: number;
  ielts?: number;
  aps?: number;
  flight?: number;
}

export interface Plan {
  tier: PlanTier;
  priceRange: [number, number]; // [INR discounted, INR actual]
  applications: string;
  counsellor: string;
  ielts: string;
  sopLorSupport: string;
  visaSupport: string;
  scholarshipSupport: string;
  accommodationSupport: boolean;
  creditTotal: number;
  creditBreakdown: CreditBreakdown;
  addOns?: string[];
}

export interface CountryOrProgram {
  name: string;
  plans: Plan[];
}

export const plansData: {
  europe: Record<EuropeCountry, CountryOrProgram>;
  usa: Record<USProgram, CountryOrProgram>;
} = {
  europe: {
    germany: {
      name: 'Germany',
      plans: [
        {
          tier: 'LS Plus',
          priceRange: [4999, 20000],
          applications: 'Unlimited applications for Private Institutes',
          counsellor: 'Europe Expert Counsellor',
          ielts: 'Self-prep IELTS course with mock tests',
          sopLorSupport: 'Dedicated expert SOP, LOR writer',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan assistance',
          accommodationSupport: true,
          creditTotal: 5000,
          creditBreakdown: {
            loanProcessing: 2000,
            universityDeposit: 3000,
          },
        },
        {
          tier: 'LS Premium',
          priceRange: [49999, 75000],
          applications: 'Upto 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 15000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
          addOns: ['3 additional Applications for ₹25,000'],
        },
        {
          tier: 'LS Elite',
          priceRange: [119999, 150000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 30000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 10000,
            accommodation: 10000,
          },
          addOns: ['A1-A2 German Language Prep Enrollment for  ₹40,000'],
        },
        {
          tier: 'LS Platinum',
          priceRange: [279999, 350000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'A1-A2 German Language Prep',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 135000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 10000,
            accommodation: 10000,
            ielts: 17000,
            aps: 18000,
            flight: 30000,
          },
          addOns: [
            'A1-A2 German Language Prep Enrollment for  ₹40,000',
            '₹18,000 on APS',
            '₹40,000 on A1-A2 German Language Prep Enrollment',
            '₹30,000 on One-way Flight Ticket to Germany',
          ],
        },
      ],
    },
    france: {
      name: 'France',
      plans: [
        {
          tier: 'LS Plus',
          priceRange: [4999, 20000],
          applications: 'Unlimited applications for Private Institutes',
          counsellor: 'Europe Expert Counsellor',
          ielts: 'Self-prep IELTS course with mock tests',
          sopLorSupport: 'Dedicated expert SOP, LOR writer',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan assistance',
          accommodationSupport: true,
          creditTotal: 5000,
          creditBreakdown: {
            loanProcessing: 2000,
            universityDeposit: 3000,
          },
        },
        {
          tier: 'LS Premium',
          priceRange: [49999, 75000],
          applications: 'Upto 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 15000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
          addOns: ['3 additional Applications for ₹25,000'],
        },
        {
          tier: 'LS Elite',
          priceRange: [119999, 150000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 30000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 10000,
            accommodation: 10000,
          },
        },
      ],
    },
    'rest-of-europe': {
      name: 'Rest of Europe',
      plans: [
        {
          tier: 'LS Plus',
          priceRange: [4999, 20000],
          applications: 'Unlimited applications for Private Institutes',
          counsellor: 'Europe Expert Counsellor',
          ielts: 'Self-prep IELTS course with mock tests',
          sopLorSupport: 'Dedicated expert SOP, LOR writer',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan assistance',
          accommodationSupport: true,
          creditTotal: 5000,
          creditBreakdown: {
            loanProcessing: 2000,
            universityDeposit: 3000,
          },
        },
        {
          tier: 'LS Premium',
          priceRange: [34999, 50000],
          applications: 'Up to 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 15000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
        },
        {
          tier: 'LS Elite',
          priceRange: [99999, 125000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 30000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 10000,
            accommodation: 10000,
          },
        },
      ],
    },
  },
  usa: {
    ug: {
      name: 'USA (UG)',
      plans: [
        {
          tier: 'LS Premium',
          priceRange: [34999, 50000],
          applications: 'Upto 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium Essay SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 10000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
          },
          addOns: ['3 additional Applications for ₹22,500'],
        },
        {
          tier: 'LS Elite',
          priceRange: [74999, 100000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium Essay SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 20000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
        },
      ],
    },
    mba: {
      name: 'USA (MBA)',
      plans: [
        {
          tier: 'LS Premium',
          priceRange: [34999, 50000],
          applications: 'Up to 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 10000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
          },
        },
        {
          tier: 'LS Elite',
          priceRange: [74999, 100000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 20000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
        },
      ],
    },
    ms: {
      name: 'USA (MS)',
      plans: [
        {
          tier: 'LS Premium',
          priceRange: [29999, 45000],
          applications: 'Upto 3 Applications',
          counsellor: 'Dedicated Senior Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 10000,
          creditBreakdown: {
            loanProcessing: 5000,
            universityDeposit: 5000,
          },
          addOns: ['3 additional Applications for ₹15,000'],
        },
        {
          tier: 'LS Elite',
          priceRange: [49999, 65000],
          applications: 'Unlimited Applications',
          counsellor: 'Dedicated Lead Counsellor',
          ielts: 'IELTS Prep with Band Assurance',
          sopLorSupport: 'Dedicated Premium SOP, LOR editor',
          visaSupport: 'End-to-End  APS and Visa Guidance',
          scholarshipSupport: 'Scholarship and Loan Support',
          accommodationSupport: true,
          creditTotal: 20000,
          creditBreakdown: {
            loanProcessing: 10000,
            universityDeposit: 5000,
            accommodation: 5000,
          },
        },
      ],
    },
  },
};

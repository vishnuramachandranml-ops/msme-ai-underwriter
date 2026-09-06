import {
  Briefcase,
  IndianRupee,
  Cog,
  Database,
  ShieldCheck,
  Landmark,
  Banknote,
} from "lucide-react";

export const assessmentSteps = [
  {
    id: 1,
    title: "Business Profile",
    description: "Basic business information",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Cashflow",
    description: "Revenue & expenses",
    icon: IndianRupee,
  },
  {
    id: 3,
    title: "Operations",
    description: "Orders & operations",
    icon: Cog,
  },
  {
    id: 4,
    title: "Alternate Data",
    description: "GST, UPI & utility",
    icon: Database,
  },
  {
    id: 5,
    title: "Compliance",
    description: "Regulatory information",
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: "Financial Position",
    description: "Assets & liabilities",
    icon: Landmark,
  },
  {
    id: 7,
    title: "Loan Request",
    description: "Loan details",
    icon: Banknote,
  },
];
import {
  CalendarDays,
  Factory,
  Landmark,
  MapPin,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import AppCard from "@/components/shared/AppCard";
import type { BusinessProfile } from "@/types/assessmentResponse";

import DownloadReportButton from "./DownloadReportButton";
import BusinessMeta from "./BusinessMeta";

interface BusinessHeaderProps {
  businessProfile: BusinessProfile;
}


const BusinessHeader = ({
  businessProfile,
}: BusinessHeaderProps) => {

  const metadata = [
    {
      icon: Factory,
      label: "Industry",
      value: businessProfile.industry ?? "Not available",
    },
    {
      icon: CalendarDays,
      label: "Business Vintage",
      value: `${businessProfile.business_age_years} Years`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: businessProfile.location,
    },
    {
      icon: Users,
      label: "Employees",
      value: businessProfile.employee_count,
    },
    {
      icon: Landmark,
      label: "Constitution",
      value: businessProfile.business_type,
    },
  ];


  return (
    <AppCard className="p-6">
      <div className="space-y-6">

        {/* Top Row */}

        <div className="flex items-start justify-between">

          <div className="space-y-3">

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {businessProfile.business_name}
            </h1>

            <div className="flex flex-wrap gap-3">

              <Badge
                className="
                  rounded-lg
                  bg-green-100
                  px-3
                  py-1
                  text-green-700
                  hover:bg-green-100
                "
              >
                BUSINESS ID: {businessProfile.business_id}
              </Badge>

              {businessProfile.gstin && (
                <Badge
                  className="
                    rounded-lg
                    bg-blue-100
                    px-3
                    py-1
                    text-blue-700
                    hover:bg-blue-100
                  "
                >
                  GSTIN: {businessProfile.gstin}
                </Badge>
              )}

              {businessProfile.cin && (
                <Badge
                  className="
                    rounded-lg
                    bg-blue-100
                    px-3
                    py-1
                    text-blue-700
                    hover:bg-blue-100
                  "
                >
                  CIN: {businessProfile.cin}
                </Badge>
              )}

            </div>

          </div>

          <DownloadReportButton />

        </div>

        {/* Metadata */}

        <div className="grid grid-cols-5 gap-x-8">

          {metadata.map((item) => (
            <BusinessMeta
              key={item.label}
              icon={<item.icon className="h-5 w-5" />}
              label={item.label}
              value={item.value}
            />
          ))}

        </div>

      </div>
    </AppCard>
  );
};

export default BusinessHeader;

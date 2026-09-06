import {
  Building2,
  FileText,
  Fuel,
  Landmark,
  Receipt,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AppCard from "@/components/shared/AppCard";
import type { AlternateDataCard } from "@/types/assessmentResponse";

interface AlternateDataCardsProps {
  cards: AlternateDataCard[];
}

interface SourceDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
}

const sources: SourceDefinition[] = [
  { id: "gst", label: "GST", icon: FileText },
  { id: "bank", label: "Bank", icon: Landmark },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "epfo", label: "EPFO", icon: Building2 },
  { id: "electricity", label: "Electricity", icon: Zap },
  { id: "fuel", label: "Fuel", icon: Fuel },
  { id: "purchase", label: "Purchase", icon: ShoppingCart },
  { id: "sales", label: "Sales", icon: Receipt },
];

const normalizeName = (name: string) => name.toLowerCase().replace(/\s+/g, "");

const matchesSource = (sourceId: string, cardName: string) => {
  const normalizedCardName = normalizeName(cardName);

  return normalizedCardName === sourceId || normalizedCardName.includes(sourceId);
};

const AlternateDataCards = ({ cards }: AlternateDataCardsProps) => {
  return (
    <AppCard className="mt-4 p-4">
      <h2
        className="mb-4 text-base font-bold text-slate-800"
        style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
      >
        Alternate Data
      </h2>

      <div className="grid grid-cols-4 gap-3">
        {sources.map((source) => {
          const card = cards.find((item) => matchesSource(source.id, item.name));
          const Icon = source.icon;
          const detail = card?.metric
            ? `${card.metric}: ${card.value ?? "Not available"}`
            : "No alternate-data detail available";

          return (
            <div
              key={source.id}
              title={detail}
              className="rounded-lg border border-slate-150 bg-slate-100 p-2.5"
            >
              <div className="mb-2 flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">
                  {source.label}
                </span>
              </div>

              <p className="mb-1 text-base font-bold text-slate-900">
                {card ? `${card.score}%` : "—"}
              </p>

              <p className="text-[11px] font-semibold text-slate-500">
                {card?.status ?? "Not available"}
              </p>
            </div>
          );
        })}
      </div>
    </AppCard>
  );
};

export default AlternateDataCards;

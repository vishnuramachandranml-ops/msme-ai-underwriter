export const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "low risk":
      return "#16A34A";

    case "medium risk":
      return "#F59E0B";

    case "high risk":
      return "#DC2626";

    default:
      return "#2563EB";
  }
};
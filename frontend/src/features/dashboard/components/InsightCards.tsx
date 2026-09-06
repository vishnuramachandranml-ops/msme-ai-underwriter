// const InsightCards = () => {
//   return (
//     <div className="grid grid-cols-3 gap-4">

//       {/* Strengths */}
//       <div className="rounded-xl border border-green-100 bg-green-50 p-4">
//         <h4 className="mb-3 text-sm font-semibold text-green-700">
//           Strengths
//         </h4>

//         <ul className="space-y-2">
//           {copilot.strengths.map((item) => (
//             <li
//               key={item}
//               className="text-xs text-slate-700"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Watchlist */}
//       <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
//         <h4 className="mb-3 text-sm font-semibold text-amber-700">
//           Watchlist
//         </h4>

//         <ul className="space-y-2">
//           {copilot.watchlist.map((item) => (
//             <li
//               key={item}
//               className="text-xs text-slate-700"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* AI Suggestion */}
//       <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
//         <h4 className="mb-3 text-sm font-semibold text-blue-700">
//           AI Suggestion
//         </h4>

//         <ul className="space-y-2">
//           {copilot.aiSuggestion.map((item) => (
//             <li
//               key={item}
//               className="text-xs text-slate-700"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>

//     </div>
//   );
// };

// export default InsightCards;

interface InsightCardsProps {
  positiveSignals?: string[];
  monitoringPoints?: string[];
  creditOpinion?: string;
}

const InsightCards = ({
  positiveSignals,
  monitoringPoints,
  creditOpinion,
}: InsightCardsProps) => {

  const renderList = (
    items: string[] | undefined,
    emptyMessage: string
  ) => {

    if (!items?.length) {
      return (
        <p className="text-xs text-slate-500">
          {emptyMessage}
        </p>
      );
    }

    const visibleItems = items.slice(0, 4);

    return (
      <>
        <ul className="space-y-2">
          {visibleItems.map((item) => (
            <li
              key={item}
              className="text-xs text-slate-700"
            >
              • {item}
            </li>
          ))}
        </ul>

        {items.length > 4 && (
          <p className="mt-3 text-xs font-medium text-blue-600">
            + {items.length - 4} more...
          </p>
        )}
      </>
    );
  };
  return (

    <div className="grid grid-cols-3 gap-4">

      {/* Strengths */}

      <div className="rounded-xl border border-green-100 bg-green-50 p-4">

        <h4 className="mb-3 text-sm font-semibold text-green-700">
          Strengths
        </h4>

        {renderList(
          positiveSignals,
          "No strengths identified."
        )}

      </div>

      {/* Monitoring */}

      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

        <h4 className="mb-3 text-sm font-semibold text-amber-700">
          Monitoring Points
        </h4>

        {renderList(
          monitoringPoints,
          "No monitoring points available."
        )}

      </div>

      {/* Credit Opinion */}

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

        <h4 className="mb-3 text-sm font-semibold text-blue-700">
          Credit Opinion
        </h4>

        <p className="text-xs text-slate-700 leading-5">

          {creditOpinion?.trim()
            ? creditOpinion
            : "Credit opinion is not available."}

        </p>

      </div>

    </div>

  );

};

export default InsightCards;

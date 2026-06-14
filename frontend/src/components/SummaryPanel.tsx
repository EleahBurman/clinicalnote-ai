import type { SummaryResponse } from "../api";
import SummaryCard from "./SummaryCard";

// Notice we're importing the SummaryResponse interface we defined in api.ts
// This is TypeScript's module system at work — types are shareable across files

interface SummaryPanelProps {
  result: SummaryResponse;
}

export default function SummaryPanel({ result }: SummaryPanelProps) {
  const { summary } = result;

  const riskColor = summary.risk_assessment?.toLowerCase().includes("no acute")
    ? "bg-green-50 text-green-800"
    : "bg-red-50 text-red-800";

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Clinical Summary</h2>
        {summary.session_date && (
          <span className="text-sm text-gray-400">
            {summary.session_date}
          </span>
        )}
      </div>

      {summary.therapist_name && (
        <p className="text-sm text-gray-500">
          Clinician: <span className="font-medium text-gray-700">{summary.therapist_name}</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-3">
        <SummaryCard label="Patient Presentation" value={summary.patient_presentation} />
        <SummaryCard label="Mood & Affect" value={summary.mood_and_affect} />
        <SummaryCard label="Key Themes" value={summary.key_themes} />
        <SummaryCard label="Diagnosis Considerations" value={summary.diagnosis_considerations} />
        <SummaryCard label="Treatment Plan" value={summary.treatment_plan} />
        <SummaryCard label="Follow-up Items" value={summary.follow_up_items} />
      </div>

      <div className={`rounded-xl p-4 ${riskColor}`}>
        <p className="text-xs font-medium uppercase tracking-wide mb-1 opacity-60">
          Risk Assessment
        </p>
        <p className="text-sm font-medium">{summary.risk_assessment}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
          Notes Excerpt
        </p>
        <p className="text-sm text-gray-500 italic">{result.raw_notes_excerpt}</p>
      </div>
    </div>
  );
}
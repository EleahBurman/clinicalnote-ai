import { useState } from "react";

// Props interface — this component receives one function as a prop
// The function takes a string and two optional strings, returns nothing (void)
interface NoteFormProps {
  onSubmit: (notes: string, therapistName?: string, sessionDate?: string) => void;
  loading: boolean;
}

export default function NoteForm({ onSubmit, loading }: NoteFormProps) {
  const [notes, setNotes] = useState<string>("");
  const [therapistName, setTherapistName] = useState<string>("");
  const [sessionDate, setSessionDate] = useState<string>("");

  // useState<string>("") is TypeScript useState — we're telling it
  // this state will always be a string, never a number or boolean

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notes.trim()) {
      onSubmit(notes, therapistName || undefined, sessionDate || undefined);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Therapist Name (optional)
          </label>
          <input
            type="text"
            value={therapistName}
            onChange={(e) => setTherapistName(e.target.value)}
            placeholder="Dr. Jane Smith"
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Session Date (optional)
          </label>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            Raw Session Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste your raw session notes here... e.g. 'Patient arrived on time, reported increased anxiety this week related to work stress. Discussed CBT techniques...'"
            className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Generating Summary..." : "Generate Clinical Summary"}
        </button>
      </form>
    </div>
  );
}
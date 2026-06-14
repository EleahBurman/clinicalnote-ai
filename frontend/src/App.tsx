import { useState } from "react";
import NoteForm from "./components/NoteForm";
import SummaryPanel from "./components/SummaryPanel";
import { analyzeNotes } from "./api";
import type { SummaryResponse } from "./api";

export default function App() {
  const [result, setResult] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    notes: string,
    therapistName?: string,
    sessionDate?: string
  ) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeNotes(notes, therapistName, sessionDate);
      setResult(data);
    } catch {
      setError("Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-600">ClinicalNote AI</h1>
          <p className="mt-2 text-gray-500 text-sm">
            AI-powered clinical session note summarization for therapists
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-160px)]">
          {/* Left column — sticky */}
          <div className="space-y-4 lg:overflow-y-auto">
            <NoteForm onSubmit={handleSubmit} loading={loading} />
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Right column — scrollable */}
          <div className="lg:overflow-y-auto lg:pr-2">
            {result ? (
              <SummaryPanel result={result} />
            ) : (
              <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-400">
                <p className="text-4xl mb-3">🩺</p>
                <p className="text-sm">Your clinical summary will appear here after you submit session notes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
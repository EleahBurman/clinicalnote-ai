import { useState } from "react";
import NoteForm from "./components/NoteForm";
import SummaryPanel from "./components/SummaryPanel";
import { analyzeNotes } from "./api";
import type { SummaryResponse } from "./api";

export default function App() {
  // useState<SummaryResponse | null> means this state is either
  // a SummaryResponse object or null — TypeScript knows both are valid
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-600">ClinicalNote AI</h1>
          <p className="mt-2 text-gray-500 text-sm">
            AI-powered clinical session note summarization for therapists
          </p>
        </div>

        <NoteForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
            {error}
          </div>
        )}

        {result && <SummaryPanel result={result} />}
      </div>
    </div>
  );
}
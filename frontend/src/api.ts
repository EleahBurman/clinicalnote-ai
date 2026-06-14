// These interfaces define the exact shape of data we expect from the backend.
// TypeScript will catch it immediately if we try to access a field that doesn't exist.

export interface ClinicalSummary {
  patient_presentation: string | null;
  mood_and_affect: string | null;
  key_themes: string[] | null;
  diagnosis_considerations: string[] | null;
  treatment_plan: string | null;
  follow_up_items: string[] | null;
  risk_assessment: string | null;
  session_date: string | null;
  therapist_name: string | null;
}

export interface SummaryResponse {
  summary: ClinicalSummary;
  raw_notes_excerpt: string;
}

// string[] means "array of strings" in TypeScript
// string | null means "either a string or null" — same as Optional[str] in Python

export async function analyzeNotes(
  rawNotes: string,
  therapistName?: string,  // the ? means this parameter is optional
  sessionDate?: string
): Promise<SummaryResponse> {
  const response = await fetch('http://127.0.0.1:8000/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw_notes: rawNotes,
      therapist_name: therapistName || null,
      session_date: sessionDate || null,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze notes');
  }

  return response.json() as Promise<SummaryResponse>;
}
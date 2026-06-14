import os
import anthropic
import json
from dotenv import load_dotenv
from models import ClinicalSummary

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def generate_clinical_summary(raw_notes: str) -> ClinicalSummary:
    prompt = f"""You are an experienced clinical supervisor reviewing a therapist's raw session notes. 
Extract and structure the following information from these notes.

Return ONLY a JSON object with these exact fields:
- patient_presentation: string describing how the patient presented in the session
- mood_and_affect: string describing the patient's mood and emotional state
- key_themes: array of strings listing the main themes discussed (2-5 themes)
- diagnosis_considerations: array of strings listing any relevant diagnostic considerations or existing diagnoses mentioned
- treatment_plan: string summarizing the current treatment approach and interventions used
- follow_up_items: array of strings listing action items or topics to address next session
- risk_assessment: string noting any safety concerns, or "No acute risk factors identified" if none present
- session_date: string in YYYY-MM-DD format if mentioned, otherwise null
- therapist_name: string if mentioned, otherwise null

Raw session notes:
{raw_notes}

Return only the JSON object, no explanation, no markdown backticks."""

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text
    data = json.loads(raw)
    return ClinicalSummary(**data)
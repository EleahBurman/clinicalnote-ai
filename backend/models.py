from pydantic import BaseModel
from typing import Optional, List

class SessionNote(BaseModel):
    raw_notes: str
    therapist_name: Optional[str] = None
    session_date: Optional[str] = None

class ClinicalSummary(BaseModel):
    patient_presentation: Optional[str] = None
    mood_and_affect: Optional[str] = None
    key_themes: Optional[List[str]] = None
    diagnosis_considerations: Optional[List[str]] = None
    treatment_plan: Optional[str] = None
    follow_up_items: Optional[List[str]] = None
    risk_assessment: Optional[str] = None
    session_date: Optional[str] = None
    therapist_name: Optional[str] = None

class SummaryResponse(BaseModel):
    summary: ClinicalSummary
    raw_notes_excerpt: str
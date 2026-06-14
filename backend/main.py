from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import SessionNote, SummaryResponse
from extractor import generate_clinical_summary

app = FastAPI(title="ClinicalNote AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://clinicalnote-ai.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ClinicalNote AI API is running"}

@app.post("/summarize", response_model=SummaryResponse)
async def summarize_notes(session: SessionNote):
    summary = generate_clinical_summary(session.raw_notes)
    
    # Pass through therapist name and date if provided
    if session.therapist_name:
        summary.therapist_name = session.therapist_name
    if session.session_date:
        summary.session_date = session.session_date

    return SummaryResponse(
        summary=summary,
        raw_notes_excerpt=session.raw_notes[:200] + "..." if len(session.raw_notes) > 200 else session.raw_notes
    )
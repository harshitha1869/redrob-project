from src.resume_parser import parse_resume
from src.llm import generate_resume_feedback
from src.scoring import (
    technical_score,
    career_score,
    behavioral_score,
)
from src.embedding_engine import similarity_score
from src.jd_analyzer import analyze_jd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from src.jd_analyzer import analyze_jd
from src.embedding_engine import similarity_score

app = FastAPI(title="TalentMind AI API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Model
class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str

# Health Check
@app.get("/")
def home():
    return {
        "message": "TalentMind AI Backend Running 🚀"
    }

# Analyze API
@app.post("/analyze")
def analyze(request: AnalyzeRequest):

    candidate = parse_resume(request.resume)

    from src.jd_text_parser import analyze_jd_text

    requirements = analyze_jd_text(request.job_description)

    semantic = float(
        similarity_score(
            request.resume,
            request.job_description,
        )
    )

    tech = technical_score(candidate, requirements)

    career = career_score(candidate, requirements)

    behavior = behavioral_score(candidate)

    ats = round(
        (
            semantic * 100 +
            tech +
            career +
            behavior
        ) / 4
    )

    required = requirements.get("required_skills", [])

    matched = []

    for skill in required:
        if skill.lower() in request.resume.lower():
            matched.append(skill)

    missing = [
        s
        for s in required
        if s not in matched
    ]
    feedback = generate_resume_feedback(
    request.resume,
    request.job_description,
)

    return {
        "ats_score": int(ats),
        "semantic_match": float(round(semantic * 100, 2)),
        "technical_score": int(tech),
        "career_score": int(career),
        "behavioral_score": int(behavior),
        "required_skills": required,
        "matched_skills": matched,
        "missing_skills": missing,
        "recommendation":
            "Strong Hire"
            if ats >= 80
            else "Consider",
        "ai_feedback": feedback,
    }
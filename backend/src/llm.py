import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_resume_feedback(resume, job_description):

    prompt = f"""
You are an expert ATS recruiter.

Resume:
{resume}

Job Description:
{job_description}

Analyze the resume and provide:

1. Resume Strengths
2. Missing Skills
3. Resume Weaknesses
4. Resume Improvement Suggestions
5. Final Hiring Recommendation

Keep the response professional and concise.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text
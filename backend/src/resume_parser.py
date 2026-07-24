import re

SKILLS = [
    "Python",
    "Java",
    "C++",
    "React",
    "Next.js",
    "FastAPI",
    "Flask",
    "Docker",
    "AWS",
    "Azure",
    "Kubernetes",
    "Machine Learning",
    "Deep Learning",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Git",
]

def parse_resume(text: str):

    lower = text.lower()

    skills = []

    for skill in SKILLS:
        if skill.lower() in lower:
            skills.append({
                "name": skill
            })

    years = 0

    match = re.search(r"(\d+)\+?\s+years", lower)

    if match:
        years = int(match.group(1))

    return {
        "profile": {
            "summary": text,
            "years_of_experience": years,
            "current_title": "Software Engineer"
        },
        "skills": skills,
        "career_history": [],
        "redrob_signals": {
            "open_to_work_flag": True,
            "recruiter_response_rate": 0.9,
            "interview_completion_rate": 0.9,
            "github_activity_score": 80
        }
    }
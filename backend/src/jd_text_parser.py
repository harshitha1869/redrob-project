import re

KNOWN_SKILLS = [
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

def analyze_jd_text(text):

    found = []

    lower = text.lower()

    for skill in KNOWN_SKILLS:
        if skill.lower() in lower:
            found.append(skill)

    years = 0

    match = re.search(r"(\d+)\+?\s*years", lower)

    if match:
        years = int(match.group(1))

    return {
        "required_skills": found,
        "minimum_years": years,
    }
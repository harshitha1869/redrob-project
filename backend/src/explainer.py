from src.scoring import (
    technical_score,
    career_score,
    behavioral_score
)

def explain_candidate(candidate, requirements):

    reasons = []

    title = candidate["profile"]["current_title"]
    experience = candidate["profile"]["years_of_experience"]

    
    if requirements["min_exp"] <= experience <= requirements["max_exp"]:
        reasons.append(
            f"Matches required experience range ({experience} years)"
        )

    
    if "ai engineer" in title.lower():
        reasons.append(
            "Strong AI engineering background"
        )


    skills = [
        skill["name"].lower()
        for skill in candidate["skills"]
    ]

    important_skills = []

    for skill in requirements["required_skills"]:
        for candidate_skill in skills:
            if skill in candidate_skill:
                important_skills.append(skill)

    if important_skills:
        reasons.append(
            "Relevant skills: " +
            ", ".join(set(important_skills))
        )

    text = candidate["profile"]["summary"].lower()

    for job in candidate["career_history"]:
        text += " " + job["description"].lower()

    if "retrieval" in text:
        reasons.append(
            "Built retrieval systems matching role requirements"
        )

    if "ranking" in text:
        reasons.append(
            "Worked on ranking pipelines and search relevance"
        )

    if "recommendation" in text:
        reasons.append(
            "Experience building recommendation systems"
        )

    if "production" in text:
        reasons.append(
            "Delivered production-scale AI systems"
        )

    if "evaluation" in text:
        reasons.append(
            "Worked on model evaluation and performance optimization"
        )

    if "behavioral" in text:
        reasons.append(
            "Integrated behavioral signals into AI workflows"
        )

    # Limit explanation size
    reasons = reasons[:5]

    return {
        "candidate_id": candidate["candidate_id"],

        "technical_score":
            technical_score(candidate, requirements),

        "career_score":
            career_score(candidate, requirements),

        "behavioral_score":
            behavioral_score(candidate),

        "reasons": reasons
    }
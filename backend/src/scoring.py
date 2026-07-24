TECHNICAL_KEYWORDS = {
    "python",
    "machine learning",
    "deep learning",
    "nlp",
    "llm",
    "rag",
    "retrieval",
    "search",
    "ranking",
    "recommendation",
    "embeddings",
    "vector database",
    "faiss",
    "pinecone",
    "milvus",
    "qdrant",
    "weaviate",
    "tensorflow",
    "pytorch",
    "transformers",
    "langchain",
    "huggingface"
}
def technical_score(candidate, requirements):

    score = 0

    required_skills = requirements.get("required_skills", [])

    candidate_skills = []

    for skill in candidate.get("skills", []):

        if isinstance(skill, dict):
            candidate_skills.append(skill.get("name", "").lower())

        elif isinstance(skill, str):
            candidate_skills.append(skill.lower())

    for required_skill in required_skills:

        required_skill = required_skill.lower()

        for candidate_skill in candidate_skills:

            if required_skill in candidate_skill:
                score += 8

    title = candidate["profile"]["current_title"].lower()

    good_titles = [
        "ai engineer",
        "ml engineer",
        "machine learning engineer",
        "data scientist",
        "search engineer",
        "backend engineer",
        "software engineer",
    ]

    for role in good_titles:
        if role in title:
            score += 20
            break

    return min(score, 100)

def behavioral_score(candidate):
    signals = candidate.get("redrob_signals", {})

    score = 0

    
    if signals.get("open_to_work_flag", False):
        score += 25

    score += signals.get("recruiter_response_rate", 0) * 25

    score += signals.get("interview_completion_rate", 0) * 25

    github_score = signals.get("github_activity_score", 0)

    if github_score > 0:
        score += min(github_score / 4, 25)

    return round(min(score, 100), 2)

def career_score(candidate,requirements):
    score = 0

    years = candidate.get("profile", {}).get(
    "years_of_experience",
    0
)

  
    if 5 <= years <= 9:
        score += 60
    elif 3 <= years < 5:
        score += 40
    elif 9 < years <= 12:
        score += 35
    else:
        score += 15

    title = candidate["profile"]["current_title"].lower()

    senior_titles = [
        "ai engineer",
        "ml engineer",
        "machine learning engineer",
        "data scientist",
        "search engineer",
        "backend engineer",
        "software engineer"
    ]

    for role in senior_titles:
        if role in title:
            score += 40
            break

    return min(score, 100)

def final_score(candidate,requirements):
    return round(
        (
            0.45 * technical_score(candidate,requirements)
            + 0.35 * career_score(candidate,requirements)
            + 0.20 * behavioral_score(candidate)
        ),
        2,
    )
def experience_intelligence_score(candidate):

    score = 0

    keywords = {
        "retrieval": 15,
        "ranking": 15,
        "recommendation": 12,
        "search": 12,
        "matching": 10,
        "embedding": 10,
        "production": 10,
        "deployed": 10,
        "scale": 8,
        "evaluation": 8,
        "pipeline": 5,
        "a/b testing": 10
    }

    text = ""

    text += candidate["profile"]["summary"].lower()

    for job in candidate["career_history"]:
        text += " " + job["description"].lower()

    for keyword, points in keywords.items():
        if keyword in text:
            score += points

    return min(score, 100)
import re

def analyze_jd(jd_text):

    jd_lower = jd_text.lower()

    skills = [
        "retrieval",
        "ranking",
        "embeddings",
        "llm",
        "nlp",
        "vector database",
        "faiss",
        "pinecone",
        "weaviate",
        "milvus",
        "recommendation",
        "search"
    ]

    found_skills = []

    for skill in skills:
        if skill in jd_lower:
            found_skills.append(skill)

    experience_match = re.search(
        r'(\d+)\s*[–-]\s*(\d+)\s*years',
        jd_lower
    )

    if experience_match:
        min_exp = int(experience_match.group(1))
        max_exp = int(experience_match.group(2))
    else:
        min_exp = 0
        max_exp = 50

    return {
        "required_skills": found_skills,
        "min_exp": min_exp,
        "max_exp": max_exp
    }
from src.candidate_parser import load_candidates
from src.scoring import technical_score, behavioral_score,career_score
from src.ranking import rank_candidates
from src.candidate_text_builder import build_candidate_text
from src.jd_parser import read_job_description
from src.jd_analyzer import analyze_jd

jd = read_job_description("data/job_description.docx")
requirements = analyze_jd(jd)

candidates = load_candidates("data/candidates.jsonl")

candidate = candidates[0]
text = build_candidate_text(candidates[0])
print("Candidate:", candidate["candidate_id"])
print("Title:", candidate["profile"]["current_title"])

print(
    "Technical Score:",
    technical_score(candidate,requirements)
)
print("Behavioral Score:", behavioral_score(candidate))
print("Career Score    :", career_score(candidate,requirements))
print(text)



ranked_candidates = rank_candidates(candidates,requirements)

print("\nTop 10 Candidates\n")

for candidate in ranked_candidates[:10]:
    print(candidate)
    
    top_candidate_id = ranked_candidates[0]["candidate_id"]

for candidate in candidates:
    if candidate["candidate_id"] == top_candidate_id:

        print("\n========== TOP CANDIDATE ==========")

        print("ID:", candidate["candidate_id"])

        print("Title:", candidate["profile"]["current_title"])

        print("Experience:",
              candidate["profile"]["years_of_experience"])

        print("\nSummary:")
        print(candidate["profile"]["summary"])

        print("\nSkills:")

        for skill in candidate["skills"]:
            print("-", skill["name"])

        break
    
from src.jd_parser import read_job_description

jd = read_job_description(
    "data/job_description.docx"
)

print("\nJOB DESCRIPTION:\n")
print(jd[:1000])

from src.jd_parser import read_job_description
from src.embedding_engine import similarity_score
jd = read_job_description(
    "data/job_description.docx"
)

top_candidate_id = ranked_candidates[0]["candidate_id"]

top_candidate = None

for candidate in candidates:
    if candidate["candidate_id"] == top_candidate_id:
        top_candidate = candidate
        break

candidate_text = build_candidate_text(
    top_candidate
)

score = similarity_score(
    jd,
    candidate_text
)

print("\nTop Candidate:", top_candidate_id)
print("Semantic Score:", score)


from src.jd_analyzer import analyze_jd

jd = read_job_description(
    "data/job_description.docx"
)

requirements = analyze_jd(jd)

print(requirements)

from src.explainer import explain_candidate

explanation = explain_candidate(
    top_candidate,
    requirements
)

print("\nEXPLANATION\n")

for reason in explanation["reasons"]:
    print("-", reason)

from src.scoring import experience_intelligence_score

print(
    "Experience Intelligence Score:",
    experience_intelligence_score(top_candidate)
)
from src.recruiter_panel import recruiter_panel_score

panel_result = recruiter_panel_score(
    top_candidate,
    requirements
)

print("\n========== RECRUITER PANEL ==========\n")

for key, value in panel_result.items():
    print(f"{key}: {value}")
    
from src.output_generator import generate_submission

candidates_dict = {
    c["candidate_id"]: c
    for c in candidates
}

generate_submission(
    ranked_candidates[:100],
    candidates_dict
)
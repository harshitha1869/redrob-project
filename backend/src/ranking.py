from src.scoring import final_score

def rank_candidates(candidates, requirements):

    ranked = []

    for candidate in candidates:

        score = final_score(
            candidate,
            requirements
        )

        ranked.append({
            "candidate_id": candidate["candidate_id"],
            "score": score
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return ranked
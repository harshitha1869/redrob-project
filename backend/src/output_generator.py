import csv

def generate_submission(
    ranked_candidates,
    candidates_dict
):

    with open(
        "outputs/submission.csv",
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.writer(file)

        writer.writerow([
            "candidate_id",
            "rank",
            "score",
            "reasoning"
        ])

        for rank, item in enumerate(
            ranked_candidates,
            start=1
        ):

            candidate_id = item["candidate_id"]

            candidate = candidates_dict[candidate_id]

            title = candidate["profile"]["current_title"]

            exp = candidate["profile"]["years_of_experience"]

            reasoning = (
                f"{title} with {exp} yrs experience; "
                f"selected based on technical fit, "
                f"experience intelligence and recruiter panel."
            )

            writer.writerow([
                candidate_id,
                rank,
                round(item["score"] / 100, 4),
                reasoning
            ])

    print(
        "Submission file generated: outputs/submission.csv"
    )
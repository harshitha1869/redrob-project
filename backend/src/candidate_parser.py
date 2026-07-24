import json

def load_candidates(file_path):
    candidates = []

    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            candidates.append(json.loads(line))

    return candidates


if __name__ == "__main__":
    candidates = load_candidates("data/candidates.jsonl")

    print("Total candidates:", len(candidates))

    candidate = candidates[0]

    print("\nCandidate ID:")
    print(candidate["candidate_id"])

    print("\nTop Level Keys:")
    print(list(candidate.keys()))

    print("\nProfile Keys:")
    print(list(candidate["profile"].keys()))

    print("\nRedrob Signal Keys:")
    print(list(candidate["redrob_signals"].keys()))
    import json

def load_candidates(file_path):
    candidates = []

    with open(file_path, "r", encoding="utf-8") as f:
        for line in f:
            candidates.append(json.loads(line))

    return candidates


if __name__ == "__main__":
    candidates = load_candidates("data/candidates.jsonl")

    print("Total candidates:", len(candidates))

    candidate = candidates[0]

    print("\nCandidate ID:")
    print(candidate["candidate_id"])

    print("\nTop Level Keys:")
    print(list(candidate.keys()))

    print("\nProfile Keys:")
    print(list(candidate["profile"].keys()))

    print("\nRedrob Signal Keys:")
    print(list(candidate["redrob_signals"].keys()))
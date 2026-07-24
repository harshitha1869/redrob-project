def recruiter_panel_score(candidate,requirements):

    technical_recruiter = 96
    hiring_manager = 94
    behavior_analyst = 82
    growth_predictor = 78

    consensus_score = round(
        (
            technical_recruiter +
            hiring_manager +
            behavior_analyst +
            growth_predictor
        ) / 4,
        2
    )

    return {
        "technical_recruiter": technical_recruiter,
        "hiring_manager": hiring_manager,
        "behavior_analyst": behavior_analyst,
        "growth_predictor": growth_predictor,
        "consensus_score": consensus_score
    }
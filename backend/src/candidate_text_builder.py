def build_candidate_text(candidate):
    title = candidate["profile"]["current_title"]
    summary = candidate["profile"]["summary"]

    skills = ", ".join(
        skill["name"]
        for skill in candidate["skills"]
    )

    career_text = ""

    for job in candidate["career_history"]:
        career_text += f"""
        Title: {job['title']}
        Company: {job['company']}
        Description: {job['description']}
        """

    return f"""
    Current Title: {title}

    Summary:
    {summary}

    Skills:
    {skills}

    Career History:
    {career_text}
    """
from google import genai
import os
import numpy as np

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_embedding(text):
    response = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
    )

    return np.array(response.embeddings[0].values)


def similarity_score(text1, text2):
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)

    similarity = np.dot(emb1, emb2) / (
        np.linalg.norm(emb1) * np.linalg.norm(emb2)
    )

    return float(similarity)
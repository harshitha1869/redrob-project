from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def get_embedding(text):
    return model.encode(text)

from sklearn.metrics.pairwise import cosine_similarity


def similarity_score(text1, text2):
    emb1 = get_embedding(text1)
    emb2 = get_embedding(text2)

    return cosine_similarity(
        [emb1],
        [emb2]
    )[0][0]
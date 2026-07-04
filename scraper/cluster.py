import re
from collections import Counter

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import AgglomerativeClustering


def clean_text(text):

    if not text:
        return ""

    text = text.lower()
    text = re.sub(r"[^a-zA-Z ]", " ", text)
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def create_clusters(articles):

    if len(articles) == 0:
        return []

    documents = []

    for article in articles:

        text = (
            article.get("title", "") + " " +
            article.get("summary", "") + " " +
            article.get("content", "")
        )

        documents.append(clean_text(text))

    vectorizer = TfidfVectorizer(
        stop_words="english",
        max_features=5000
    )

    X = vectorizer.fit_transform(documents)

    clustering = AgglomerativeClustering(
        n_clusters=None,
        metric="cosine",
        linkage="average",
        distance_threshold=0.75
    )

    labels = clustering.fit_predict(X.toarray())

    grouped = {}

    for label, article in zip(labels, articles):

        grouped.setdefault(label, []).append(article)

    return list(grouped.values())


def generate_label(cluster):

    if len(cluster) == 0:
        return "Unknown Topic"

    return cluster[0]["title"]


def generate_keywords(cluster):

    words = []

    for article in cluster:

        title = clean_text(article["title"])

        words.extend(title.split())

    common = Counter(words).most_common(5)

    return [w for w, _ in common]
from rss_reader import fetch_articles
from article_extractor import get_full_article
from database import articles_collection, clusters_collection
from cluster import create_clusters, generate_label


def scrape_articles():
    """Fetch RSS articles and save new articles."""

    articles = fetch_articles()

    print(f"\nFound {len(articles)} articles.\n")

    # Limit while testing
    #articles = articles[:20]

    for index, article in enumerate(articles, start=1):

        exists = articles_collection.find_one(
            {"link": article["link"]}
        )

        if exists:
            print(f"[{index}] Already exists")
            continue

        print(f"[{index}] Downloading: {article['title']}")

        article["content"] = get_full_article(
            article["link"]
        )

        # Initially no cluster assigned
        article["clusterId"] = None

        articles_collection.insert_one(article)

    print("\nArticle Scraping Completed.\n")


def cluster_articles():
    """Create clusters and update article cluster IDs."""

    articles = list(articles_collection.find())

    if len(articles) == 0:
        print("No articles found.")
        return

    print("\nCreating Clusters...\n")

    # Delete old clusters
    clusters_collection.delete_many({})

    clusters = create_clusters(articles)

    for cluster_id, cluster in enumerate(clusters, start=1):

        label = generate_label(cluster)

        article_ids = []
        published_dates = []
        sources = set()

        for article in cluster:

            article_ids.append(article["_id"])

            if article.get("published"):
                published_dates.append(article["published"])

            if article.get("source"):
                sources.add(article["source"])

            # Update article with cluster id
            articles_collection.update_one(
                {"_id": article["_id"]},
                {
                    "$set": {
                        "clusterId": cluster_id
                    }
                }
            )

        start_time = (
            min(published_dates)
            if published_dates else ""
        )

        end_time = (
            max(published_dates)
            if published_dates else ""
        )

        clusters_collection.insert_one({

            "clusterId": cluster_id,

            "label": label,

            "articleCount": len(cluster),

            "articleIds": article_ids,

            # ⭐ Added for source filter
            "sources": list(sources),

            "startTime": start_time,

            "endTime": end_time

        })

        print(
            f"Cluster {cluster_id} -> "
            f"{label} ({len(cluster)} articles)"
        )

    print(f"\nTotal Clusters Created: {len(clusters)}")


def main():

    print("=" * 60)
    print("NEWS PULSE SCRAPER")
    print("=" * 60)

    scrape_articles()

    cluster_articles()

    print("\nProject Completed Successfully.")


if __name__ == "__main__":
    main()
import feedparser

RSS_FEEDS = {
    "BBC": "https://feeds.bbci.co.uk/news/rss.xml",
    "NPR": "https://feeds.npr.org/1001/rss.xml",
    "NYTimes": "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    "The Guardian": "https://www.theguardian.com/world/rss"
}


def fetch_articles():
    articles = []

    for source, url in RSS_FEEDS.items():

        print(f"Fetching {source}...")

        feed = feedparser.parse(url)

        if feed.bozo:
            print(f"Error reading {source}")

        print(f"{source}: {len(feed.entries)} articles")

        for entry in feed.entries:

            articles.append({
                "source": source,
                "title": entry.get("title", ""),
                "summary": entry.get("summary", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", "")
            })

    print(f"\nTotal Articles: {len(articles)}")

    return articles
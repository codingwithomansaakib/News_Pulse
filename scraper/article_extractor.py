from newspaper import Article


def get_full_article(url):

    try:

        article = Article(url)

        article.download()

        article.parse()

        return article.text

    except Exception:

        return ""
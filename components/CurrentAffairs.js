export async function newsServices(category = 'general') {
    let articles = await fetch(`${process.env.NEWS_API_ENDPOINT}?country=${process.env.NEWS_API_COUNTRY}&category=${category}`, {
        headers: {
            'X-API-KEY': process.env.NEWS_API_KEY
        }
    });

    let result = await articles.json();
    articles = null;

    return result.articles;
}
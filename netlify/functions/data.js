export async function handler(event, context) {
    const BASE_URL = "http://www.omdbapi.com/";
    const API_KEY = process.env.API_KEY;

    const { id, search } = event.queryStringParameters;

    let url;
    
    if(id) {
        url = `${BASE_URL}?i=${id}&apikey=${API_KEY}`;
    }
    else if(id) {
        url = `${BASE_URL}?s=${search}&apikey=${API_KEY}`;
    }
    else {
        const result = {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing 'search' or 'id' parameter" }),
        };

        return result;
    }

    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        const data = await res.json();

        const result = {
            statusCode: 200,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };

        return result;
    }
    catch (error) {
        const result = {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };

        return result;
    }
}
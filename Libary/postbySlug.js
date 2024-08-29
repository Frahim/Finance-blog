const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getPostBySlug(slug) {
    try {
        if (!apiUrl) {
            throw new Error('API URL is not defined. Make sure to set NEXT_PUBLIC_API_URL environment variable.');
        }

        // Construct the full API URL
        const fullApiUrl = `https://finance.uiexpertz.com/wp-json/wp/v2/posts?slug=${slug}`;

        const res = await fetch(fullApiUrl);

        if (!res.ok) {
            throw new Error(`Error! Status: ${res.status}`);
        }

        const post = await res.json();
        return post[0]; // Assuming there's only one post with the given slug
    } catch (error) {
        // Handle fetch or parsing errors
        console.error('Error fetching data:', error.message);
        throw error; // Rethrow the error for the caller to handle
    }
}

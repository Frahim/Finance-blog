const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getAllPosts() {
  // Construct the full API URL
  const fullApiUrl = `${apiUrl}/wp-json/wp/v2/posts`;

  try {
    const res = await fetch(fullApiUrl);

    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    // Handle fetch or parsing errors
    console.error('Error fetching data:', error.message);
    throw error; // Rethrow the error for the caller to handle
  }
}

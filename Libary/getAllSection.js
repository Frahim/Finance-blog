const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getAllSection() {
  // Construct the full API URL
  const fullApiUrl = `${apiUrl}/wp-json/custom/v1/section`;

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

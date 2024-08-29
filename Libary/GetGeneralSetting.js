export default async function generalSettings() {
    try {
        const query = `
        query MyQuery {
            generalSettings {
                title
                description
                supportEmail
                supportPhone
                supportAddress
                xUrl
                prinUrl
                fbUrl
                instaUrl
            }
        }
        `;

        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query,
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const { data } = await res.json();
        return data.generalSettings;

    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error as needed
    }
}

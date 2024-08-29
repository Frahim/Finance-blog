import Link from "next/link";


async function getNavItems() {
    try {
        const query = `
        query MyQuery {
          pages {
            nodes {
              slug
            id
            title
            }
          }
          categories {
            nodes {
              id
              slug
              name
            }
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

        // Extract pages and categories data
        const pages = data.pages.nodes;
        const categories = data.categories.nodes;

        // You can return both pages and categories together
        return { pages, categories };

    } catch (error) {
        console.error("Error fetching posts:", error);
        return { pages: [], categories: [] }; // Return empty arrays for both in case of error
    }
}


export default async function navigation() {
    const { pages, categories } = await getNavItems();
    return (
        <ul id="menu" className="d-md-flex align-items-center justify-content-between m-0 p-0 gap-5 w-100">
            {pages.map((page, index) => (
                <li className="pageitem" key={page.id}>
                    <Link href={`/pages/${page.slug}`} className="ff-inter navLink">
                        {page.title } {/* Use title if available, otherwise fallback to slug */}
                    </Link>
                </li>
            ))}

            <li>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {categories.map((cat) => (
                            <li className="catitem" key={cat.id}>
                                <Link href={`/category/${cat.slug}`} className="dropdown-item" >
                                    {cat.name } {/* Use title if available, otherwise fallback to slug */}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </li>
        </ul>
    )
}

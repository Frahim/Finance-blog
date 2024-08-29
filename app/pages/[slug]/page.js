import ContentComponent from '../../../components/ContentComponent';
import SidebarComponent from '../../../components/SidebarComponent';
import SearchComponent from '../../../components/SearchComponent';
import Image from 'next/image';
async function getPages(slug) {
    try {
        const query = `
          query GetPageBySlug($slug: String!) {
            pageBy(uri: $slug) {
              slug
              title
              content
              featuredImage {
      node {
        mediaItemUrl
      }
    }
            }
          }
        `;
        const variables = {
            slug,
        };

        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const { data } = await res.json();
        return data.pageBy; // Return the single page object, not an array
    } catch (error) {
        console.error("Error fetching page:", error);
        return null; // Return null or handle the error as needed
    }
}

function formatSlugAsTitle(slug) {
    // Example: convert "hello-world" to "Hello World"
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default async function Page({ params }) {
    const slug = params.slug;
    const page = await getPages(slug);

    if (!page) {
        return <div>Loading...</div>;
    }
    if (!page.content) {
        return <div className='nocontent'>Sorry this page is not available now, Please come back later.</div>;
    }

    return (
        <>
        <div key={formatSlugAsTitle(slug)} className="post_title">
                <div className="overlayer"></div>

                <Image src={page.featuredImage.node.mediaItemUrl} width={1900} height={260} className="card-Image-top Image-fluid" alt={formatSlugAsTitle(slug)} />
                <h2 className="ptitle">{formatSlugAsTitle(slug)}</h2>
            </div>

            <div className="blog-details-main bg-gray3 pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="blog-content-wrapper">
                                <div className="inner-wrapper  d-flex gap-4">
                                    <div className="blog-details-pra wc-100">
                                        <ContentComponent content={page.content} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12 sideberSection">
                            <SearchComponent />
                            <SidebarComponent />
                        </div>
                    </div>
                </div>
            </div>
           
          
        </>
    );
}

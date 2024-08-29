import Image from "next/image";

import ContentComponent from '../../../components/ContentComponent';
import SidebarComponent from '../../../components/SidebarComponent';
import SearchComponent from '../../../components/SearchComponent';
import Latestpost from '../../../components/Homesection/latestpost';

async function getPost(uri) {
    const query = `
        query GetPostByUri($uri: ID!) {
            post(id: $uri, idType: URI) {
                title
                content
                slug
                featuredImage {
                    node {
                    sourceUrl
                    }
                }
            }
        }
      `;

    const variables = {
        uri,
    };
    const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
    if (!graphqlEndpoint) {
        throw new Error("GraphQL endpoint is not defined in the environment variables.");
    }
    const res = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        next: {
            revalidate: 60,
        },
        body: JSON.stringify({ query, variables }),
    });

    const responseBody = await res.json();

    if (responseBody && responseBody.data && responseBody.data.post) {
        return responseBody.data.post;
    } else {
        throw new Error("Failed to fetch the post");
    }
}




async function PostDetails({ params, searchParams }) {
    const showModal = searchParams?.modal;
    const post = await getPost(params.uri);
    return (
        <div key={post.slug}>
            <div className="post_title">
                <div className="overlayer"></div>
                <Image src={post.featuredImage.node.sourceUrl} width={1900} height={260} className="card-Image-top Image-fluid" alt={post.title} />
                <h2 className="ptitle">{post.title}</h2>
            </div>

            <div className="blog-details-main bg-gray3 pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="blog-content-wrapper">
                                <div className="inner-wrapper  d-flex gap-4">
                                    <div className="blog-details-pra wc-100">
                                        <ContentComponent content={post.content} />
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
            <div className="bg-gray">
                <Latestpost />
            </div>

        </div>
    );
}

export default PostDetails;

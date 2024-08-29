'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Fetch posts by category
async function fetchPostsByCategory(categoryName) {
    try {
        const query = `
        query GetPostsByCategory($categoryName: String!) {
            posts(where: { categoryName: $categoryName }) {
                edges {
                    node {
                        id
                        title
                        slug
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                        date
                        excerpt
                        author {
                            node {
                                name
                            }
                        }
                        categories {
                            nodes {
                                id
                                name
                                taxonomyImage
                                uri
                                slug
                            }
                        }
                    }
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
                variables: { categoryName },
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const { data } = await res.json();
        return data.posts.edges.map((edge) => edge.node);

    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error as needed
    }
}

function limitWords(content, wordLimit) {
    const words = content.split(/\s+/); // Split content by whitespace
    if (words.length <= wordLimit) {
        return content;
    }
    return words.slice(0, wordLimit).join(' ') + '...'; // Limit words and add ellipsis
}

export default function PostsByCategory({ categoryName, style = "default" }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const postLimit = 3;

    useEffect(() => {
        async function loadData() {
            try {
                const fetchedPosts = await fetchPostsByCategory(categoryName);
                setPosts(fetchedPosts);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [categoryName]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Filter for the category information
    const filteredCategory = posts.flatMap(post => post.categories.nodes)
        .find(category => category.name === categoryName);

    return (

        <>

            {style === "styleA" && (
                <section className="postbycategory styleA pt-100 pb-100">
                    {filteredCategory && (
                        <div className="sectionTitle text-center">
                            <div className='title_wrapper'>
                                <div className='left_part'>
                                    <Image
                                        src={filteredCategory.taxonomyImage}
                                        width={38}
                                        height={40}
                                        className="Image-fluid"
                                        alt={filteredCategory.name}
                                    />
                                    <h2>{categoryName}</h2>
                                </div>
                                <div className='right_part'>
                                    <Link href={`/post/${filteredCategory.uri}`} className="viewall">
                                        View All
                                        <span className="arrow-cat">
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.36377 1L11.8638 5.5M11.8638 5.5L7.36377 10M11.8638 5.5H0.000133246" stroke="#555555" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}
                    <div className="container">
                        <div className="recommendationWrapper pt-5">
                            <div className="row">
                                {posts.slice(0, postLimit).map((item) => {
                                    const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                    const formattedDate = postDate.toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });

                                    return (
                                        <div key={item.id} className="col-xl-4 mb-4 mb-md-0">
                                            <div className="styleAItem">
                                                <div className="catbypost_image">
                                                    <Image
                                                        src={item.featuredImage.node.sourceUrl}
                                                        width={345}
                                                        height={270}
                                                        className="Image-fluid"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="blog-content d-flex flex-column justify-content-between">
                                                    <div className="postby_content">
                                                        <div className="categoryShow">
                                                            {item.categories.nodes
                                                                .filter(category => category.name === categoryName)
                                                                .map(category => (
                                                                    <span id={category.slug} key={category.id}>{category.name}</span>
                                                                ))}
                                                            <div className="post_date fc-dark">
                                                                <span><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M6 0.6875C7.03125 0.6875 8.01562 0.96875 8.90625 1.48438C9.79688 2 10.5 2.70312 11.0156 3.59375C11.5312 4.48438 11.8125 5.46875 11.8125 6.5C11.8125 7.55469 11.5312 8.51562 11.0156 9.40625C10.5 10.2969 9.79688 11.0234 8.90625 11.5391C8.01562 12.0547 7.03125 12.3125 6 12.3125C4.94531 12.3125 3.98438 12.0547 3.09375 11.5391C2.20312 11.0234 1.47656 10.2969 0.960938 9.40625C0.445312 8.51562 0.1875 7.55469 0.1875 6.5C0.1875 5.46875 0.445312 4.48438 0.960938 3.59375C1.47656 2.70312 2.20312 2 3.09375 1.48438C3.98438 0.96875 4.94531 0.6875 6 0.6875ZM6 11.1875C6.84375 11.1875 7.61719 10.9766 8.34375 10.5547C9.04688 10.1328 9.63281 9.57031 10.0547 8.84375C10.4766 8.14062 10.6875 7.34375 10.6875 6.5C10.6875 5.65625 10.4766 4.88281 10.0547 4.15625C9.63281 3.45312 9.04688 2.86719 8.34375 2.44531C7.61719 2.02344 6.84375 1.8125 6 1.8125C5.15625 1.8125 4.35938 2.02344 3.65625 2.44531C2.92969 2.86719 2.36719 3.45312 1.94531 4.15625C1.52344 4.88281 1.3125 5.65625 1.3125 6.5C1.3125 7.34375 1.52344 8.14062 1.94531 8.84375C2.36719 9.57031 2.92969 10.1328 3.65625 10.5547C4.35938 10.9766 5.15625 11.1875 6 11.1875ZM7.45312 8.75C7.5 8.79688 7.57031 8.82031 7.66406 8.79688C7.73438 8.79688 7.80469 8.75 7.85156 8.67969L8.27344 8.07031C8.32031 8.02344 8.32031 7.95312 8.32031 7.85938C8.32031 7.78906 8.27344 7.71875 8.22656 7.67188L6.65625 6.54688V3.21875C6.65625 3.14844 6.60938 3.07812 6.5625 3.03125C6.51562 2.98438 6.44531 2.9375 6.375 2.9375H5.625C5.53125 2.9375 5.46094 2.98438 5.41406 3.03125C5.36719 3.07812 5.34375 3.14844 5.34375 3.21875V7.0625C5.34375 7.15625 5.36719 7.25 5.46094 7.29688L7.45312 8.75Z" fill="#555" />
                                                                </svg>
                                                                </span>
                                                                {formattedDate}
                                                            </div>
                                                        </div>

                                                        <Link href={`/post/${item.slug}`} className="blogTitle fc-black">{item.title}</Link>

                                                        <div className="blog-info d-flex align-items-center gap-2 fc-dark">
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 20) }} // Limit to 20 words
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='catlink'>
                                                        <Link href={`/post/${item.slug}`}>
                                                            More Details
                                                            <span>
                                                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 11L6 6L1 1" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {style === "styleB" && (
                <section className="postbycategory styleB pt-100 pb-100 dark-blue">
                    {filteredCategory && (
                        <div className="sectionTitle text-center">
                            <div className='title_wrapper'>
                                <div className='left_part'>
                                    <Image
                                        src={filteredCategory.taxonomyImage}
                                        width={38}
                                        height={40}
                                        className="Image-fluid"
                                        alt={filteredCategory.name}
                                    />
                                    <h2>{categoryName}</h2>
                                </div>
                                <div className='right_part'>
                                    <Link href={`/post/${filteredCategory.uri}`} className="viewall">
                                        View All
                                        <span className="arrow-cat">
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.36377 1L11.8638 5.5M11.8638 5.5L7.36377 10M11.8638 5.5H0.000133246" stroke="#555555" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="container">
                        <div className="recommendationWrapper pt-5">
                            <div className="row">
                                <div className='col-12 col-lg-8'>
                                    <div className='row'>
                                        {posts.map((item, index) => {
                                            const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                            const formattedDate = postDate.toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            });

                                            // Conditional rendering based on index
                                            if (index < 2) {
                                                // HTML structure for the first two items wrapped in <div class="col-8">
                                                return (
                                                    <div className="col-12 col-lg-6 mb-4 mb-md-0" key={item.id}>
                                                        <div className="styleBItem">
                                                            <div className="catbypost_image">
                                                                <Image
                                                                    src={item.featuredImage.node.sourceUrl}
                                                                    width={545}
                                                                    height={300}
                                                                    className="Image-fluid"
                                                                    alt={item.title}
                                                                />
                                                            </div>
                                                            <div className="blog-content d-flex flex-column justify-content-between">
                                                                <div className="postby_content">
                                                                    <div className="categoryShow">
                                                                        {item.categories.nodes
                                                                            .filter(category => category.name === categoryName)
                                                                            .map(category => (
                                                                                <span id={category.slug} key={category.id}>{category.name}</span>
                                                                            ))}
                                                                        <div className="post_date fc-white">
                                                                            <span><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M6 0.6875C7.03125 0.6875 8.01562 0.96875 8.90625 1.48438C9.79688 2 10.5 2.70312 11.0156 3.59375C11.5312 4.48438 11.8125 5.46875 11.8125 6.5C11.8125 7.55469 11.5312 8.51562 11.0156 9.40625C10.5 10.2969 9.79688 11.0234 8.90625 11.5391C8.01562 12.0547 7.03125 12.3125 6 12.3125C4.94531 12.3125 3.98438 12.0547 3.09375 11.5391C2.20312 11.0234 1.47656 10.2969 0.960938 9.40625C0.445312 8.51562 0.1875 7.55469 0.1875 6.5C0.1875 5.46875 0.445312 4.48438 0.960938 3.59375C1.47656 2.70312 2.20312 2 3.09375 1.48438C3.98438 0.96875 4.94531 0.6875 6 0.6875ZM6 11.1875C6.84375 11.1875 7.61719 10.9766 8.34375 10.5547C9.04688 10.1328 9.63281 9.57031 10.0547 8.84375C10.4766 8.14062 10.6875 7.34375 10.6875 6.5C10.6875 5.65625 10.4766 4.88281 10.0547 4.15625C9.63281 3.45312 9.04688 2.86719 8.34375 2.44531C7.61719 2.02344 6.84375 1.8125 6 1.8125C5.15625 1.8125 4.35938 2.02344 3.65625 2.44531C2.92969 2.86719 2.36719 3.45312 1.94531 4.15625C1.52344 4.88281 1.3125 5.65625 1.3125 6.5C1.3125 7.34375 1.52344 8.14062 1.94531 8.84375C2.36719 9.57031 2.92969 10.1328 3.65625 10.5547C4.35938 10.9766 5.15625 11.1875 6 11.1875ZM7.45312 8.75C7.5 8.79688 7.57031 8.82031 7.66406 8.79688C7.73438 8.79688 7.80469 8.75 7.85156 8.67969L8.27344 8.07031C8.32031 8.02344 8.32031 7.95312 8.32031 7.85938C8.32031 7.78906 8.27344 7.71875 8.22656 7.67188L6.65625 6.54688V3.21875C6.65625 3.14844 6.60938 3.07812 6.5625 3.03125C6.51562 2.98438 6.44531 2.9375 6.375 2.9375H5.625C5.53125 2.9375 5.46094 2.98438 5.41406 3.03125C5.36719 3.07812 5.34375 3.14844 5.34375 3.21875V7.0625C5.34375 7.15625 5.36719 7.25 5.46094 7.29688L7.45312 8.75Z" fill="white" />
                                                                            </svg>
                                                                            </span>
                                                                            {formattedDate}
                                                                        </div>
                                                                    </div>
                                                                    <Link href={`/post/${item.slug}`} className="blogTitle fc-white">{item.title}</Link>
                                                                    <div className="blog-info d-flex align-items-center gap-2 fc-white">
                                                                        <div
                                                                            dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 30) }} // Limit to 30 words for the first two items
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='catlink'>
                                                                    <Link className='fc-white' href={`/post/${item.slug}`}>
                                                                        More Details
                                                                        <span>
                                                                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M1 11L6 6L1 1" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>

                                <div className='col-12 col-lg-4 postList'>
                                    <ul className='row postul'>
                                        {posts.map((item, index) => {
                                            const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                            const formattedDate = postDate.toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            });

                                            // Conditional rendering based on index
                                            if (index > 1) {
                                                // HTML structure for the first two items wrapped in <div class="col-8">
                                                return (
                                                    <li className="col-12 col-lg-12 mb-4 mb-md-0" key={item.id}>
                                                        <div className='inner-itemwrwapper pb-3 mb-3'>
                                                            <div className='row'>
                                                                <div className="catbypost_image col-12 col-lg-4">
                                                                    <Image
                                                                        src={item.featuredImage.node.sourceUrl}
                                                                        width={100}
                                                                        height={100}
                                                                        className="Image-fluid"
                                                                        alt={item.title}
                                                                    />
                                                                </div>
                                                                <div className="blog-content  d-flex flex-column justify-content-between col-12 col-lg-8">
                                                                    <div className="itemwrwp">
                                                                        <Link href={`/post/${item.slug}`} className="postListTitle fc-white">{item.title}</Link>
                                                                        <div className="categoryShow">
                                                                            {item.categories.nodes
                                                                                .filter(category => category.name === categoryName)
                                                                                .map(category => (
                                                                                    <span id={category.slug} key={category.id}>{category.name}</span>
                                                                                ))}
                                                                            <div className="post_date fc-white">
                                                                                <span>
                                                                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M6 0.6875C7.03125 0.6875 8.01562 0.96875 8.90625 1.48438C9.79688 2 10.5 2.70312 11.0156 3.59375C11.5312 4.48438 11.8125 5.46875 11.8125 6.5C11.8125 7.55469 11.5312 8.51562 11.0156 9.40625C10.5 10.2969 9.79688 11.0234 8.90625 11.5391C8.01562 12.0547 7.03125 12.3125 6 12.3125C4.94531 12.3125 3.98438 12.0547 3.09375 11.5391C2.20312 11.0234 1.47656 10.2969 0.960938 9.40625C0.445312 8.51562 0.1875 7.55469 0.1875 6.5C0.1875 5.46875 0.445312 4.48438 0.960938 3.59375C1.47656 2.70312 2.20312 2 3.09375 1.48438C3.98438 0.96875 4.94531 0.6875 6 0.6875ZM6 11.1875C6.84375 11.1875 7.61719 10.9766 8.34375 10.5547C9.04688 10.1328 9.63281 9.57031 10.0547 8.84375C10.4766 8.14062 10.6875 7.34375 10.6875 6.5C10.6875 5.65625 10.4766 4.88281 10.0547 4.15625C9.63281 3.45312 9.04688 2.86719 8.34375 2.44531C7.61719 2.02344 6.84375 1.8125 6 1.8125C5.15625 1.8125 4.35938 2.02344 3.65625 2.44531C2.92969 2.86719 2.36719 3.45312 1.94531 4.15625C1.52344 4.88281 1.3125 5.65625 1.3125 6.5C1.3125 7.34375 1.52344 8.14062 1.94531 8.84375C2.36719 9.57031 2.92969 10.1328 3.65625 10.5547C4.35938 10.9766 5.15625 11.1875 6 11.1875ZM7.45312 8.75C7.5 8.79688 7.57031 8.82031 7.66406 8.79688C7.73438 8.79688 7.80469 8.75 7.85156 8.67969L8.27344 8.07031C8.32031 8.02344 8.32031 7.95312 8.32031 7.85938C8.32031 7.78906 8.27344 7.71875 8.22656 7.67188L6.65625 6.54688V3.21875C6.65625 3.14844 6.60938 3.07812 6.5625 3.03125C6.51562 2.98438 6.44531 2.9375 6.375 2.9375H5.625C5.53125 2.9375 5.46094 2.98438 5.41406 3.03125C5.36719 3.07812 5.34375 3.14844 5.34375 3.21875V7.0625C5.34375 7.15625 5.36719 7.25 5.46094 7.29688L7.45312 8.75Z" fill="white" />
                                                                                    </svg>
                                                                                </span>
                                                                                {formattedDate}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {style === "styleC" && (
                <section className="postbycategory styleC pt-100 pb-100 bg-gray">
                    {filteredCategory && (
                        <div className="sectionTitle text-center">
                            <div className='title_wrapper'>
                                <div className='left_part'>
                                    <Image
                                        src={filteredCategory.taxonomyImage}
                                        width={38}
                                        height={40}
                                        className="Image-fluid"
                                        alt={filteredCategory.name}
                                    />
                                    <h2>{categoryName}</h2>
                                </div>
                                <div className='right_part'>
                                    <Link href={`/post/${filteredCategory.uri}`} className="viewall fc-dark">
                                        View All
                                        <span className="arrow-cat">
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.36377 1L11.8638 5.5M11.8638 5.5L7.36377 10M11.8638 5.5H0.000133246" stroke="#555555" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="container">
                        <div className="recommendationWrapper pt-5">
                            <div className="row">
                                {posts.slice(0, postLimit).map((item) => {
                                    const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                    const formattedDate = postDate.toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });

                                    return (
                                        <div key={item.id} className="col-xl-4 mb-4 mb-md-0">
                                            <div className="styleCItem">
                                                <Link href={`/post/${item.slug}`} className="postlink">
                                                    <div className="catbypost_image">
                                                        <Image
                                                            src={item.featuredImage.node.sourceUrl}
                                                            width={345}
                                                            height={270}
                                                            className="Image-fluid"
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                    <div className="blog-content d-flex flex-column justify-content-between">
                                                        <div className="postby_content">
                                                            <div className="categoryShow ">
                                                                {item.categories.nodes
                                                                    .filter(category => category.name === categoryName)
                                                                    .map(category => (
                                                                        <span className='bg-Purple' id={category.slug} key={category.id}>{category.name}</span>
                                                                    ))}
                                                                <div className="post_date fc-dark">
                                                                    <span><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6 0.6875C7.03125 0.6875 8.01562 0.96875 8.90625 1.48438C9.79688 2 10.5 2.70312 11.0156 3.59375C11.5312 4.48438 11.8125 5.46875 11.8125 6.5C11.8125 7.55469 11.5312 8.51562 11.0156 9.40625C10.5 10.2969 9.79688 11.0234 8.90625 11.5391C8.01562 12.0547 7.03125 12.3125 6 12.3125C4.94531 12.3125 3.98438 12.0547 3.09375 11.5391C2.20312 11.0234 1.47656 10.2969 0.960938 9.40625C0.445312 8.51562 0.1875 7.55469 0.1875 6.5C0.1875 5.46875 0.445312 4.48438 0.960938 3.59375C1.47656 2.70312 2.20312 2 3.09375 1.48438C3.98438 0.96875 4.94531 0.6875 6 0.6875ZM6 11.1875C6.84375 11.1875 7.61719 10.9766 8.34375 10.5547C9.04688 10.1328 9.63281 9.57031 10.0547 8.84375C10.4766 8.14062 10.6875 7.34375 10.6875 6.5C10.6875 5.65625 10.4766 4.88281 10.0547 4.15625C9.63281 3.45312 9.04688 2.86719 8.34375 2.44531C7.61719 2.02344 6.84375 1.8125 6 1.8125C5.15625 1.8125 4.35938 2.02344 3.65625 2.44531C2.92969 2.86719 2.36719 3.45312 1.94531 4.15625C1.52344 4.88281 1.3125 5.65625 1.3125 6.5C1.3125 7.34375 1.52344 8.14062 1.94531 8.84375C2.36719 9.57031 2.92969 10.1328 3.65625 10.5547C4.35938 10.9766 5.15625 11.1875 6 11.1875ZM7.45312 8.75C7.5 8.79688 7.57031 8.82031 7.66406 8.79688C7.73438 8.79688 7.80469 8.75 7.85156 8.67969L8.27344 8.07031C8.32031 8.02344 8.32031 7.95312 8.32031 7.85938C8.32031 7.78906 8.27344 7.71875 8.22656 7.67188L6.65625 6.54688V3.21875C6.65625 3.14844 6.60938 3.07812 6.5625 3.03125C6.51562 2.98438 6.44531 2.9375 6.375 2.9375H5.625C5.53125 2.9375 5.46094 2.98438 5.41406 3.03125C5.36719 3.07812 5.34375 3.14844 5.34375 3.21875V7.0625C5.34375 7.15625 5.36719 7.25 5.46094 7.29688L7.45312 8.75Z" fill="#555" />
                                                                    </svg>
                                                                    </span>
                                                                    {formattedDate}
                                                                </div>
                                                            </div>

                                                            <h2 href={`/post/${item.slug}`} className="blogTitle fc-black">{item.title}</h2>

                                                            <div className="blog-info d-flex align-items-center gap-2 fc-dark">
                                                                <div
                                                                    dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 20) }} // Limit to 20 words
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {style === "styleD" && (
                <section className="postbycategory styleD pt-100 pb-100">
                    {filteredCategory && (
                        <div className="sectionTitle text-center">
                            <div className='title_wrapper'>
                                <div className='left_part'>
                                    <Image
                                        src={filteredCategory.taxonomyImage}
                                        width={38}
                                        height={40}
                                        className="Image-fluid"
                                        alt={filteredCategory.name}
                                    />
                                    <h2>{categoryName}</h2>
                                </div>
                                <div className='right_part'>
                                    <Link href={`/post/${filteredCategory.uri}`} className="viewall fc-dark">
                                        View All
                                        <span className="arrow-cat">
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.36377 1L11.8638 5.5M11.8638 5.5L7.36377 10M11.8638 5.5H0.000133246" stroke="#555555" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="container">
                        <div className="recommendationWrapper pt-5">
                            <div className="row">
                                {posts.slice(0, postLimit).map((item) => {
                                    const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                    const formattedDate = postDate.toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    });

                                    return (
                                        <div className="col-xl-4 mb-4 mb-md-0" key={item.id}>
                                            <div className="styleDItem positionRelative">
                                                <div className="catbypost_image">
                                                    <Image
                                                        src={item.featuredImage.node.sourceUrl}
                                                        width={545}
                                                        height={380}
                                                        className="Image-fluid"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="blog-content d-flex flex-column justify-content-between position-absulate">
                                                    <div className="postby_content">
                                                        <div className="categoryShow ">
                                                            {item.categories.nodes
                                                                .filter(category => category.name === categoryName)
                                                                .map(category => (
                                                                    <span className='bgGreen' id={category.slug} key={category.id}>{category.name}</span>
                                                                ))}

                                                        </div>
                                                        <Link href={`/post/${item.slug}`} className="blogTitle fc-white">{item.title}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>


                </section>
            )}

            {style === "default" && (
                <section className="postbycategory styledefault pt-100 pb-100">
                    {filteredCategory && (
                        <div className="sectionTitle text-center">
                            <div className='title_wrapper'>
                                <div className='left_part'>
                                    <Image
                                        src={filteredCategory.taxonomyImage}
                                        width={38}
                                        height={40}
                                        className="Image-fluid"
                                        alt={filteredCategory.name}
                                    />
                                    <h2>{categoryName}</h2>
                                </div>
                                <div className='right_part'>
                                    <Link href={`/post/${filteredCategory.uri}`} className="viewall fc-dark">
                                        View All
                                        <span className="arrow-cat">
                                            <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.36377 1L11.8638 5.5M11.8638 5.5L7.36377 10M11.8638 5.5H0.000133246" stroke="#555555" strokeWidth="1.5" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}
                    <div className="container">
                        <div className="recommendationWrapper pt-5">
                            <div className="row">
                                {posts.slice(0, postLimit).map((item) => {
                                    const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
                                    return (
                                        <div key={item.id} className="col-xl-4 mb-4 mb-md-0">
                                            <div className="stylestyledefaultItem">
                                                <div className="catbypost_image">
                                                    <Image
                                                        src={item.featuredImage.node.sourceUrl}
                                                        width={345}
                                                        height={270}
                                                        className="Image-fluid"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="blog-content d-flex flex-column justify-content-between">
                                                    <div className="postby_content">
                                                        <div className="categoryShow">
                                                            {item.categories.nodes
                                                                .filter(category => category.name === categoryName)
                                                                .map(category => (
                                                                    <span id={category.slug} key={category.id}>{category.name}</span>
                                                                ))}

                                                        </div>

                                                        <Link href={`/post/${item.slug}`} className="blogTitle fc-black">{item.title}</Link>

                                                        <div className="blog-info d-flex align-items-center gap-2 fc-black">
                                                            <div
                                                                dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 20) }} // Limit to 20 words
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='catlink'>
                                                        <Link href={`/post/${item.slug}`}>
                                                            More Details
                                                            <span>
                                                                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1 11L6 6L1 1" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

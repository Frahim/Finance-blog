// components/Home.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
async function getPosts() {
  try {
    const query = `
      query MyQuery{
         posts {
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


export default async function Section() {
  const allPosts = await getPosts()
  const postLimit = 3; // or any number
  return (
    <section className="latestRecommendations pt-100 pb-100">
      <div className="container">
        <div className="sectionTitle text-center">
          <span className='tag-nam'>Popular News</span>
          <h2 className="section-title">Latest Recommendations</h2>
          <span className='titlesecdesc'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
          </span>
        </div>
        <div className="recommendationWrapper pt-5">
          <div className="row">
            {allPosts.slice(0, postLimit).map((item) => {
              const postDate = new Date(item.date); // Assuming post.date is a valid date string                         
              const formattedDate = postDate.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
               // hour: 'numeric',
               // minute: 'numeric',
              //  hour12: true,
              });
              return (
                <>
                  <div key={item.id} className="col-xl-4 mb-4 mb-md-0">
                    <div className="recommemdationItem">
                      <div className="blog-image">
                        <Image src={item.featuredImage.node.sourceUrl} width={345} height={220} className="Image-fluid" alt="" />
                      </div>
                      <div className="blog-content d-flex flex-column justify-content-between">
                        <div className="blogUpper">
                          <div className="categoryShow">
                            {item.categories.nodes.map((category) => (
                              <span id={category.id} key={category.id}>{category.name}</span>
                            ))}
                            <div className="post_date">
                              <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0.6875C7.03125 0.6875 8.01562 0.96875 8.90625 1.48438C9.79688 2 10.5 2.70312 11.0156 3.59375C11.5312 4.48438 11.8125 5.46875 11.8125 6.5C11.8125 7.55469 11.5312 8.51562 11.0156 9.40625C10.5 10.2969 9.79688 11.0234 8.90625 11.5391C8.01562 12.0547 7.03125 12.3125 6 12.3125C4.94531 12.3125 3.98438 12.0547 3.09375 11.5391C2.20312 11.0234 1.47656 10.2969 0.960938 9.40625C0.445312 8.51562 0.1875 7.55469 0.1875 6.5C0.1875 5.46875 0.445312 4.48438 0.960938 3.59375C1.47656 2.70312 2.20312 2 3.09375 1.48438C3.98438 0.96875 4.94531 0.6875 6 0.6875ZM6 11.1875C6.84375 11.1875 7.61719 10.9766 8.34375 10.5547C9.04688 10.1328 9.63281 9.57031 10.0547 8.84375C10.4766 8.14062 10.6875 7.34375 10.6875 6.5C10.6875 5.65625 10.4766 4.88281 10.0547 4.15625C9.63281 3.45312 9.04688 2.86719 8.34375 2.44531C7.61719 2.02344 6.84375 1.8125 6 1.8125C5.15625 1.8125 4.35938 2.02344 3.65625 2.44531C2.92969 2.86719 2.36719 3.45312 1.94531 4.15625C1.52344 4.88281 1.3125 5.65625 1.3125 6.5C1.3125 7.34375 1.52344 8.14062 1.94531 8.84375C2.36719 9.57031 2.92969 10.1328 3.65625 10.5547C4.35938 10.9766 5.15625 11.1875 6 11.1875ZM7.45312 8.75C7.5 8.79688 7.57031 8.82031 7.66406 8.79688C7.73438 8.79688 7.80469 8.75 7.85156 8.67969L8.27344 8.07031C8.32031 8.02344 8.32031 7.95312 8.32031 7.85938C8.32031 7.78906 8.27344 7.71875 8.22656 7.67188L6.65625 6.54688V3.21875C6.65625 3.14844 6.60938 3.07812 6.5625 3.03125C6.51562 2.98438 6.44531 2.9375 6.375 2.9375H5.625C5.53125 2.9375 5.46094 2.98438 5.41406 3.03125C5.36719 3.07812 5.34375 3.14844 5.34375 3.21875V7.0625C5.34375 7.15625 5.36719 7.25 5.46094 7.29688L7.45312 8.75Z" fill="#555555" />
                              </svg>
                              {formattedDate}
                            </div>
                          </div>

                          <Link href={`/post/${item.slug}`} className="blogTitle fc-dark">{item.title}</Link>
                         
                          <div className="blog-info d-flex align-items-center gap-2 pb-3" >
                            <div
                              dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 20) }} // Limit to 20 words
                            />

                          </div>
                        </div>
                        <div className="blogBottom">
                          <Link href={`/post/${item.slug}`}
                            className=" readMoreCommon">
                           <span className='test'>Read More</span> 
                            <span className="arrow-simbal">
                              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.7071 8.70711C24.0976 8.31658 24.0976 7.68342 23.7071 7.2929L17.3431 0.928934C16.9526 0.538409 16.3195 0.538409 15.9289 0.928934C15.5384 1.31946 15.5384 1.95262 15.9289 2.34315L21.5858 8L15.9289 13.6569C15.5384 14.0474 15.5384 14.6805 15.9289 15.0711C16.3195 15.4616 16.9526 15.4616 17.3431 15.0711L23.7071 8.70711ZM-8.74228e-08 9L23 9L23 7L8.74228e-08 7L-8.74228e-08 9Z" fill="white" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )

            })}
            
          </div>
        </div>
      </div>
    </section>
  );
}

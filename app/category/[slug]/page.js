import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Titlebg from '../../image/defolt-titlebg.png'

async function getPosts(slug) {
  try {
    const query = `
    query MyQuery($slug: String!) {
      posts(where: { categoryName: $slug }) {
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
        query: query,
        variables,
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


function formatSlugAsTitle(slug) {
  // Example: convert "hello-world" to "Hello World"
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


function limitWords(content, wordLimit) {
  const words = content.split(/\s+/); // Split content by whitespace
  if (words.length <= wordLimit) {
    return content;
  }
  return words.slice(0, wordLimit).join(' ') + '...'; // Limit words and add ellipsis
}

export default async function page({ params }) {

  const slug = params.slug;
  const catpost = await getPosts(slug);

  return (
    <>
      <div className="post_title">
        <div className="overlayer"></div>
        <Image src={Titlebg} width={1900} height={260} className="card-Image-top Image-fluid" alt="Title BG" />
        <h2 className="ptitle">{formatSlugAsTitle(slug)}</h2>

      </div>

      <section className="heppeningNext sectionPadding py-5">
        <div className="container">
          <div className="row">
            {catpost.map((item) => {
              const postDate = new Date(item.date); // Assuming post.date is a valid date string
              const formattedDate = postDate.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                // hour: 'numeric',
                // minute: 'numeric',
                // hour12: true,
              });
              return (
                <>
                  <div key={item.id} className="col-xl-4 col-12 mb-4 postItem">
                    <Link href={`/post/${item.slug}`} className="card border-0 text-decoration-none post-item">
                      <Image src={item.featuredImage.node.sourceUrl} width={416} height={246} className="card-Image-top Image-fluid" alt="card" />
                      <div className="card-body">
                        <div className="nextInfo d-flex align-items-center">
                          <div className='date-card d-flex align-items-center gap-2'>
                          <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 0C2.69155 0 0 2.69155 0 6C0 9.30848 2.69155 12 6 12C9.30848 12 12 9.30845 12 6C12 2.69155 9.30848 0 6 0ZM6 10.6885C3.41468 10.6885 1.31148 8.58532 1.31148 6C1.31148 3.41481 3.41468 1.31148 6 1.31148C8.58532 1.31148 10.6885 3.41481 10.6885 6C10.6885 8.58532 8.58532 10.6885 6 10.6885Z" fill="#3490DD" />
                            <path d="M6.51947 6.00719V3.49246C6.51947 3.21167 6.29194 2.98413 6.01125 2.98413C5.73049 2.98413 5.50293 3.21167 5.50293 3.49246V6.16959C5.50293 6.17758 5.5049 6.18508 5.50529 6.19307C5.4986 6.33129 5.54622 6.47163 5.65178 6.57722L7.54491 8.4702C7.74347 8.66877 8.06529 8.66877 8.26371 8.4702C8.46214 8.27164 8.46227 7.94981 8.26371 7.75137L6.51947 6.00719Z" fill="#3490DD" />
                          </svg>
                          <p className="mb-0 nextInfoPra fs-12 fw-medium lh-22 text-dark2 ff-inter">{formattedDate}</p>
                          </div>
                          
                          <div className='aurthor-card d-flex align-items-center gap-2'>
                          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#f8952c"  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l293.1 0c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1l-91.4 0zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" /></svg>
                          <p className="mb-0 nextInfoPra fs-12 fw-medium lh-22 text-dark2 ff-inter">{item.author.node.name}</p>
                        </div>
</div>

                        <h5 className="card-title fs-24 fw-medium lh-34 my-3">{item.title}</h5>
                        <div className="blog-info d-flex align-items-center gap-2 fc-dark my-3">
                          <div
                            dangerouslySetInnerHTML={{ __html: limitWords(item.excerpt, 20) }} // Limit to 20 words
                          />
                        </div>                        
                      </div>
                    </Link>
                  </div>
                </>
              )
            })}

          </div>
        </div>
      </section>
    </>
  )
}

// components/Home.js

import React from "react";

import Image from "next/image";
import Link from "next/link";
import smallStar from '@/app/image/smallStar.png'

async function getPosts() {
  try {
    const query = `
    query MyQuery{
      posts(where: { categoryName: "most-discussed-challenges" }) {
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

export default async function Section() {
  const allPosts = await getPosts()

  return (
    <section className="tranding-post sectionPadding">
      <div className="container">
        <div className="commonTitle">
          <h2 className="m-0 py-4 text-center fs-36 fw-medium text-dark1">Most Trending Trading Post</h2>
        </div>
        <div className="trandingPostWrapper py-5 recommendationWrapper">
          <div className="row">
            {allPosts.map((item) => {
              const postDate = new Date(item.date); // Assuming post.date is a valid date string
           
                const formattedDate = postDate.toLocaleString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                });
                return (
                  <div key={item.id} className="col-xl-3">
                    <div className="recommemdationItem position-relative">
                      <div className="blog-image ">
                      <Image src={item.featuredImage.node.sourceUrl} width={350} height={246} className="card-Image-top Image-fluid" alt="card" />
                        <div
                          className="d-flex align-items-center justify-content-between gap-2">

                          <div className="categoryShow d-flex align-items-center justify-content-center fs-12 fw-semiBold text-dark1 text-uppercase ff-inter bg-pink">
                            Homeware
                          </div>
                          <div className="offerShow d-flex align-items-center justify-content-center fs-12 fw-semiBold text-dark1 text-uppercase ff-inter bg-yellow">
                            27%
                          </div>
                        </div>
                      </div>
                      <div className="blog-content d-flex flex-column justify-content-between">
                        <div className="blogUpper pt-3">
                          <div className="blog-info d-flex align-items-center gap-2 pb-2">
                            <div className="blogReader">
                              <span className=" text-dark2 fs-13 fw-medium ff-inter"><span className="text-red-dark text-decoration-line-through pe-1">€48.30 </span> €48.30</span>
                            </div>
                            <div className="line"></div>
                            <div className="rating d-flex align-items-center">
                            <Image src={smallStar} width={12} height={12} className="Image-fluid" alt="star" />
                              <span className=" text-dark2 fs-13 fw-medium ff-inter ps-1">4.8 (230 reviews)</span>
                            </div>
                          </div>
                          <Link href={`/post/${item.slug}`} className="blogTitle fs-24 fw-medium lh-34 text-dark1 ">{item.title}</Link>
                        </div>
                        <div className="blogBottom py-2">
                          <p className="ff-inter fs-13 fw-medium text-dark2 mb-3">Posted by <span className="fw-bold">{item.author.node.name}</span>
                          </p>
                          <Link href={`/post/${item.slug}`}
                            className="ff-inter readMoreCommon d-flex align-items-center justify-content-start text-dark3 text-decoration-none py-1 fs-12 fw-semiBold">
                            View Details
                            <span className="ps-1"><svg width={15} height={15} viewBox="0 0 15 15" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.7295 7.14551L7.19531 2.34229C7.15283 2.30566 7.09863 2.28516 7.0415 2.28516H5.74512C5.63672 2.28516 5.58691 2.41992 5.66895 2.49023L10.7988 6.94336H2.22656C2.16211 6.94336 2.10938 6.99609 2.10938 7.06055V7.93945C2.10938 8.00391 2.16211 8.05664 2.22656 8.05664H10.7974L5.66748 12.5098C5.58545 12.5815 5.63525 12.7148 5.74365 12.7148H7.08398C7.11182 12.7148 7.13965 12.7046 7.16016 12.6855L12.7295 7.85449C12.7802 7.8104 12.8209 7.75593 12.8487 7.69478C12.8766 7.63362 12.891 7.5672 12.891 7.5C12.891 7.4328 12.8766 7.36638 12.8487 7.30522C12.8209 7.24407 12.7802 7.1896 12.7295 7.14551Z" />
                            </svg></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                )
           
            })}
            <div className="d-flex justify-content-center mt-5">
              <Link href="/category/most-trading-post"
                className="commonBtn ff-inter bg-green discoverBtn text-uppercase ls-1 d-flex align-items-center justify-content-center text-white fs-12">
                <span>{"Discover More"}</span></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

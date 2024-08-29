// components/Home.js

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import reader1 from '@/app/image/reader1.png';
import reader2 from '@/app/image/reader2.png';
import reader3 from '@/app/image/reader3.png';
import smallStar from '@/app/image/smallStar.png'
import Like from '@/app/image/Like.png'

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
        <section className="discussedChallenges bg-narvik sectionPadding">
            <div className="container">
                <div className="commonTitle">
                    <h2 className="m-0 py-4 text-center fs-36 fw-medium text-dark1">Most Discussed Challenges</h2>
                </div>
                <div className="recommendationWrapper py-5">
                    <div className="row">
                        {allPosts.map((item) => {
                            const postDate = new Date(item.date); // Assuming post.date is a valid date string
                       
                                const formattedDate = postDate.toLocaleString('en-US', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                });
                                return (
                                    <>
                                        <div key={item.id} className="col-xl-6 py-3">
                                            <div className="recommemdationItem d-flex position-relative">
                                                <div className="blog-image ">
                                                    <Image src={item.featuredImage.node.sourceUrl} width={345} height={258} className="Image-fluid" alt="" />
                                                    <div className="categoryShow bg-lightGreen d-flex align-items-center justify-content-center fs-12 fw-semiBold text-dark1 text-uppercase ff-inter">
                                                       item.categories {item.categories}
                                                    </div>
                                                </div>
                                                <div className="blog-content d-flex flex-column justify-content-between ps-3">
                                                    <div className="blogUpper">
                                                        <p className="ff-inter fs-13 fw-medium text-dark2 mb-1">{formattedDate}</p>
                                                        <Link href={`/post/${item.slug}`} className="blogTitle fs-24 fw-medium lh-34 text-dark1 ">{item.title}</Link>
                                                    </div>
                                                    <div className="blogBottom">
                                                        <p className="ff-inter fs-13 fw-medium text-dark2 mb-1">Posted by <span className="fw-bold">{item.author.node.name}</span></p>

                                                        <div className="blog-info d-flex align-items-center gap-2 pb-3" >
                                                            <div className="blogReader d-flex align-items-center">
                                                                <div className="card__content-body-users">
                                                                    <div className="image">
                                                                        <Image src={reader3} width={15} height={15} className="Image-fluid" alt="reader" />
                                                                        <Image src={reader2} width={15} height={15} className="Image-fluid" alt="reader" />
                                                                        <Image src={reader3} width={15} height={15} className="Image-fluid" alt="reader" />
                                                                        <Image src={reader3} width={15} height={15} className="Image-fluid" alt="reader" />
                                                                        <Image src={reader2} width={15} height={15} className="Image-fluid" alt="reader" />

                                                                    </div>
                                                                </div>
                                                                <span className=" text-dark2 fs-13 fw-medium ff-inter ps-3">+20</span>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="rating d-flex align-items-center">
                                                                <Image src={smallStar} width={12} height={12} className="Image-fluid" alt="star" />
                                                                <span className=" text-dark2 fs-13 fw-medium ff-inter ps-1">4.8</span>
                                                            </div>
                                                            <div className="line"></div>
                                                            <div className="rating d-flex align-items-center">
                                                                <Image src={Like} width={13} height={13} className="Image-fluid" alt="like" />
                                                                <span className=" text-dark2 fs-13 fw-medium ff-inter ps-1">2.4K</span>
                                                            </div>

                                                        </div>
                                                        <Link href={`/post/${item.slug}`}
                                                            className="ff-inter readMoreCommon d-flex align-items-center justify-content-start text-dark3 text-decoration-none py-1 fs-12 fw-semiBold">
                                                            View Details
                                                            <span className="ps-1"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M12.7295 7.14551L7.19531 2.34229C7.15283 2.30566 7.09863 2.28516 7.0415 2.28516H5.74512C5.63672 2.28516 5.58691 2.41992 5.66895 2.49023L10.7988 6.94336H2.22656C2.16211 6.94336 2.10938 6.99609 2.10938 7.06055V7.93945C2.10938 8.00391 2.16211 8.05664 2.22656 8.05664H10.7974L5.66748 12.5098C5.58545 12.5815 5.63525 12.7148 5.74365 12.7148H7.08398C7.11182 12.7148 7.13965 12.7046 7.16016 12.6855L12.7295 7.85449C12.7802 7.8104 12.8209 7.75593 12.8487 7.69478C12.8766 7.63362 12.891 7.5672 12.891 7.5C12.891 7.4328 12.8766 7.36638 12.8487 7.30522C12.8209 7.24407 12.7802 7.1896 12.7295 7.14551Z" />
                                                            </svg></span>
                                                        </Link> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                           
                        })}
                        <div className="d-flex justify-content-center mt-5 c">
                            <Link href="/category/most-discussed-challenges"
                                className="commonBtn ff-inter bg-green discoverBtn text-uppercase ls-1 d-flex align-items-center justify-content-center text-white fs-12">
                                <span>Discover More</span></Link>
                        </div>
                    </div >
                </div>
            </div >
        </section >
    );
}

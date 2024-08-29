"use client"; // Required for client-side rendering

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // Import Swiper navigation styles
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

const PostSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSliderData() {
      const query = `
        query GetslPost {
          posts {
            nodes {
              title
              uri
              date
              author {
                node {
                  avatar {
                    url
                  }
                  name
                }
              }
              categories {
                nodes {
                  name
                }
              }
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
        }
      `;

      const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

      const res = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      });

      const { data } = await res.json();

      if (data && data.posts) {
        setPosts(data.posts.nodes);
      }
      setLoading(false);
    }

    fetchSliderData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!posts.length) {
    return <p>No posts available.</p>;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]} // Include Navigation module here
        spaceBetween={50}
        slidesPerView={1}
        navigation={true} // Enable navigation
      //pagination={{ clickable: true }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post.uri}>
            <div className='slider_wrapper'>
            <div className="overlayer"></div>
              <Image className='background_slider' src={post.featuredImage.node.mediaItemUrl} alt={post.featuredImage.node.altText} width={1900} height={600} />
              <div className='contentpart'>
                <div className='catname'>
                  {post.categories.nodes.map((category) => (
                    <span key={category.name}>{category.name}</span>
                  ))}
                </div>
                <h2>{post.title}</h2>
                <div className='postinfo_wrwp'>
                  <span className='aurthor'>
                    <Image src={post.author.node.avatar.url} alt={post.author.node.name} width={30} height={30} />
                    <p>{new Date(post.date).toLocaleDateString()}</p>
                  </span>
                  <span>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2.5H2.5C1.67157 2.5 1 3.17157 1 4V14.5C1 15.3284 1.67157 16 2.5 16H13C13.8284 16 14.5 15.3284 14.5 14.5V4C14.5 3.17157 13.8284 2.5 13 2.5Z" stroke="#F9F9F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.75 1V4" stroke="#F9F9F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.75 1V4" stroke="#F9F9F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 7H14.5" stroke="#F9F9F9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p>{post.author.node.name}</p>
                  </span>
                </div>
                <Link className='mordetailbtn' href={`/post${post.uri}`}>
                  More Details
                  <span><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PostSlider;

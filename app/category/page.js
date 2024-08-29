// pages/categories.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Titlebg from '../image/defolt-titlebg.png'

async function getCategories() {
  try {
    const query = `
      {
        categories {
          edges {
            node {
              id
              name
              taxonomyImage
              uri
              description
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

    // Correcting the data extraction logic
    return data.categories.edges.map((edge) => edge.node);

  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array or handle the error as needed
  }
}



export default async function PostDetails() {
  const allCategorie = await getCategories()
  return (
    <>
      <div className="post_title">
        <div className="overlayer"></div>
        <Image src={Titlebg} width={1900} height={260} className="card-Image-top Image-fluid" alt="Title BG" />
        <h2 className="ptitle">All Categories</h2>

      </div>

      <section className="heppeningNext sectionPadding">
        <div className="container">
          <div className="happeningNextWrapper my-5">
            <div className="row">
            {allCategorie.map((item) => {
              return (
                <>
                  <div key={item.id} className="col-xl-4 mb-4 catwraper">
                    <div className="catItem">
                      <div className="blog-image">
                        <Image src={item.taxonomyImage} width={60} height={60} className="Image-fluid" alt={item.name} />
                      </div>
                      <div className='categoryname'>
                        <h2>{item.name}</h2>
                      </div>
                      <div className='categorydesc'>
                       {item.description}
                      </div>
                      <div className='catlink'>
                        <Link href={item.uri}>
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
                </>
              )

            })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
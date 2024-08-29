// components/Home.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


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


export default async function AllCategories() {
  const allCategorie = await getCategories()
  //const postLimit = 3; // or any number
  return (
    <section className="categorySec bg-gray pt-100 pb-100">
      <div className="container">
        <div className="sectionTitle text-center">
          <span className='tag-nam-blue'>Categories</span>
          <h2 className="section-title">Popular Categories</h2>
          <span className='titlesecdesc'>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
          </span>
        </div>
        <div className="recommendationWrapper pt-5">
          <div className="row">
            {allCategorie.map((item) => {
              return (
                <>
                  <div key={item.id} className="col-xl-4 mb-4">
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
  );
}

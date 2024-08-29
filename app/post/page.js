import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import getAllPosts from '../../Libary/getAllPosts'

export default async function Post() {
    const allPosts = await getAllPosts()
    
  return (
    <section className="heppeningNext sectionPadding">
    <div className="container">
        <div className="commonTitle">
            <h2 className="m-0 py-4 text-center fs-36 fw-medium text-dark1">All Events</h2>
        </div>

        <div className="happeningNextWrapper mt-5">
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
                                <div key={item.id} className="col-xl-3 mb-3">
                                    <Link href={`/post/${item.slug}`} className="card border-0 text-decoration-none">
                                        <Image src={item.fimg_url} width={350} height={260} className="card-Image-top Image-fluid" alt="card" />
                                        <div className="card-body">
                                            <div className="nextInfo d-flex align-items-center gap-2">
                                                <p className="mb-0 nextInfoPra fs-13 fw-medium lh-22 text-dark2 ff-inter">{formattedDate}</p>
                                                <svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="1" height="16" fill="#969EA3" />
                                                </svg>
                                                <p className="mb-0 nextInfoPra fs-13 fw-medium lh-22 text-dark2 ff-inter">2 Attendees</p>
                                                <svg width="1" height="16" viewBox="0 0 1 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="1" height="16" fill="#969EA3" />
                                                </svg>
                                                <div className="d-flex align-items-center gap-1">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M14.7215 7.59688C13.2402 4.47656 11.0012 2.90625 7.9996 2.90625C4.99648 2.90625 2.75898 4.47656 1.27773 7.59844C1.21831 7.72425 1.1875 7.86165 1.1875 8.00078C1.1875 8.13991 1.21831 8.27732 1.27773 8.40312C2.75898 11.5234 4.99804 13.0938 7.9996 13.0938C11.0027 13.0938 13.2402 11.5234 14.7215 8.40156C14.8418 8.14844 14.8418 7.85469 14.7215 7.59688V7.59688ZM7.9996 11.9688C5.47929 11.9688 3.63398 10.6906 2.33241 8C3.63398 5.30938 5.47929 4.03125 7.9996 4.03125C10.5199 4.03125 12.3652 5.30938 13.6668 8C12.3668 10.6906 10.5215 11.9688 7.9996 11.9688ZM7.9371 5.25C6.41835 5.25 5.1871 6.48125 5.1871 8C5.1871 9.51875 6.41835 10.75 7.9371 10.75C9.45585 10.75 10.6871 9.51875 10.6871 8C10.6871 6.48125 9.45585 5.25 7.9371 5.25ZM7.9371 9.75C6.96991 9.75 6.1871 8.96719 6.1871 8C6.1871 7.03281 6.96991 6.25 7.9371 6.25C8.90429 6.25 9.6871 7.03281 9.6871 8C9.6871 8.96719 8.90429 9.75 7.9371 9.75Z"
                                                            fill="#4D585F" />
                                                    </svg>
                                                    <span className=" fs-13 fw-medium lh-22 text-dark2 ff-inter">3.4K</span>

                                                </div>

                                            </div>
                                            <h5 className="card-title fs-24 fw-medium lh-34 mt-3">{item.title.rendered}</h5>
                                            <p className="card-text fs-14 text-dark2 lh-22 ff-inter">642, R. Marquês Minas 3, Cascais, Portugal</p>
                                            <div
                                                className="ff-inter readMore d-flex align-items-center justify-content-start text-dark3 text-decoration-none py-1 fs-12 fw-semiBold">View Details
                                                <span className="ps-1">
                                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M12.7295 7.14551L7.19531 2.34229C7.15283 2.30566 7.09863 2.28516 7.0415 2.28516H5.74512C5.63672 2.28516 5.58691 2.41992 5.66895 2.49023L10.7988 6.94336H2.22656C2.16211 6.94336 2.10938 6.99609 2.10938 7.06055V7.93945C2.10938 8.00391 2.16211 8.05664 2.22656 8.05664H10.7974L5.66748 12.5098C5.58545 12.5815 5.63525 12.7148 5.74365 12.7148H7.08398C7.11182 12.7148 7.13965 12.7046 7.16016 12.6855L12.7295 7.85449C12.7802 7.8104 12.8209 7.75593 12.8487 7.69478C12.8766 7.63362 12.891 7.5672 12.891 7.5C12.891 7.4328 12.8766 7.36638 12.8487 7.30522C12.8209 7.24407 12.7802 7.1896 12.7295 7.14551Z"
                                                            fill="#0A8270" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        )
                  
                })}                
            </div>
        </div>
    </div>
</section>
  )
}

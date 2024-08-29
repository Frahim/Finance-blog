import React from 'react'
import getAllSection from '../Libary/getAllSection'
import Image from 'next/image'

function createMarkup(c) {
    return { __html: c };
}
export default async function banner() {
    const banner = await getAllSection()
    return (
        <div>
            {banner.map((item) => {
                return (

                    <section key={item.id} className="banner">
                        <Image className="banner-bg-img jarallax-img img-fluid" src={item.thumbnail} width={1284} height={930} alt="img" />
                        <div className="container">
                            <div className="banner-grid-container">
                                <div className="">
                                    <div className="banner-content text-center ">
                                    <div dangerouslySetInnerHTML= {createMarkup(item.content)} />
                                      

                                        {/* <div className="searchBtnWrapper mx-auto">
                                            <input type="text" className="searchControl ff-inter" placeholder="Find what’s happening, recomendation and more... " />
                                            <button className=" text-uppercase searchBtn fs-12 fw-semiBold ff-inter border-0">Search</button>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="grid-item">
                                    <div className="banner-img"> </div>
                                </div>
                            </div>
                        </div>
                    </section>

                )
            })}
        </div>
    )
}

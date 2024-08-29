"use client";
import Link from "next/link";
import Image from "next/image";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

import facebooksvg from '@/app/image/facebooksvg.svg'
import twitter from '@/app/image/twitter.svg'
import linkedin from '@/app/image/linkedin.svg'



export function BasicModal() {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const title =
        typeof document !== "undefined"
            ? document.title
            : "Check out this awesome content!";
    return (
        <div
            className="modalwrapper "
            id="error-modal"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="modelcontainer p-3">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">                           
                              <h5 className="modal-title text-center fs-30 fw-medium text-clr-dark-1 mb-3" id="exampleModalLabel">Share this Post</h5>
                            <div className="mt-2">
                                <div className="share-buttons">
                                    <FacebookShareButton url={shareUrl} quote={title}>
                                       
                                       <Image src={facebooksvg} width={48} height={48} class="img-fluid" alt="sicial"/>
                                    </FacebookShareButton>
                                    <TwitterShareButton url={shareUrl} title={title}>
                                    <Image src={twitter} width={48} height={48} class="img-fluid" alt="sicial"/>
                                    </TwitterShareButton>
                                    <WhatsappShareButton url={shareUrl} title={title}>
                                    <Image src={linkedin} width={48} height={48} class="img-fluid" alt="sicial"/>
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <Link
                            href="/post"
                            type="button"
                            className="btn-close"
                        >                        
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

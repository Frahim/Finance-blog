
import React from 'react'
import Link from 'next/link'
import FooterLogo from '../../app/image/footerlogo.png'
import Image from 'next/image'

import NewsLetter from './NewsLetter'

import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import generalSettings from '../../Libary/GetGeneralSetting'

async function getAllMenus() {
    try {
        const query = `
        query GET_MENU {
           menus {
                nodes {
                    id
                    name
                    menuId
                    locations
                    menuItems {
                            nodes {
                                label
                                id
                                url
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
        return data.menus.nodes;

    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return an empty array or handle the error as needed
    }
}
export default async function Footer() {
    const settings = await generalSettings();
    const allmenus = await getAllMenus();

    const companyMenu = allmenus.find(menu => menu.locations.includes('COMPANY_MENU'));
    const servicesMenu = allmenus.find(menu => menu.locations.includes('SERVICES_MENU'));
    const copyMenu = allmenus.find(menu => menu.locations.includes('COPY_MENU'));
    // Base URL to remove
    const baseUrl = 'https://finance.uiexpertz.com/';

    // Function to remove base URL
    const removeBaseUrl = (url) => url.replace(baseUrl, '');


    const date = new Date();
    const year = date.getFullYear();

    return (
        <>
            <NewsLetter />
            <div className="footer pt-5">
                <div className="footer-top">
                    <div className="container py-5">
                        <div className="row footer-grid">
                            <div className="col-12  col-md-4 grid-item">
                                <Link href="/" className="brand-logo logo is-active-mobile" >
                                    <Image src={FooterLogo} alt="footer Logo" className="img-fluid" width={143} height={66} />
                                </Link>
                                <p className='footer-desc mt-5 fc-white pe-md-5'>{settings.description}</p>
                                <ul className="socialmedia my-5">
                                    <li className="mb-2"><Link href={settings.fbUrl} rel="noopener noreferrer" target="_blank"> <FaFacebookF /></Link></li>
                                    <li className="mb-2"><Link href={settings.xUrl} rel="noopener noreferrer" target="_blank"> <FaXTwitter /></Link></li>
                                    <li className="mb-2"><Link href={settings.instaUrl} rel="noopener noreferrer" target="_blank"> <FaInstagram /></Link></li>
                                    <li className="mb-2"><Link href={settings.prinUrl} rel="noopener noreferrer" target="_blank"> <FaPinterestP /></Link></li>
                                </ul>
                            </div>

                            {/* Services Menu */}
                            <div id='servicemenu' className="col-6 col-md-2 grid-item">
                                <h3 className='footerWidgateTitle'>{servicesMenu?.name || "Services"}</h3>
                                <ul>
                                    {servicesMenu?.menuItems.nodes.map(item => (
                                        <li key={item.id}>
                                            <Link href={removeBaseUrl(item.url)}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company Menu */}
                            <div id='companymenu' className="col-6  col-md-3 grid-item">
                                <h3 className='footerWidgateTitle'>{companyMenu?.name || "Company"}</h3>
                                <ul>
                                    {companyMenu?.menuItems.nodes.map(item => (
                                        <li key={item.id}>
                                            <Link href={`/page/${removeBaseUrl(item.url)}`}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="col-6 col-xl-3 col-md-4 grid-item mt-5 mt-mb-0">
                                <div className="footer-widget mb-4 wow fadeInDown">
                                    <h6 className="footerWidgateTitle">{"Contact us"}</h6>
                                    <ul className='contactus-wrwpper'>
                                        <li>
                                            <span className='svgicon'>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.07771 6.9235C3.89107 5.73588 2.75544 4.35994 3.29926 3.81602C4.0771 3.03802 4.75517 2.55787 3.37577 0.841329C1.99711 -0.874463 1.0775 0.443703 0.324417 1.19769C-0.545682 2.06797 0.277912 5.31199 3.48303 8.5185C6.68889 11.7243 9.93226 12.5458 10.8024 11.6748C11.5569 10.9208 12.8741 10.0055 11.1587 8.62654C9.44321 7.24685 8.96315 7.92432 8.18456 8.70381C7.64075 9.24549 6.26509 8.11038 5.07771 6.9235Z" fill="#F8952C" />
                                                </svg> </span>
                                            <Link href={`tel:${settings.supportPhone}`}>Hotline: {settings.supportPhone}</Link>
                                        </li>
                                        <li>
                                            <span className='svgicon'>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8153 0.194146C15.7252 0.1046 15.6114 0.042601 15.4872 0.0154398C15.3631 -0.0117214 15.2337 -0.00291591 15.1144 0.0408209L0.430735 5.37388C0.3041 5.42185 0.195075 5.50717 0.118139 5.6185C0.0412041 5.72983 0 5.86191 0 5.99718C0 6.13246 0.0412041 6.26453 0.118139 6.37586C0.195075 6.48719 0.3041 6.57251 0.430735 6.62048L6.16405 8.90703L10.3956 4.66725L11.3367 5.6072L7.08512 9.85365L9.38112 15.58C9.43058 15.7041 9.51619 15.8104 9.62686 15.8853C9.73753 15.9602 9.86817 16.0001 10.0018 16C10.1367 15.9972 10.2676 15.9537 10.3772 15.8752C10.4868 15.7966 10.57 15.6868 10.6159 15.56L15.9554 0.894111C16.0009 0.776167 16.0119 0.647743 15.987 0.523812C15.9622 0.39988 15.9026 0.285548 15.8153 0.194146Z" fill="#F8952C"/>
</svg>

                                            </span>
                                            <Link href={`mailto:${settings.supportEmail}`}>Support: {settings.supportEmail}</Link>
                                        </li>
                                        <li>
                                            <span className='svgicon'>
                                                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.00001 0C2.23859 0 0 2.36275 0 5.27735C0 6.25206 0.180758 7.25878 0.699479 7.98438L5.00001 14L9.30052 7.98438C9.77168 7.32533 10 6.16022 10 5.27735C10 2.36275 7.76142 0 5.00001 0ZM5.00001 3.05651C6.16191 3.05651 7.10411 4.05099 7.10411 5.27733C7.10411 6.5037 6.16191 7.49817 5.00001 7.49817C3.8381 7.49817 2.8959 6.5037 2.8959 5.27735C2.8959 4.05099 3.8381 3.05651 5.00001 3.05651Z" fill="#F8952C" />
                                                </svg>
                                            </span>
                                            <p>Address: {settings.supportAddress}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="footer-bottom py-4">
                    <div className="container">
                        <div className="row">
                            <div className='col-12 col-md-5 order-2 order-md-1 copytext'>
                                <span>Copyright © {year} Finance. All Rights Reserved.</span>
                            </div>

                            <div className='col-12 col-md-7 order-1 order-md-2 '>
                                <ul className='copymenu'>
                                    {copyMenu?.menuItems.nodes.map(item => (
                                        <li key={item.id}>
                                            <Link href={`/page/${removeBaseUrl(item.url)}`}>{item.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

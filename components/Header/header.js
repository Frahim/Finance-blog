"use client"
import React, { useState } from 'react';
import TopHeader from './topbar'

import Link from 'next/link'
import Image from 'next/image'
import logo from '../../app/image/logo.svg'


export default  function Header() {
   
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <TopHeader />
            <div className="header py-2 bg-gray3">
                <div className="container">
                    <div className='row align-items-center justify-content-between'>
                        <div className='col-md-3 col-6'>
                            <Link href="/" className="brand-logo logo is-active-mobile">
                                <Image src={logo} alt="img" className="img-fluid" width={119} height={66} />
                            </Link>
                        </div>
                        <div className='col-2 col-md-6'>
                            <nav className="navigation py-3 py-md-4 bg-white">
                                <div className="container">
                                    <div className="nav-grid-container d-flex d-md-block align-items-center justify-content-between gap-3">
                                        <button
                                            className="btn btn-menu-toggle btn-default d-flex d-md-none align-items-center justify-content-center" onClick={toggleMobileMenu}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff5f50" className="bi bi-list"
                                                viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                            </svg>
                                        </button>

                                        <div className={`navbar px-3 py-4 py-md-0 px-md-0 ${isMobileMenuOpen ? 'show' : ''}`}>
                                           
                                            <ul id="menu" className="d-md-flex align-items-center justify-content-between m-0 p-0 gap-5 w-100">
                                                <li><Link href="/pages/finance" className=" ff-inter navLink">Finance</Link></li>
                                                <li><Link href="/pages/quizzes" className="menuLink ff-inter navLink">Quizzes</Link></li>
                                                <li><Link href="/pages/surveys" className="menuLink ff-inter navLink">Surveys</Link></li>
                                                <li><Link href="/pages/galleries" className="menuLink ff-inter navLink">Galleries</Link></li>
                                                <li>
                                                    <div className="dropdown">
                                                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Category
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><Link className="dropdown-item" href="/category/wealth-management">Wealth Management</Link></li>
                                                            <li><Link className="dropdown-item" href="/category/saving-loan">Saving & Loan</Link></li>
                                                            <li><Link className="dropdown-item" href="/category/mutual-funds">Mutual Funds</Link></li>
                                                            <li><Link className="dropdown-item" href="/category/insurance">Insurance</Link></li>
                                                            <li><Link className="dropdown-item" href="/category/banking">Banking</Link></li>
                                                            <li><Link className="dropdown-item" href="/category/accountancy">Accountancy</Link></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>

                        </div>
                        <div className="header-grid-container align-items-center gap-3 col-md-3 d-none d-md-block">

                            <div className="grid-item d-flex align-items-center justify-content-center justify-content-sm-end gap-3">
                                {/* <Link href="/" className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="20" fill="#F2F2F2" />
                                        <path d="M26.8223 24.248L24.2832 21.709C24.1562 21.6074 24.0039 21.5312 23.8516 21.5312H23.4453C24.1309 20.6426 24.5625 19.5254 24.5625 18.2812C24.5625 15.3867 22.1758 13 19.2812 13C16.3613 13 14 15.3867 14 18.2812C14 21.2012 16.3613 23.5625 19.2812 23.5625C20.5 23.5625 21.6172 23.1562 22.5312 22.4453V22.877C22.5312 23.0293 22.582 23.1816 22.709 23.3086L25.2227 25.8223C25.4766 26.0762 25.8574 26.0762 26.0859 25.8223L26.7969 25.1113C27.0508 24.8828 27.0508 24.502 26.8223 24.248ZM19.2812 21.5312C17.4785 21.5312 16.0312 20.084 16.0312 18.2812C16.0312 16.5039 17.4785 15.0312 19.2812 15.0312C21.0586 15.0312 22.5312 16.5039 22.5312 18.2812C22.5312 20.084 21.0586 21.5312 19.2812 21.5312Z" fill="#111111" />
                                    </svg>
                                </Link> */}


                                <Link rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/" className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none">
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.49609 14.75H5.06641V8.48828H7.0625L7.39062 6H5.06641V4.27734C5.06641 3.89453 5.12109 3.59375 5.28516 3.40234C5.44922 3.18359 5.80469 3.07422 6.29688 3.07422H7.60938V0.859375C7.11719 0.804688 6.46094 0.75 5.69531 0.75C4.71094 0.75 3.94531 1.05078 3.37109 1.625C2.76953 2.19922 2.49609 2.99219 2.49609 4.03125V6H0.390625V8.48828H2.49609V14.75Z" fill="#111111" />
                                    </svg>
                                </Link>
                                <Link rel="noopener noreferrer" target="_blank" href="https://x.com/" className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none">
                                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5508 2.90625C13.0977 2.49609 13.5898 2.00391 14 1.40234C13.4531 1.64844 12.9062 1.8125 12.3594 1.86719C12.9609 1.48438 13.3984 0.964844 13.6172 0.28125C13.043 0.609375 12.4414 0.855469 11.7852 0.964844C11.5117 0.691406 11.1836 0.472656 10.8281 0.308594C10.4727 0.144531 10.0898 0.0625 9.67969 0.0625C9.16016 0.0625 8.69531 0.199219 8.25781 0.445312C7.82031 0.71875 7.46484 1.07422 7.21875 1.51172C6.94531 1.94922 6.83594 2.44141 6.83594 2.93359C6.83594 3.15234 6.83594 3.37109 6.89062 3.58984C5.71484 3.53516 4.62109 3.26172 3.58203 2.71484C2.54297 2.19531 1.69531 1.48438 0.984375 0.582031C0.710938 1.04688 0.574219 1.53906 0.574219 2.03125C0.574219 2.52344 0.683594 2.98828 0.929688 3.39844C1.14844 3.83594 1.47656 4.16406 1.85938 4.4375C1.39453 4.4375 0.957031 4.30078 0.574219 4.05469V4.10938C0.574219 4.79297 0.792969 5.39453 1.23047 5.91406C1.66797 6.46094 2.21484 6.78906 2.87109 6.92578C2.59766 6.98047 2.35156 7.00781 2.10547 7.00781C1.94141 7.00781 1.75 7.00781 1.58594 6.98047C1.75 7.55469 2.07812 8.01953 2.57031 8.40234C3.0625 8.78516 3.60938 8.94922 4.26562 8.94922C3.19922 9.76953 1.99609 10.1797 0.683594 10.1797C0.410156 10.1797 0.191406 10.1797 0 10.1523C1.3125 11.0273 2.78906 11.4375 4.40234 11.4375C6.07031 11.4375 7.54688 11.0273 8.85938 10.1523C10.0352 9.38672 10.9648 8.375 11.6211 7.0625C12.25 5.85938 12.5781 4.57422 12.5781 3.26172C12.5781 3.09766 12.5508 2.98828 12.5508 2.90625Z" fill="#111111" />
                                    </svg>
                                </Link>
                                <Link rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/" className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none">
                                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 3.60547C7.04688 3.60547 7.56641 3.76953 8.05859 4.04297C8.55078 4.31641 8.93359 4.69922 9.20703 5.19141C9.48047 5.68359 9.64453 6.20312 9.64453 6.75C9.64453 7.32422 9.48047 7.84375 9.20703 8.33594C8.93359 8.82812 8.55078 9.21094 8.05859 9.48438C7.56641 9.75781 7.04688 9.89453 6.5 9.89453C5.92578 9.89453 5.40625 9.75781 4.91406 9.48438C4.42188 9.21094 4.03906 8.82812 3.76562 8.33594C3.49219 7.84375 3.35547 7.32422 3.35547 6.75C3.35547 6.20312 3.49219 5.68359 3.76562 5.19141C4.03906 4.69922 4.42188 4.31641 4.91406 4.04297C5.40625 3.76953 5.92578 3.60547 6.5 3.60547ZM6.5 8.80078C7.04688 8.80078 7.53906 8.60938 7.94922 8.19922C8.33203 7.81641 8.55078 7.32422 8.55078 6.75C8.55078 6.20312 8.33203 5.71094 7.94922 5.30078C7.53906 4.91797 7.04688 4.69922 6.5 4.69922C5.92578 4.69922 5.43359 4.91797 5.05078 5.30078C4.64062 5.71094 4.44922 6.20312 4.44922 6.75C4.44922 7.32422 4.64062 7.81641 5.05078 8.19922C5.43359 8.60938 5.92578 8.80078 6.5 8.80078ZM10.5195 3.46875C10.5195 3.27734 10.4375 3.11328 10.3008 2.94922C10.1367 2.8125 9.97266 2.73047 9.78125 2.73047C9.5625 2.73047 9.39844 2.8125 9.26172 2.94922C9.09766 3.11328 9.04297 3.27734 9.04297 3.46875C9.04297 3.6875 9.09766 3.85156 9.26172 3.98828C9.39844 4.15234 9.5625 4.20703 9.78125 4.20703C9.97266 4.20703 10.1367 4.15234 10.2734 3.98828C10.4102 3.85156 10.4922 3.6875 10.5195 3.46875ZM12.5977 4.20703C12.5977 4.72656 12.625 5.57422 12.625 6.75C12.625 7.95312 12.5977 8.80078 12.5703 9.32031C12.543 9.83984 12.4609 10.2773 12.3516 10.6602C12.1875 11.125 11.9141 11.5352 11.5859 11.8633C11.2578 12.1914 10.8477 12.4375 10.4102 12.6016C10.0273 12.7383 9.5625 12.8203 9.04297 12.8477C8.52344 12.875 7.67578 12.875 6.5 12.875C5.29688 12.875 4.44922 12.875 3.92969 12.8477C3.41016 12.8203 2.97266 12.7383 2.58984 12.5742C2.125 12.4375 1.71484 12.1914 1.38672 11.8633C1.05859 11.5352 0.8125 11.125 0.648438 10.6602C0.511719 10.2773 0.429688 9.83984 0.402344 9.32031C0.375 8.80078 0.375 7.95312 0.375 6.75C0.375 5.57422 0.375 4.72656 0.402344 4.20703C0.429688 3.6875 0.511719 3.22266 0.648438 2.83984C0.8125 2.40234 1.05859 1.99219 1.38672 1.66406C1.71484 1.33594 2.125 1.0625 2.58984 0.898438C2.97266 0.789062 3.41016 0.707031 3.92969 0.679688C4.44922 0.652344 5.29688 0.625 6.5 0.625C7.67578 0.625 8.52344 0.652344 9.04297 0.679688C9.5625 0.707031 10.0273 0.789062 10.4102 0.898438C10.8477 1.0625 11.2578 1.33594 11.5859 1.66406C11.9141 1.99219 12.1875 2.40234 12.3516 2.83984C12.4609 3.22266 12.543 3.6875 12.5977 4.20703ZM11.2852 10.3594C11.3945 10.0586 11.4492 9.56641 11.5039 8.88281C11.5039 8.5 11.5312 7.92578 11.5312 7.1875V6.3125C11.5312 5.57422 11.5039 5 11.5039 4.61719C11.4492 3.93359 11.3945 3.44141 11.2852 3.14062C11.0664 2.59375 10.6562 2.18359 10.1094 1.96484C9.80859 1.85547 9.31641 1.80078 8.63281 1.74609C8.22266 1.74609 7.64844 1.71875 6.9375 1.71875H6.0625C5.32422 1.71875 4.75 1.74609 4.36719 1.74609C3.68359 1.80078 3.19141 1.85547 2.89062 1.96484C2.31641 2.18359 1.93359 2.59375 1.71484 3.14062C1.60547 3.44141 1.52344 3.93359 1.49609 4.61719C1.46875 5.02734 1.46875 5.60156 1.46875 6.3125V7.1875C1.46875 7.92578 1.46875 8.5 1.49609 8.88281C1.52344 9.56641 1.60547 10.0586 1.71484 10.3594C1.93359 10.9336 2.34375 11.3164 2.89062 11.5352C3.19141 11.6445 3.68359 11.7266 4.36719 11.7539C4.75 11.7812 5.32422 11.7812 6.0625 11.7812H6.9375C7.67578 11.7812 8.25 11.7812 8.63281 11.7539C9.31641 11.7266 9.80859 11.6445 10.1094 11.5352C10.6562 11.3164 11.0664 10.9062 11.2852 10.3594Z" fill="#111111" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

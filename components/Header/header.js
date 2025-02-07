"use client"
import React, { useState } from 'react';
import TopHeader from './topbar'

import Link from 'next/link'
import Image from 'next/image'
import logo from '../../app/image/logo.svg'

import Socialmedia from './socialmedia';

export default  function Header() {
   //const settings = await generalSettings();
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
                                <div className="container-off">
                                    <div className="nav-grid-container d-flex d-md-block align-items-center justify-content-between gap-3">
                                        <button
                                            className="btn btn-menu-toggle btn-default d-flex d-md-none align-items-center justify-content-center" onClick={toggleMobileMenu}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#ff5f50" className="bi bi-list"
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
                             <Socialmedia/> 
                             {/* update */}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

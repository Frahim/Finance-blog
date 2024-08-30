// pages/contact.js
import ContactForm from '../../components/ContactForm';
import Titlebg from '../image/defolt-titlebg.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeadset, FaEnvelopeOpenText, FaMapMarkedAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import generalSettings from '../../Libary/GetGeneralSetting'

export default async function Contact() {
    const settings = await generalSettings();
    return (
        <>
            <div className="post_title">
                <div className="overlayer"></div>
                <Image src={Titlebg} width={1900} height={260} className="card-Image-top Image-fluid" alt="Title BG" />
                <h2 className="ptitle">Contact US</h2>
            </div>

            <section className="contactUs pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="contact_inner">
                                <div className="row">
                                    <div className="col-md-9 col-12">
                                        <div className="contact_form_inner">
                                            <div className="contact_field">
                                                <h3>Contatc Us</h3>
                                                <p>Feel Free to contact us any time. We will get back to you as soon as we can!.</p>
                                                <ContactForm />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-12">
                                        <div class="right_conatct_social_icon d-flex align-items-end">
                                            <div class="socil_item_inner d-flex">
                                                <li><Link href={settings.fbUrl} rel="noopener noreferrer" target="_blank"> <FaFacebookF /></Link></li>
                                                <li><Link href={settings.xUrl} rel="noopener noreferrer" target="_blank"> <FaXTwitter /></Link></li>
                                                <li><Link href={settings.instaUrl} rel="noopener noreferrer" target="_blank"> <FaInstagram /></Link></li>
                                                <li><Link href={settings.prinUrl} rel="noopener noreferrer" target="_blank"> <FaPinterestP /></Link></li>
                                            </div> 
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="contact_info_sec">
                                    <h4>Contact Info</h4>

                                    <div className="d-flex info_single align-items-center">
                                        <FaHeadset />
                                        <span><Link className='fc-white' href={`tel:${settings.supportPhone}`}>Hotline: {settings.supportPhone}</Link></span>
                                    </div>
                                    <div className="d-flex info_single align-items-center">
                                        <FaEnvelopeOpenText />
                                        <span><Link className='fc-white' href={`mailto:${settings.supportEmail}`}>Support: {settings.supportEmail}</Link></span>
                                    </div>
                                    <div className="d-flex info_single align-items-center">
                                        <FaMapMarkedAlt />
                                        <span>Address: {settings.supportAddress}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

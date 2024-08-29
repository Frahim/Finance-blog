import React from 'react'
import Link from 'next/link'

export default function Contact_cta() {
    return (
        <div className='contact_wrapper'>
            <div className='container'>
                <div className='row'>
                <div className='col-md-9 col-12'>
                    <h3 className='cta_text'>Looking for a Best Business Plan Consultant?</h3>
                </div>
                <div className='col-md-3 col-12 contact_now'>
                    <Link href='/pages/contact'>Contact Now</Link>
                </div>
                </div>
            </div>

        </div>
    )
}

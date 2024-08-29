import React from 'react'
import Image from 'next/image'
import langu from '../../app/image/language.png'

export default function LanguageSwitcher() {
  return (
    <div>
       <Image src={langu} width={70} height={18} className="card-Image-top Image-fluid" alt="card" />
    </div>
  )
}

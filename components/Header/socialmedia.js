import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialPintarest } from "react-icons/sl";
import generalSettings from "../../Libary/GetGeneralSetting";

export default function SocialMedia() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await generalSettings();
      setSettings(data);
    }
    fetchSettings();
  }, []);

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="socialicon grid-item d-flex align-items-center justify-content-center justify-content-sm-end gap-3">
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={settings.fbUrl}
        className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none"
      >
        <FiFacebook />
      </Link>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={settings.xUrl}
        className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none"
      >
        <FaXTwitter />
      </Link>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={settings.instaUrl}
        className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none"
      >
        <FaInstagram />
      </Link>
      <Link
        rel="noopener noreferrer"
        target="_blank"
        href={settings.prinUrl}
        className="fs-12 fw-semiBold text-dark1 ff-inter text-uppercase text-decoration-none"
      >
        <SlSocialPintarest />
      </Link>
    </div>
  );
}

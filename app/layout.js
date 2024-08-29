import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import Script from 'next/script';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import '@fontsource/poppins'; // Import Poppins font
import '@fontsource/lato'; // Import Lato font

// Metadata is now defined directly in the component
export const metadata = {
  title: 'Finance News',
  description: 'headless wordpress with nextjs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" />
    </html>
  );
}

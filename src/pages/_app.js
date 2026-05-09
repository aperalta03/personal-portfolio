import { Geist, Geist_Mono } from 'next/font/google';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/Layout';

const geist = Geist({ subsets: ['latin'], variable: '--sans', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--mono', display: 'swap' });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <div className={`${geist.variable} ${geistMono.variable}`}>
      <Layout>
        <div key={router.asPath} className="pageEnter">
          <Component {...pageProps} />
        </div>
      </Layout>
    </div>
  );
}

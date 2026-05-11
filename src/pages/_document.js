import { Html, Head, Main, NextScript } from 'next/document';

const introCheckScript = `
try {
  var p = window.location.pathname;
  var isHome = p === '/' || p === '/index.html' || p === '';
  if (isHome) {
    document.documentElement.classList.add('intro-active', 'intro-splash');
  } else {
    document.documentElement.classList.add('intro-active', 'intro-bar');
  }
} catch (e) {}
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: introCheckScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

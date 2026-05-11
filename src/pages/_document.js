import { Html, Head, Main, NextScript } from 'next/document';

const introCheckScript = `
try {
  if (sessionStorage.getItem('intro-played')) {
    document.documentElement.classList.add('intro-played');
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

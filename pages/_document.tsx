import React from "react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='pl'>
        <Head>
          {/* eslint-disable react/no-danger */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "(function(w,l){" +
                "w[l] = w[l] || [];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});" +
                "})(window,'dataLayer');",
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

import Document, { Html, Head, Main, NextScript, DocumentContext} from 'next/document';
// Import styled components ServerStyleSheet
import {ServerStyleSheet} from 'styled-components';
import React from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const {renderPage} = ctx

    const initialPropsProps = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page,...initialPropsProps, styleTags }
  }
  render() {
    return (
      <Html>
        <Head>
          {(this.props as any).styleTags}
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
        <div id="modal-root-display"/>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

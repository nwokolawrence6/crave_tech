import Head from 'next/head';
import React from 'react';
import Apollo from '../client/util/apollo'
import NextNProgress from 'nextjs-progressbar';
import 'semantic-ui-css/semantic.min.css'
import 'rc-pagination/assets/index.css'
function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
    return (
        <>
          <Head>
            <title>Crave tech</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Crave Tech" />
            <meta name="theme-color" content="#000000" />
            {/* Required meta tags */}
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          </Head>
          <NextNProgress
            color="#000"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </>
    )
}
const MainContainer = ( props: JSX.IntrinsicAttributes & { Component: any; pageProps: any; }) => {
  return <Apollo><MyApp {...props}/></Apollo>
}
export default MainContainer;

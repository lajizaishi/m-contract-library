import React from "react";
import Head from 'next/head'
import { compose } from "recompose";

import Navigation from "../Navigation";
import withAuthentication from "../Session/withAuthentication";
import withAuthorization from "../Session/withAuthorization";

const App = ({ children }) => (
<>
    <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
        <meta name="renderer" content="webkit|ie-comp|ie-stand"/>
        <meta name="renderer" content="webkit"/>
        <meta name="renderer" content="ie-comp"/>
        <meta name="renderer" content="ie-stand"/>
        <meta name="baidu-site-verification" content=""/>
        <meta name="360-site-verification" content=""/>
        <meta name="x5-orientation" content="portrait"/>
        <meta name="Keywords" content=""/>
        <meta name="description" content=""/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="screen-orientation" content="portrait"/>
        <meta name="x5-fullscreen" content="true"/>
        <meta name="screen-orientation" content="portrait"/>
        <meta name="full-screen" content="yes"/>
        <meta name="x5-page-mode" content="app"/>
        <meta name="x5-orientation" content="portrait"/>
        <meta name="screen-orientation" content="portrait"/>
        <meta name="full-screen" content="yes"/>
        <meta name="browsermode" content="application"/>
        <meta name="x5-orientation" content="portrait"/>
        <meta name="x5-fullscreen" content="true"/>
        <meta name="x5-page-mode" content="app"/>
        <meta name="HandheldFriendly" content="true"/>
        <meta name="MobileOptimized" content="320"/>
        <title>找律师</title>
        <link rel="shortcut icon" href="/favicon.ico"/>

    </Head>
    <div className="app">
        {/*导航头组件*/}
        {/*<Navigation />*/}
        {children}
        <style jsx>{`
     
    `}</style>
    </div>
</>
);
const AppWithAuthentication = compose(
  withAuthentication,
  withAuthorization(false)
)(App);
const AppWithAuthorization = compose(
  withAuthentication,
  withAuthorization(true)
)(App);
export { AppWithAuthentication, AppWithAuthorization };

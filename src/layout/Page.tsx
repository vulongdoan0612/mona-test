import Head from "next/head";
import React, { useMemo } from "react";
import Header from "../components/Header";

interface PropsPage {
  children: React.ReactNode;
  style?: any;
  title?: string;
  setSpin?: any;
  setResult?: any;
}

const Page = (props: PropsPage) => {
  const { children, style, title, setSpin, setResult } = props;
  const page = useMemo(() => {
    return <>{children}</>;
  }, [children]);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="page" id="page" style={style}>
        <Header setSpin={setSpin} setResult={setResult}></Header>
        {page}
      </div>
    </>
  );
};
export default Page;

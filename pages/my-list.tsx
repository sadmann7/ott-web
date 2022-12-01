import { NextPage } from "next";
import Head from "next/head";
import React from "react";

// components import
import Layout from "@/components/Layout";

const MyList: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>My List | OTT-Platform</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
        <h1 className="text-white text-2xl md:text-3xl font-semibold">
          My List Page
        </h1>
        <p className="text-gray-300/60 text-sm md:text-base">
          under construction, please visit later
        </p>
      </div>
    </Layout>
  );
};

export default MyList;

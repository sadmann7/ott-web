import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const TVShows: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TV Shows | OTT-Web</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-2">
        <h1 className="text-white text-2xl md:text-3xl font-semibold">
          TV Shows Page
        </h1>
        <p className="text-gray-300/60 text-sm md:text-base">
          under construction, please visit later
        </p>
      </div>
    </div>
  );
};

export default TVShows;

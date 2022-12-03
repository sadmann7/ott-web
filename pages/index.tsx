import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

// components import
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Row from "@/components/Row";
import Modal from "@/components/Modal";

// requests, hooks, stores, and types import
import requests from "@/utils/requests";
import { useAuth } from "@/contexts/AuthProvider";
import { useModalStore } from "@/stores/useModalStore";
import { Movie } from "@/types/types";

type HomeProps = {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
};

const Home: NextPage<HomeProps> = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}) => {
  const { isLoading } = useAuth();
  const { isOpen, toggleModal } = useModalStore((state) => state);

  if (isLoading) return null;

  return (
    <Layout>
      <Head>
        <title>OTT-Platform</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {isOpen && <Modal isOpen={isOpen} toggleModal={toggleModal} />}
      <main className="mb-16">
        <Hero movies={netflixOriginals} />
        <div className="w-full space-y-10">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </div>
      </main>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

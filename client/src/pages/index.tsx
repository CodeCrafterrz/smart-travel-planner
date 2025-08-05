// src/pages/index.tsx

import { Geist, Geist_Mono } from "next/font/google";
import { GetServerSideProps } from "next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5000"); // Backend endpoint
  const data = await res.json();

  return {
    props: {
      messageFromServer: data.message,
    },
  };
};

export default function Home({ messageFromServer }: { messageFromServer: string }) {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-xl font-bold text-center">{messageFromServer}</h1>
      </main>
    </div>
  );
}

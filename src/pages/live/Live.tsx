import Layout from "@components/Layout";
import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <Layout title="라이브" hasTapBar>
      <div className="divide-y-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <div key={v} className="px-4 py-4">
            <div className="w-full bg-slate-300 aspect-video" />
            <h3 className="font-semibold text-gray-700 mt-3">
              Let&apos;s try potatos
            </h3>
          </div>
        ))}
        <button className="fixed bottom-20 right-6 rounded-full p-3 bg-orange-400 text-white font-bold hover:bg-orange-500 shadow-lg transition border-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Live;

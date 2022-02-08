import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-20 grid gap-28 justify-center min-h-screen">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-80">
        <span className="text-2xl font-bold">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between my-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="p-3 bg-blue-400 text-center text-white font-semibold w-44 rounded-lg mx-auto">
          Checkout
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden group">
        <div>
          <div className="bg-blue-500 p-6 pb-14">
            <span className="text-white font-semibold text-2xl">Profile</span>
          </div>
          <div className="flex justify-between p-3 rounded-3xl bg-white -translate-y-5">
            <div className="flex flex-col items-center">
              <span className="text-gray-500">Order</span>
              <span className="font-semibold text-sm">340</span>
            </div>
            <div className="w-20 h-20 bg-red-400 rounded-full -translate-y-12 group-hover:bg-red-700" />
            <div className="flex flex-col items-center">
              <span className="text-gray-500">Order</span>
              <span className="font-semibold text-sm">$340</span>
            </div>
          </div>
          <div className="flex flex-col items-center -translate-y-14 -mb-8">
            <span className="font-semibold">김연구</span>
            <span className="text-gray-500">한국</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl">
        <div>
          <div>
            <span>←</span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

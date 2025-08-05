// src/pages/index.tsx
import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { GetServerSideProps } from "next";
import { useState } from "react";
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

export default function Home() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    preference: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Planning trip with:', formData);
    // later: send this to your backend API
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 px-4">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">AI Smart Travel Planner 🧠✈️</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter destination"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Preferences</label>
             <input
                     type="text"
                     name="preference"
                     value={formData.preference}
                     onChange={handleChange}
                     placeholder="e.g., beaches, adventure, local food"
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Plan My Trip 🚀
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
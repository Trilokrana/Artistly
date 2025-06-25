"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("artistSubmissions");
    if (stored) {
      setArtists(JSON.parse(stored));
    }
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Singer: "bg-pink-100 text-pink-700",
      Musician: "bg-blue-100 text-blue-700",
      Band: "bg-purple-100 text-purple-700",
      DJ: "bg-amber-100 text-amber-700",
      Dancer: "bg-emerald-100 text-emerald-700",
    };
    return colors[category] || "bg-violet-100 text-violet-700";
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16 text-slate-800 mt-15">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-amber-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎤 Artist Dashboard
      </motion.h1>

      {artists.length === 0 ? (
        <motion.p
          className="text-center text-base sm:text-lg text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No submissions yet.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 relative"
              variants={item}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-2xl"></div>
              <h2 className="text-lg font-semibold mb-1 truncate">
                {artist.name}
              </h2>
              <p className="text-sm text-slate-500 mb-3 truncate">
                📍 {artist.location}
              </p>

              <p className="text-sm text-slate-700 italic mb-4 line-clamp-3">
                {artist.bio}
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center bg-gradient-to-r from-violet-100 to-fuchsia-100 px-3 py-2 rounded-lg">
                  <span className="text-violet-700 font-medium">Fee:</span>
                  <span className="text-indigo-700 font-semibold">
                    {artist.feeRange}
                  </span>
                </div>

                <div>
                  <p className="font-medium text-slate-600 mb-1">Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {artist.category.map((cat) => (
                      <span
                        key={cat}
                        className={`${getCategoryColor(
                          cat
                        )} px-3 py-1 rounded-full text-xs sm:text-sm`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-slate-600 mb-1">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {artist.languages.map((lang) => (
                      <span
                        key={lang}
                        className="bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;

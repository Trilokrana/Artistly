"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { dummyArtists } from "../data";

export default function Page() {
  const [artists, setArtists] = useState(dummyArtists);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const urlCategoryFilter = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const categories = [
    ...new Set(dummyArtists.map((artist) => artist.categoryName)),
  ];
  const locations = [...new Set(dummyArtists.map((artist) => artist.location))];
  const priceRanges = [
    ...new Set(dummyArtists.map((artist) => artist.priceRange)),
  ];

  useEffect(() => {
    if (urlCategoryFilter && !isNaN(Number(urlCategoryFilter))) {
      const categoryItem = dummyArtists.find(
        (artist) => artist.categoryId === Number(urlCategoryFilter)
      );
      if (categoryItem) {
        setSelectedCategory(categoryItem.categoryName);
      }
    }
  }, [urlCategoryFilter]);

  useEffect(() => {
    const fetchArtists = () => {
      setLoading(true);

      setTimeout(() => {
        let filteredArtists = dummyArtists;

        if (urlCategoryFilter && !isNaN(Number(urlCategoryFilter))) {
          filteredArtists = filteredArtists.filter(
            (artist) => artist.categoryId === Number(urlCategoryFilter)
          );
        } else if (selectedCategory) {
          filteredArtists = filteredArtists.filter(
            (artist) => artist.categoryName === selectedCategory
          );
        }

        if (selectedLocation) {
          filteredArtists = filteredArtists.filter(
            (artist) => artist.location === selectedLocation
          );
        }

        if (selectedPriceRange) {
          filteredArtists = filteredArtists.filter(
            (artist) => artist.priceRange === selectedPriceRange
          );
        }

        setArtists(filteredArtists);
        setLoading(false);
      }, 500);
    };

    fetchArtists();
  }, [
    urlCategoryFilter,
    selectedCategory,
    selectedLocation,
    selectedPriceRange,
  ]);

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setSelectedPriceRange("");
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-yellow-300 px-4 py-1">
              {selectedCategory || "All Artists"}
            </span>
          </h1>
          <p className="text-lg">Find the perfect talent for your next event</p>
        </div>
        {/* Filter section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Filter Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">All Price Ranges</option>
                {priceRanges.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-300"
          >
            Reset Filters
          </button>
        </div>

        {/* Loading state when artists found */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No artists found</h2>
            <p className="mt-4">
              Please try different filter options or reset filters.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
          >
            {artists.map((artist) => (
              <motion.div
                key={artist.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                {/* Artist cards mapped*/}
                <div className="relative h-56">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{artist.name}</h2>
                  <div className="mb-4 space-y-2">
                    <p className="flex items-center text-sm">
                      <span className="bg-yellow-100 px-2 py-1 rounded-md">
                        {artist.categoryName}
                      </span>
                    </p>
                    <p className="flex items-center text-sm">
                      💰 {artist.priceRange}
                    </p>
                    <p className="flex items-center text-sm">
                      📍 {artist.location}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4"
                  >
                    <Link href={`/quote?artist=${artist.id}`}>
                      <span className="block w-full bg-black text-white py-3 text-center rounded-md font-medium transition duration-300 hover:bg-yellow-400 hover:text-black">
                        {artist.ctaText}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}

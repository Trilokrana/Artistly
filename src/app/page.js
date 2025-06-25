"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import performer from "../../public/Images/artist.jpg";
import { dummyCategories } from "./data";

export default function Home() {
  const [categories, setCategories] = useState([]);

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Simulate API fetch with cleaner approach
    const fetchData = async () => {
      try {
        // In real app, replace with actual API call
        setTimeout(() => {
          setCategories(dummyCategories);
        }, 300);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-white text-gray-800 pt-16">
        <section className="py-8 sm:py-10 px-4 sm:px-6 lg:py-16 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <motion.div
              className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] md:h-[500px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-tr-4xl rounded-bl-4xl">
                <Image
                  src={performer}
                  alt="Performer on stage"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover", transform: "rotate(30deg)" }}
                  className="rounded-md"
                  priority
                  quality={90}
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-yellow-300 px-2 py-1">
                  WE ENGAGE TALENT,
                </span>
                <br />
                <span className="bg-yellow-300 px-2 py-1 mt-2 inline-block">
                  WITH PURPOSE
                </span>
              </h2>

              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                As one of India&apos; leading talent management companies, we curate
                the right-fit talent for meaningful engagement, entertainment,
                and endorsement; across genres, geographies, and platforms.
              </p>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Core offerings
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Talent, Performing Artists, Speakers and Entertainment solutions for events",
                    "Celebrities and Talent for brand endorsements and appearances",
                    "Influencers and Content Creators for Digital engagements and campaigns",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start sm:items-center gap-2 sm:gap-3"
                    >
                      <span className="bg-yellow-300 rounded-full h-6 w-6 flex-shrink-0 flex items-center justify-center mt-0.5 sm:mt-0">
                        ⚡
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center sm:text-left"
              >
                <Link href="/">
                  <span className="inline-block bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md cursor-pointer">
                    Read More
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Talent Categories */}
        <section className="py-10 sm:py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif">
                <span className="bg-yellow-300 px-3 sm:px-4 py-1 hover:bg-yellow-400 transition-colors duration-300">
                  TALENT CATEGORIES
                </span>
              </h2>
              <p className="text-base sm:text-lg mt-4 sm:mt-6 font-sans tracking-wide max-w-3xl mx-auto">
                Choose from an unparalleled list of talent options across a wide
                spectrum of genres
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
                hidden: {},
              }}
            >
              {categories?.map((category) => (
                <motion.div
                  key={category.id}
                  className="overflow-hidden rounded-none rounded-tr-3xl rounded-bl-3xl shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link href={`/artists?category=${category.id}`}>
                    <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center bg-white">
                      <h3 className="text-xs sm:text-sm font-semibold font-serif transition-all duration-300 hover:font-bold hover:text-amber-400">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Artist Exploration CTA */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          <div className="max-w-7xl mx-auto relative overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-40 sm:w-80 h-40 sm:h-80 opacity-10"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full border-4 border-yellow-300"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto px-2"
            >
              <motion.span
                className="inline-block text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 uppercase"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Discover incredible talent
              </motion.span>

              <motion.h2
                className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="bg-yellow-300 text-black px-2 sm:px-4 py-1 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  MEET OUR ARTISTS
                </span>
              </motion.h2>

              <motion.p
                className="text-base sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                From rising stars to established legends, connect with
                extraordinary talents across music, dance, comedy, and more.
                Find your perfect match for your next event.
              </motion.p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <Link href="/artists">
                  <span className="relative flex items-center justify-center gap-2 sm:gap-3 bg-black text-white px-6 sm:px-10 py-3 sm:py-5 rounded-md font-bold text-base sm:text-lg cursor-pointer shadow-xl">
                    Explore Artists
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

      
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="lg:w-2/3 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  <span className="bg-yellow-300 text-black px-3 sm:px-4 py-1">
                    READY TO COLLABORATE?
                  </span>
                </h2>
                <p className="text-base sm:text-lg mb-6">
                  Whether you are looking for the perfect talent for your event,
                  brand partnership, or digital campaign, our team of experts is
                  here to help you find the perfect match.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full lg:w-1/3 text-center"
              >
                <Link href="/onboard">
                  <span className="inline-block bg-yellow-300 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg cursor-pointer">
                    Get in Touch
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-6 px-4 text-center text-sm">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Artistly. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

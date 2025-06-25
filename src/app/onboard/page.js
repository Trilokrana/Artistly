"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FormField from "../components/FormField";

const categories = ["Singer", "Comedian", "DJ", "Dancer", "Speaker", "Actor"];
const languages = ["Hindi", "English", "Punjabi", "Tamil", "Telugu"];

const ArtistOnboardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    category: [],
    languages: [],
    feeRange: "",
    location: "",
    profileImage: null,
  });

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleCheckboxChange = (field, value) => {
    const updated = formData[field].includes(value)
      ? formData[field].filter((v) => v !== value)
      : [...formData[field], value];
    setFormData({ ...formData, [field]: updated });

    if (errors[field]) setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.bio) newErrors.bio = "Bio is required";
    if (formData.category.length === 0)
      newErrors.category = "Select at least one category";
    if (formData.languages.length === 0)
      newErrors.languages = "Select at least one language";
    if (!formData.feeRange) newErrors.feeRange = "Fee range is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      profileImage: formData.profileImage?.name || "N/A",
    };

    const existing = JSON.parse(
      localStorage.getItem("artistSubmissions") || "[]"
    );
    localStorage.setItem(
      "artistSubmissions",
      JSON.stringify([...existing, payload])
    );

    setSubmitted(true);
    setFormData({
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
      profileImage: null,
    });

    setTimeout(() => router.push("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-6 sm:py-10 px-3 sm:px-4 text-gray-800 mt-20">
      <h1 className="text-4xl font-bold mb-4 flex justify-center">
        <span className="bg-yellow-300 px-4 py-1">Artist Onboarding</span>
      </h1>
      <div className="max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto">
        <motion.div
          className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-amber-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <FormField
              label="Name*"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />

            <FormField
              label="Bio*"
              name="bio"
              value={formData.bio}
              error={errors.bio}
            >
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 text-sm sm:text-base border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
              />
            </FormField>

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium mb-1">
                Category*
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className={`w-full px-3 py-2 text-sm sm:text-base border rounded bg-white text-black text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <span className="truncate">
                    {formData.category.length > 0
                      ? formData.category.join(", ")
                      : "Select categories"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showCategoryDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showCategoryDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-amber-200 rounded shadow-lg max-h-48 overflow-auto">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center px-3 py-2 hover:bg-amber-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.category.includes(cat)}
                          onChange={() => handleCheckboxChange("category", cat)}
                          className="mr-2"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium mb-1">
                Languages Spoken*
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center space-x-2 text-black text-sm"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={formData.languages.includes(lang)}
                      onChange={() => handleCheckboxChange("languages", lang)}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
              {errors.languages && (
                <p className="text-red-500 text-xs mt-1">{errors.languages}</p>
              )}
            </div>

            <FormField
              label="Fee Range*"
              name="feeRange"
              value={formData.feeRange}
              onChange={handleInputChange}
              error={errors.feeRange}
            >
              <select
                id="feeRange"
                name="feeRange"
                value={formData.feeRange}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 text-sm sm:text-base border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  errors.feeRange ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Fee Range</option>
                <option value="₹1 - ₹5L">₹1 - ₹5L</option>
                <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                <option value="₹10L - ₹15L">₹10L - ₹15L</option>
                <option value="₹15L - ₹20L">₹15L - ₹20L</option>
                <option value="₹20L+">₹20L+</option>
              </select>
            </FormField>

            <FormField
              label="Location*"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
            />

            <div className="mb-4 sm:mb-6">
              <label className="block text-sm font-medium mb-1">
                Profile Image (Optional)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center cursor-pointer transition-colors ${
                  formData.profileImage
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-amber-400"
                }`}
              >
                <input
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
                <label htmlFor="profileImage" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    {formData.profileImage ? (
                      <>
                        <div className="mb-3 w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden border border-gray-300">
                          <img
                            src={URL.createObjectURL(formData.profileImage)}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-green-600 font-medium text-sm sm:text-base">
                          {formData.profileImage.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 mt-1">
                          Click or drag to replace
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs sm:text-sm font-medium">
                          Click to select or drag an image here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG or GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm sm:text-base font-medium transition-colors"
            >
              Submit Details
            </motion.button>
          </form>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 sm:mt-8 text-green-600 text-center text-base sm:text-lg font-semibold"
            >
              ✅ Thank you! Form submitted successfully.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistOnboardForm;

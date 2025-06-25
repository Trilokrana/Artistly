const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  children,
}) => (
  <div className="mb-4 sm:mb-6">
    <label htmlFor={name} className="block text-sm font-medium mb-1">
      {label}
      {label.endsWith("*") ? "" : "*"}
    </label>
    {children || (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 text-sm sm:text-base border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-amber-400 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormField;

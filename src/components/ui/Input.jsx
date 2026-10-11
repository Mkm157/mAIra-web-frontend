
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  error,
  required = false,
  autoComplete,
}) {
  const id = name || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div style={{ display: "grid", gap: 6, marginBottom: 16 }}>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 500 }}>
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        style={{
          padding: "12px",
          border: `1px solid ${error ? "#dc2626" : "#d1d5db"}`,
          borderRadius: 8,
          fontSize: 16,
          width: "100%",
          boxSizing: "border-box",
        }}
      />

      {error && (
        <span role="alert" style={{ color: "#dc2626", fontSize: 13 }}>
          {error}
        </span>
      )}
    </div>
  );
}

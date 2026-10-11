
export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
}) {
  const styles = {
    primary: {
      background: "#2563eb",
      color: "#ffffff",
      border: "none",
    },
    secondary: {
      background: "#ffffff",
      color: "#2563eb",
      border: "1px solid #2563eb",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "16px",
      }}
    >
      {children}
    </button>
  );
}

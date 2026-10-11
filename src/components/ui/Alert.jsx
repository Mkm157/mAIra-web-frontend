
const variants = {
  success: {
    background: "#ecfdf5",
    color: "#065f46",
    border: "#10b981",
  },
  error: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "#ef4444",
  },
  info: {
    background: "#eff6ff",
    color: "#1e40af",
    border: "#3b82f6",
  },
};

export default function Alert({
  children,
  variant = "info",
}) {
  const style = variants[variant] || variants.info;

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      style={{
        padding: 12,
        borderRadius: 8,
        background: style.background,
        color: style.color,
        borderLeft: `4px solid ${style.border}`,
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}

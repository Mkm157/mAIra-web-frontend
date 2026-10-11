
export default function Card({
  children,
  title,
  className = "",
}) {
  return (
    <section
      className={className}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 24,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      }}
    >
      {title && (
        <h2 style={{ marginTop: 0, marginBottom: 20 }}>
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}



import { useRef } from "react";

export default function OtpInput({
  value = "",
  onChange,
  length = 6,
  disabled = false,
}) {
  const refs = useRef([]);

  function handleChange(index, rawValue) {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const chars = value.padEnd(length, " ").slice(0, length).split("");
    chars[index] = digit || " ";
    const next = chars.join("").trimEnd();

    onChange?.(next);

    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => (refs.current[index] = element)}
          aria-label={`Verification digit ${index + 1}`}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={value[index] || ""}
          disabled={disabled}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          style={{
            width: 42,
            height: 48,
            textAlign: "center",
            fontSize: 20,
            border: "1px solid #d1d5db",
            borderRadius: 8,
          }}
        />
      ))}
    </div>
  );
}

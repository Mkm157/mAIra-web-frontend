export default function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    width: "18",
    height: "18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "dashboard") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19c.6-2.8 2.8-4.5 5.5-4.5s4.9 1.7 5.5 4.5" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M16.2 14.6c1.8.3 3.3 1.5 4 3.4" />
      </svg>
    );
  }

  if (name === "knowledge") {
    return (
      <svg {...common}>
        <path d="M4 5.5h6.5A2.5 2.5 0 0 1 13 8v11.5H6.5A2.5 2.5 0 0 0 4 22Z" />
        <path d="M20 5.5h-6.5A2.5 2.5 0 0 0 11 8v11.5h6.5A2.5 2.5 0 0 1 20 22Z" />
      </svg>
    );
  }

  if (name === "analytics") {
    return (
      <svg {...common}>
        <path d="M4 19h16" />
        <path d="M7 16v-4" />
        <path d="M12 16V8" />
        <path d="M17 16v-7" />
      </svg>
    );
  }

  if (name === "reports") {
    return (
      <svg {...common}>
        <path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z" />
        <path d="M14 3.5V8h4.5" />
        <path d="M8.5 13h7" />
        <path d="M8.5 16.5h5" />
      </svg>
    );
  }

  if (name === "support") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 16.5v.5" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.7 2.2c-.8.4-1.2.9-1.2 1.8v.3" />
      </svg>
    );
  }

  if (name === "activity") {
    return (
      <svg {...common}>
        <path d="M4 6h16" />
        <path d="M4 12h16" />
        <path d="M4 18h10" />
      </svg>
    );
  }

  if (name === "sidebar") {
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="16" rx="2" />
        <path d="M9 4v16" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
      </svg>
    );
  }

  if (name === "queries") {
    return (
      <svg {...common}>
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

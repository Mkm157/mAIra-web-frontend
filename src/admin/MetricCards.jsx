import { useEffect, useId, useRef, useState } from "react";
import Icon from "./icons";

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function buildCards(overview) {
  return [
    {
      id: "total_users",
      label: "Total users",
      value: formatCount(overview.totalUsers),
      icon: "users",
      details: [
        { label: "Students", value: formatCount(overview.students) },
        { label: "Admins", value: formatCount(overview.admins) },
      ],
    },
    {
      id: "active_users",
      label: "Active users",
      value: formatCount(overview.activeUsers),
      icon: "activity",
      details: [
        { label: "DAU", value: `${overview.dauPercent}%` },
        { label: "Online now", value: formatCount(overview.onlineNow) },
        { label: "Concurrency peak", value: `${overview.concurrencyPeakPercent}%` },
      ],
    },
    {
      id: "total_queries",
      label: "Total queries",
      value: formatCount(overview.totalQueries),
      icon: "queries",
      details: [
        { label: "Change", value: `+${overview.queryChangePercent}%` },
        { label: "Latency", value: `${overview.latencyMs} ms` },
      ],
    },
    {
      id: "knowledge_sources",
      label: "Knowledge sources",
      value: formatCount(overview.knowledgeSources),
      icon: "knowledge",
      details: [
        { label: "Indexing accuracy", value: `${overview.indexingAccuracyPercent}%` },
        { label: "Syncs pending", value: formatCount(overview.syncsPending) },
      ],
    },
  ];
}

function MetricCard({ card, open, popoverId, onToggle }) {
  return (
    <article className="metric-card">
      <button
        type="button"
        className="metric-button"
        aria-expanded={open}
        aria-controls={popoverId}
        onClick={onToggle}
      >
        <span className="metric-copy">
          <span className="metric-label">{card.label}</span>
          <span className="metric-value">{card.value}</span>
        </span>
        <span className="metric-icon">
          <Icon name={card.icon} />
        </span>
      </button>
      <div
        className={open ? "metric-popover is-visible" : "metric-popover"}
        id={popoverId}
        role="region"
        aria-label={card.label}
        aria-hidden={!open}
      >
          <dl>
            {card.details.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>
    </article>
  );
}

export default function MetricCards({ overview }) {
  const [openId, setOpenId] = useState(null);
  const gridRef = useRef(null);
  const baseId = useId();
  const cards = buildCards(overview);

  useEffect(() => {
    if (!openId) {
      return undefined;
    }

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpenId(null);
      }
    };

    const onPointer = (event) => {
      if (!gridRef.current?.contains(event.target)) {
        setOpenId(null);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openId]);

  return (
    <section className="metric-grid" ref={gridRef} aria-label="Workspace totals">
      {cards.map((card) => (
        <MetricCard
          key={card.id}
          card={card}
          open={openId === card.id}
          popoverId={`${baseId}-${card.id}`}
          onToggle={() => setOpenId(openId === card.id ? null : card.id)}
        />
      ))}
    </section>
  );
}

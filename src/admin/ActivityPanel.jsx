import { useState } from "react";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "security", label: "Security" },
  { id: "knowledge", label: "Knowledge" },
  { id: "users", label: "Users" },
];

export default function ActivityPanel({ events, open, onClose }) {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? events : events.filter((event) => event.category === filter);

  return (
    <aside
      className={open ? "activity-panel is-open" : "activity-panel"}
      aria-labelledby="activity-heading"
      aria-hidden={!open}
    >
      <div className="activity-header">
        <div>
          <h2 id="activity-heading">Recent activity</h2>
          <p>{events.length} events</p>
        </div>
        <button type="button" className="activity-close" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="segmented activity-filters" role="group" aria-label="Activity filter">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === filter ? "is-selected" : undefined}
            aria-pressed={item.id === filter}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ul className="activity-list">
        {visible.map((event) => (
          <li key={event.id}>
            <div className="activity-row">
              <strong>{event.title}</strong>
              <span>{event.timeAgo}</span>
            </div>
            <span className="activity-tag">{event.tag}</span>
            <p>{event.detail}</p>
          </li>
        ))}
        {visible.length === 0 ? <li className="activity-empty">No events in this filter.</li> : null}
      </ul>
    </aside>
  );
}

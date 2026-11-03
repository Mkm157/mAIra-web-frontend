export const mockUser = {
  email: "student@example.com",
  role: "Student",
};

export const mockResponse = {
  statusCode: "1",
  statusMsg: "Success",
  payload: {},
};

export const dashboardOverviewRequest = {
  mod: "admin",
  subMod: "dashboard",
  action: "dashboard_overview",
  actionType: "view",
  payload: {},
};

const weekLabels = ["May 18", "May 19", "May 20", "May 21", "May 22", "May 23", "Today"];
const monthLabels = ["Apr 14", "Apr 18", "Apr 22", "Apr 26", "Apr 30", "May 4", "May 8", "May 12", "May 16", "Today"];
const quarterLabels = ["Aug 3", "Aug 10", "Aug 17", "Aug 24", "Aug 31", "Sep 7", "Sep 14", "Sep 21", "Sep 28", "Oct 5", "Oct 8", "Today"];
const yearLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const queries7d = [4280, 5120, 4760, 5640, 6080, 5910, 6420];
const queries30d = [3900, 3720, 4480, 4610, 4300, 5050, 5280, 5600, 5980, 6420];
const queries90d = [3120, 3340, 3580, 3290, 3860, 4120, 4050, 4580, 4920, 5360, 5810, 6420];
const queries1y = [2800, 2640, 3010, 3220, 3480, 3360, 3890, 4280, 4710, 5120, 5580, 6100];

function scale(values, factor) {
  return values.map((value) => Math.round(value * factor));
}

function series(labels, values) {
  return labels.map((label, index) => ({
    label,
    value: values[index],
  }));
}

function metricSeries(week, month, quarter, year) {
  return {
    "7d": series(weekLabels, week),
    "30d": series(monthLabels, month),
    "90d": series(quarterLabels, quarter),
    "1y": series(yearLabels, year),
  };
}

export const dashboardOverviewResponse = {
  statusCode: "1",
  statusMsg: "Operation completed successfully",
  payload: {
    totalUsers: 2845,
    students: 2420,
    admins: 425,
    activeUsers: 1932,
    dauPercent: 68,
    onlineNow: 348,
    concurrencyPeakPercent: 91,
    totalQueries: 148620,
    queryChangePercent: 24.5,
    latencyMs: 420,
    knowledgeSources: 64,
    indexingAccuracyPercent: 99.8,
    syncsPending: 3,
    peakQueryHour: "2:00 PM – 4:00 PM",
    usage: {
      queries: metricSeries(queries7d, queries30d, queries90d, queries1y),
      tokens: metricSeries(
        scale(queries7d, 4.2),
        scale(queries30d, 4.2),
        scale(queries90d, 4.2),
        scale(queries1y, 4.2),
      ),
      sessions: metricSeries(
        scale(queries7d, 0.14),
        scale(queries30d, 0.14),
        scale(queries90d, 0.14),
        scale(queries1y, 0.14),
      ),
    },
    activity: [
      {
        id: "userRegistered",
        category: "users",
        title: "New user registered",
        tag: "Student",
        detail: "Elena Rostova (elena.edu@acme.edu) provisioned with workspace access.",
        timeAgo: "4 mins ago",
      },
      {
        id: "sourceUpdated",
        category: "knowledge",
        title: "Knowledge source updated",
        tag: "v4.2",
        detail: "Engineering Policy Handbook re-indexed and partitioned across vector nodes.",
        timeAgo: "28 mins ago",
      },
      {
        id: "reportGenerated",
        category: "reports",
        title: "Report generated",
        tag: "Compliance",
        detail: "Monthly token and compliance audit for Q1 exported by the system.",
        timeAgo: "2 hours ago",
      },
      {
        id: "supportRequest",
        category: "support",
        title: "Support request received",
        tag: "Ticket #SR-892",
        detail: "Latency in the Biology faculty queue flagged for diagnostic review.",
        timeAgo: "3 hours ago",
      },
      {
        id: "tokenRotation",
        category: "security",
        title: "Security token rotation",
        tag: "Verified",
        detail: "Enterprise API key renewal completed without session interruption.",
        timeAgo: "5 hours ago",
      },
    ],
  },
};

"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Cluster = {
  clusterId: number;
  label: string;
  articleCount: number;
};

type Props = {
  clusters: Cluster[];
};

export default function Timeline({ clusters }: Props) {
  const chartData = clusters.map((cluster) => ({
    label:
      cluster.label.length > 18
        ? cluster.label.substring(0, 18) + "..."
        : cluster.label,
    articles: cluster.articleCount,
    fullLabel: cluster.label,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 420,
        background: "#ffffff",
        borderRadius: 12,
        padding: 25,
        marginBottom: 35,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          color: "#111827",
          fontWeight: "bold",
        }}
      >
        📊 News Timeline
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 70,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#d1d5db"
          />

          <XAxis
            dataKey="label"
            interval={0}
            angle={-30}
            textAnchor="end"
            tick={{
              fontSize: 11,
              fill: "#374151",
            }}
          />

          <YAxis
            tick={{
              fill: "#374151",
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,.2)",
            }}
            formatter={(value) => [
              `${value} Articles`,
              "Count",
            ]}
            labelFormatter={(label, payload) =>
              payload?.[0]?.payload?.fullLabel || label
            }
          />

          <Bar
            dataKey="articles"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
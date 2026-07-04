"use client";

import { useState } from "react";

type Props = {
  title: string;
  value: number | string;
};

export default function StatsCard({ title, value }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#1f2937",
        color: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "260px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hover
          ? "0 10px 25px rgba(37,99,235,0.35)"
          : "0 4px 12px rgba(0,0,0,0.25)",
      }}
    >
      <p
        style={{
          color: "#9CA3AF",
          fontSize: "15px",
          marginBottom: "12px",
          fontWeight: 500,
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          fontWeight: "bold",
          color: "#60A5FA",
        }}
      >
        {value}
      </h1>
    </div>
  );
}
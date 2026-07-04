"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  clusterId: number;
  label: string;
  articleCount: number;
  startTime: string;
  endTime: string;
};

export default function ClusterCard({
  clusterId,
  label,
  articleCount,
  startTime,
  endTime,
}: Props) {
  const router = useRouter();

  const [hover, setHover] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  function openCluster() {
    router.push(`/cluster/${clusterId}`);
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: "1px solid #374151",
        borderRadius: "12px",
        padding: "22px",
        marginBottom: "22px",
        background: "#111827",
        color: "white",
        boxShadow: hover
          ? "0 8px 20px rgba(0,0,0,0.4)"
          : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          lineHeight: 1.5,
        }}
      >
        {label}
      </h2>

      <p>
        <b>Articles:</b> {articleCount}
      </p>

      <p>
        <b>Start:</b>{" "}
        {new Date(startTime).toLocaleString()}
      </p>

      <p>
        <b>End:</b>{" "}
        {new Date(endTime).toLocaleString()}
      </p>

      <button
        onClick={openCluster}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          marginTop: "18px",
          background: btnHover ? "#1d4ed8" : "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "bold",
          transition: "all 0.3s ease",
          transform: btnHover ? "scale(1.05)" : "scale(1)",
        }}
      >
        View Details →
      </button>
    </div>
  );
}
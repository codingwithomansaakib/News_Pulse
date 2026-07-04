"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClusterDetails() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadCluster();
    }
  }, [id]);

  async function loadCluster() {
    try {
      const res = await axios.get(
        `http://localhost:5000/clusters/${id}`
      );

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!data) {
    return (
      <div
        style={{
          background: "#0f172a",
          color: "white",
          minHeight: "100vh",
          padding: 40,
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
        }}
      >
        {data.cluster.label}
      </h1>

      <p style={{ color: "#9ca3af" }}>
        {data.articles.length} Article(s)
      </p>

      <hr
        style={{
          margin: "20px 0 35px",
          borderColor: "#374151",
        }}
      />

      {data.articles.map((article: any) => (
        <div
          key={article._id}
          style={{
            background: "#1e293b",
            padding: "25px",
            marginBottom: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            transition: "0.3s",
          }}
        >
          <h2
            style={{
              marginBottom: "15px",
              lineHeight: "1.5",
            }}
          >
            {article.title}
          </h2>

          {/* Source Badge */}

          <span
            style={{
              display: "inline-block",
              background: "#2563eb",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            {article.source}
          </span>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.7",
              marginBottom: "18px",
            }}
          >
            {article.summary}
          </p>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            <strong>Published:</strong>{" "}
            {new Date(article.published).toLocaleString()}
          </p>

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#2563eb",
              color: "white",
              textDecoration: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            📖 Read Full Article
          </a>
        </div>
      ))}
    </div>
  );
}
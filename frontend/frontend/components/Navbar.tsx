"use client";

import axios from "axios";

export default function Navbar() {

  async function refreshNews() {

    try {

      await axios.post(
        "https://newspulse-production-3d82.up.railway.app/ingest/trigger"
      );

      alert("Scraper Started!\nPlease wait 15-30 seconds.");

      window.location.reload();

    } catch (err) {

      console.log(err);

      alert("Unable to start scraper.");

    }

  }

  return (

    <nav
      style={{
        background: "#1e293b",
        color: "white",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      <h2>📰 News Pulse</h2>

      <button
        onClick={refreshNews}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Refresh News
      </button>

    </nav>

  );

}
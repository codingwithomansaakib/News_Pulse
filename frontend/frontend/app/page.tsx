"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ClusterCard from "../components/ClusterCard";
import Timeline from "../components/Timeline";

type Cluster = {
  clusterId: number;
  label: string;
  articleCount: number;
  articleIds: string[];
  startTime: string;
  endTime: string;
  sources: string[];
};

export default function Home() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [filteredClusters, setFilteredClusters] = useState<Cluster[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClusters();
  }, []);

  async function fetchClusters() {
    try {
      setLoading(true);

      const clusterRes = await axios.get(
        "https://newspulse-production-3d82.up.railway.app/clusters"
      );

      setClusters(clusterRes.data);
      setFilteredClusters(clusterRes.data);

      const sourceRes = await axios.get(
        "https://newspulse-production-3d82.up.railway.app/clusters/sources"
      );

      setSources(sourceRes.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function filterBySource(source: string) {
    setSelectedSource(source);

    if (source === "All") {
      setFilteredClusters(clusters);
      return;
    }

    const filtered = clusters.filter((cluster) =>
      cluster.sources?.includes(source)
    );

    setFilteredClusters(filtered);
  }

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "40px",
          background: "#0f172a",
          minHeight: "100vh",
          color: "white",
        }}
      >
        {/* Statistics */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <StatsCard
            title="Total Clusters"
            value={filteredClusters.length}
          />

          <StatsCard
            title="Total Articles"
            value={filteredClusters.reduce(
              (sum, cluster) => sum + cluster.articleCount,
              0
            )}
          />
        </div>

        {/* Source Filter */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <label
            style={{
              marginRight: 10,
              fontWeight: "bold",
            }}
          >
            Filter by Source
          </label>

          <select
            value={selectedSource}
            onChange={(e) => filterBySource(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            <option value="All">All Sources</option>

            {sources.map((source) => (
              <option
                key={source}
                value={source}
              >
                {source}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}

        <Timeline clusters={filteredClusters} />

        <h2
          style={{
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          Latest Clusters
        </h2>

        {loading ? (
          <h3>Loading...</h3>
        ) : filteredClusters.length === 0 ? (
          <h3>No clusters found.</h3>
        ) : (
          filteredClusters.map((cluster) => (
            <ClusterCard
              key={cluster.clusterId}
              clusterId={cluster.clusterId}
              label={cluster.label}
              articleCount={cluster.articleCount}
              startTime={cluster.startTime}
              endTime={cluster.endTime}
            />
          ))
        )}
      </main>
    </>
  );
}

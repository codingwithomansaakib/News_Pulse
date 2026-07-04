import axios from "axios";

export default function RefreshButton() {

  const refresh = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ingest/trigger`
      );

      alert("News refreshed successfully!");
      console.log(res.data);

    } catch (err) {
      console.error(err);
      alert("Failed to refresh news");
    }
  };

  return (
    <button onClick={refresh}>
      Refresh News
    </button>
  );
}
export default function EOQCards({ data }) {
  if (!data || data.status === "NOT_AVAILABLE") {
    return <p>EOQ not computed yet.</p>;
  }

  return (
    <div>
      <p>EOQ: {data.EOQ}</p>
      <p>ROP: {data.ROP}</p>
      <p>Safety Stock: {data.SafetyStock}</p>
      <p>Service Level: {data.service_level}</p>
    </div>
  );
}

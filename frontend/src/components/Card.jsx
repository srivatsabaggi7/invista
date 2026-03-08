export default function Card({ title, children }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
      boxShadow: "0 10px 20px rgba(0,0,0,0.06)"
    }}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}

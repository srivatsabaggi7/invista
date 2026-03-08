export default function ModelToggle({ value, onChange }) {
  const modes = ["prophet", "lstm", "hybrid", "compare"];

  return (
    <div>
      {modes.map(m => (
        <button key={m} onClick={() => onChange(m)} disabled={value === m}>
          {m.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

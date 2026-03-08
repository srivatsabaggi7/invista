export default function HorizonToggle({ value, onChange }) {
  return (
    <div>
      <button onClick={() => onChange(30)} disabled={value === 30}>30D</button>
      <button onClick={() => onChange(90)} disabled={value === 90}>90D</button>
    </div>
  );
}

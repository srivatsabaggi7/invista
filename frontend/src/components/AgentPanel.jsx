export default function AgentPanel({ data }) {
  if (!data) return null;

  const decision = data.agent_outputs?.DecisionAgent;

  return (
    <div>
      <h3>Agent Decision</h3>
      <p><b>Decision:</b> {decision?.decision}</p>
      <p><b>Reason:</b> {decision?.reason}</p>
    </div>
  );
}

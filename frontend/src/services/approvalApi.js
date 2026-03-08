export async function approveDecision(payload) {
  const res = await fetch("/api/approval/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function rejectDecision(payload) {
  const res = await fetch("/api/approval/reject", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

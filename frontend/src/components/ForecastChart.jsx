import Plot from "react-plotly.js";

export default function ForecastChart({ data, mode }) {
  if (!data) return null;

  const traces = [];

  if (mode === "prophet" || mode === "compare") {
    traces.push({
      x: data.dates,
      y: data.prophet,
      type: "scatter",
      mode: "lines",
      name: "Prophet"
    });
  }

  if ((mode === "lstm" || mode === "compare") && data.lstm) {
    traces.push({
      x: data.dates,
      y: data.lstm,
      type: "scatter",
      mode: "lines",
      name: "LSTM"
    });
  }

  if ((mode === "hybrid" || mode === "compare") && data.hybrid) {
    traces.push({
      x: data.dates,
      y: data.hybrid,
      type: "scatter",
      mode: "lines",
      name: "Hybrid",
      line: { dash: "dot" }
    });
  }

  return (
    <Plot
      data={traces}
      layout={{
        title: "Demand Forecast",
        paper_bgcolor: "#F9FAFB",
        plot_bgcolor: "#FFFFFF",
        margin: { t: 40, l: 40, r: 20, b: 40 }
      }}
      config={{ displayModeBar: false }}
    />
  );
}

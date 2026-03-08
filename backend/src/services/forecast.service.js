import { readJSON } from './file.service.js';

export function getForecast(sku, horizon) {
  const prophet = readJSON(`forecast/${sku}_${horizon}.json`);
  
  let lstm = null;
  try {
    lstm = readJSON(`lstm/${sku}_LSTM_${horizon}.json`);
  } catch {
    lstm = null;
  }

  // Hybrid = 0.6 Prophet + 0.4 LSTM (if available)
  let hybrid = null;
  if (lstm) {
    hybrid = prophet.yhat.map((p, i) =>
      +(0.6 * p + 0.4 * lstm.yhat[i]).toFixed(2)
    );
  }

  return {
    dates: prophet.dates,
    prophet: prophet.yhat,
    lstm: lstm ? lstm.yhat : null,
    hybrid
  };
}

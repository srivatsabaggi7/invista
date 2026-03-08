import { getForecast } from '../services/forecast.service.js';

export function forecastHandler(req, res) {
  const { sku, horizon } = req.params;
  const data = getForecast(sku, horizon);
  res.json(data);
}

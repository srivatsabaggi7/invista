import { useEffect, useState } from "react";
import { fetchProducts } from "../services/products";

export default function SKUSelector({ value, onChange }) {
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {Object.entries(products).map(([sku, meta]) => (
        <option key={sku} value={sku}>
          {meta.name}
        </option>
      ))}
    </select>
  );
}

import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <div className="text-gray-500 text-sm mb-2">
      {items.map((item, idx) =>
        item.to ? (
          <span key={idx}>
            <Link to={item.to} className="hover:underline">{item.label}</Link>
            <span className="mx-1">/</span>
          </span>
        ) : (
          <span key={idx} className="text-gray-700 font-medium">{item.label}</span>
        )
      )}
    </div>
  );
}

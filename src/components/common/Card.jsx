export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

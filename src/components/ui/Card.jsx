export default function Card({ children, className = '', hover = false, ...props }) {
  const baseStyles = "bg-white rounded-xl shadow-md overflow-hidden";
  const hoverStyles = hover ? "transition-shadow duration-300 hover:shadow-xl" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

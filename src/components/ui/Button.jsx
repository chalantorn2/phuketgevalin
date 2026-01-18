export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-95";

  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    accent: "bg-accent-600 hover:bg-accent-700 text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50",
    ghost: "text-primary-600 hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface PlatformLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
  mobileSize?: "sm" | "md" | "lg";
}

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-cyan-500 to-blue-600",
  "from-rose-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-cyan-600",
  "from-violet-500 to-indigo-600",
  "from-lime-500 to-green-600",
];

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function PlatformLogo({ name, size = "md", mobileSize }: PlatformLogoProps) {
  const gradient = gradients[hashCode(name) % gradients.length];
  const initial = name.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 md:w-14 md:h-14 text-sm md:text-xl",
    lg: "w-14 h-14 md:w-20 md:h-20 text-xl md:text-3xl",
  };

  // If mobileSize is specified, use responsive sizing
  const effectiveSize = mobileSize || size;

  const responsiveSizeClasses = mobileSize
    ? {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 md:w-14 md:h-14 text-sm md:text-xl",
        lg: "w-14 h-14 md:w-20 md:h-20 text-xl md:text-3xl",
      }[mobileSize]
    : sizeClasses[effectiveSize];

  return (
    <div
      className={`${responsiveSizeClasses} rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}

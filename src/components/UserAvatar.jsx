
"use client";

import { useState } from "react";
import { User } from "lucide-react";

export default function UserAvatar({ src, name, size = 10, className = "" }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div 
        className={`bg-zinc-800 flex items-center justify-center rounded-full overflow-hidden border border-zinc-700 ${className}`}
        title={name}
      >
        {name ? (
            <span className="font-bold text-zinc-400 text-xs sm:text-sm uppercase select-none">
                {name.substring(0, 2)}
            </span>
        ) : (
            <User className="text-zinc-500 w-1/2 h-1/2" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative rounded-full overflow-hidden bg-zinc-800 ${className}`}>
        <img 
            src={src} 
            alt={name || "User"} 
            className="w-full h-full object-cover"
            onError={() => setError(true)}
        />
    </div>
  );
}

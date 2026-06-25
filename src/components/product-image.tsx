import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export function ProductImage({
  name,
  className,
  src,
  label = "GAMEX",
}: {
  name: string;
  className?: string;
  src?: string;
  label?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-md bg-muted", className)}>
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  const hue = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md bg-muted",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, oklch(0.28 0.06 ${hue}), oklch(0.16 0.03 ${(hue + 40) % 360}))`,
      }}
    >
      <div className="flex flex-col items-center gap-2 text-white/70">
        <ImageIcon className="size-8" strokeWidth={1.5} />
        <span className="font-heading text-xs font-semibold tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );
}

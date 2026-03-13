import { Link } from "@/i18n/navigation";

type AsideBarButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  variant?: "primary" | "default";
};

export function AsideBarButton({
  icon,
  label,
  href,
  variant = "default",
}: AsideBarButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm ${
        variant === "primary"
          ? "bg-primary text-primary-foreground hover:bg-primary/50"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

import { Link } from "@/i18n/navigation";

type AsideBarButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export function AsideBarButton({ icon, label, href }: AsideBarButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

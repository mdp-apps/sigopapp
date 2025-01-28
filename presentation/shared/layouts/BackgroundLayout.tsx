import { ThemedView } from "@/presentation/theme/components";

interface BackgroundLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const BackgroundLayout = ({
  children,
  className,
}: BackgroundLayoutProps) => {

  return (
    <ThemedView
      className={["items-center", className].join(" ")}
      margin
      safe
    >
      {children}
    </ThemedView>
  );
};

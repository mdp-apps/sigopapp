import { ThemedView } from "@/presentation/theme/components";

interface ImgBackgroundLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ImgBackgroundLayout = ({
  children,
  className,
}: ImgBackgroundLayoutProps) => {

  return (
    <ThemedView
      className={["items-center bg-slate-100", className].join(" ")}
      safe
      margin
    >
      {children}
    </ThemedView>
  );
};

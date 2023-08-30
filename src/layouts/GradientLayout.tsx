import { ReactNode } from "react";
import styles from "@/styles/background.module.css";

interface IGradientLayoutProps {
  children?: ReactNode;
  className?: string;
}

const GradientLayout = ({ children, className }: IGradientLayoutProps) => {
  return (
    <div className={`min-h-screen ${styles.background} ${className}`}>
      {children}
    </div>
  );
};

GradientLayout.defaultProps = {
  className: "",
  children: undefined,
};

export default GradientLayout;

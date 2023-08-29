import { ReactNode } from "react";
import styles from "@/styles/background.module.css";

const GradientLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`h-screen ${styles.background}`}>{children}</div>;
};

export default GradientLayout;

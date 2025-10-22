import React from "react";

export const Button = ({ text, variant }) => {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md";
  const styles = {
    primary: `${base} bg-blue-700 text-white hover:bg-blue-800`,
    secondary: `${base} bg-white border border-blue-700 text-blue-700 hover:bg-blue-50`,
  };

  return <button className={styles[variant]}>{text}</button>;
};

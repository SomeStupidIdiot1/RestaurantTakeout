import React from "react";

function MenuDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <div></div>;
}

export default MenuDisplay;

import React from "react";

function DashboardDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <div></div>;
}

export default DashboardDisplay;

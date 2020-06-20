import React from "react";

function DashboardDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <div>DASHBOARD DEFAULT DISPLAY</div>;
}

export default DashboardDisplay;

import React from "react";

function RestaurantInfoDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <div>EDIT RESTAURANT INFO</div>;
}

export default RestaurantInfoDisplay;

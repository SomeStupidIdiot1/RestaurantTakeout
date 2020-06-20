import React from "react";

function AddItemDisplay({ show }: { show: boolean }) {
  if (!show) return null;
  return <div>ADD ITEM DISPLAY</div>;
}

export default AddItemDisplay;

import React from "react";

function MenuDisplay({ show }: { show: boolean }) {
  if (!show) return null;

  return <div>THIS SHOULD SHOW MENU</div>;
}

export default MenuDisplay;

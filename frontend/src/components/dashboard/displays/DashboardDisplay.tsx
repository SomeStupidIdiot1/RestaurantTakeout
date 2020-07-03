import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ID } from "../../../queries";
import { Link } from "@material-ui/core";

function DashboardDisplay({ show }: { show: boolean }) {
  const getId = useQuery(GET_ID) as { data: { me: { id: string } } };
  const link = getId.data
    ? `${window.location.origin}/display/${getId.data.me.id}`
    : "";
  if (!show) return null;
  return (
    <div>
      <Link href={link}>Click here for your website</Link>
    </div>
  );
}
export default DashboardDisplay;

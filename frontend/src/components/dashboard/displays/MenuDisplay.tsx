import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ITEMS } from "../../../queries";

function MenuDisplay({ show }: { show: boolean }) {
  let items = useQuery(GET_ITEMS);
  if (!items.loading) items = items.data.getItems;

  if (!show) return null;
  return <div>{JSON.stringify(items)}</div>;
}

export default MenuDisplay;

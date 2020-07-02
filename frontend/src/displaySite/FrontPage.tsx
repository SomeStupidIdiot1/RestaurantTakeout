import React from "react";
import { useQuery } from "@apollo/react-hooks";
// import {  } from "../queries";

type propType = {
  match: {
    params: {
      repo: string;
    };
  };
};
const FrontPage = (props: propType) => {
  console.log(props.match.params.repo);
  return <></>;
};
export default FrontPage;

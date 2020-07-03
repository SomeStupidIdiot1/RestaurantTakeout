import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../queries";

type propType = {
  match: {
    params: {
      repo: string;
    };
  };
};
const FrontPage = (props: propType) => {
  const user = useQuery(GET_USER, {
    variables: { id: props.match.params.repo },
  });
  return <div>{JSON.stringify(user.loading ? null : user.data)}</div>;
};
export default FrontPage;

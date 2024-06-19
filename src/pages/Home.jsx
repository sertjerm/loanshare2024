// import React from 'react'
// import { useSelector } from "react-redux";
import * as actions from "../app/actions/main";

import { useDispatch, useSelector } from "react-redux";
import MyLoader from "../components/custom/MyLoader";
import { useEffect } from "react";
// import ResponsiveButtonGroup from "./ResponsiveButtonGroup";

const Home = () => {
  const { isLoading, items: menu } = useSelector((state) => state.main.menu);
  const { item: user } = useSelector((state) => state.user.user);
  const { item: member } = useSelector((state) => state.main.member);
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (user) {
    //   // dispatch(actions.getMember(user.MEMB_CODE));
    // }
    console.log("home state=", state);
  }, [user, dispatch]);
  if (isLoading) {
    // return <div>loading...</div>
    return <MyLoader />;
  }
  return (
    <>
      <div>Home</div>
      {/* <pre>{JSON.stringify(member)}</pre> */}
      {/* <pre>{JSON.stringify(menu)}</pre> */}
      {/* <pre>{JSON.stringify(user)}</pre> */}
      {/* <pre>{JSON.stringify(state)}</pre> */}

      <pre style={{ height: "auto", whiteSpace: "pre-wrap" }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </>
  );
};

export default Home;

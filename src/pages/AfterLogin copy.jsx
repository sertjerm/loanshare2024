import React, { useEffect } from "react";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MyLoader from "../components/custom/MyLoader";
import { Card, Tag } from "antd";
const AfterLogin = () => {
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  const { isLoading, item: member } = useSelector((state) => state.main.member);
  // Hook for programmatic navigation
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    } else {
      dispatch(actions.getMember(user.MEMB_CODE));
      // dispatch(actions.getNewLoanDev(user.MEMB_CODE));
    }
  }, [user]);
  if (isLoading) {
    return <MyLoader />;
  }
  return (
    <div>
      <h4>After Login</h4>

      {member?.IS_ALLOW == 1 ? (
        <CheckOK member={member} />
      ) : (
        <CheckFailed member={member} />
      )}

      <pre style={{ height: "auto", whiteSpace: "pre-wrap", color: "blue" }}>
        {JSON.stringify(member, null, 2)}
      </pre>
    </div>
  );
};

export default AfterLogin;

const CheckOK = (props) => {
  let { member } = props;
  return (
    <Card className="my-card mb-4">
      <Tag color="green">{member?.STATUS_TEXT}</Tag>
      <Link to={"/request"}>คำนวณเงินกู้</Link>
      {/* <Link to="/request">
        <Button>ต่อไป</Button>
      </Link> */}
    </Card>
  );
};

const CheckFailed = (props) => {
  let { member } = props;
  return (
    <Card className="my-card mb-4">
      <Tag color="red">{member?.STATUS_TEXT}</Tag>
      {/* <div className="alert alert-danger">{member?.STATUS_TEXT}</div> */}
    </Card>
  );
};

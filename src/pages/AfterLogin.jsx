import React, { useEffect } from "react";
import * as actions from "../app/actions/main";
import { useDispatch, useSelector } from "react-redux";

import MyLoader from "../components/custom/MyLoader";
import { Button, Card, Tag } from "antd";
import GeneralPage from "./GeneralPage";
const AfterLogin = (props) => {
  const { next, prev, SignOut, setStep } = props;
  const dispatch = useDispatch();
  const { item: user } = useSelector((state) => state.user.user);
  const { isLoading, item: member } = useSelector((state) => state.main.member);

  useEffect(() => {
    dispatch(actions.getMember(user?.MEMB_CODE));
  }, [user]);

  useEffect(() => {
    if (member) {
      if (member.IS_ALLOW == 0) {
        // setCurrent({index:3,isError:true});
        setStep(null, true);
      }
    }
  }, [member]);
  if (isLoading) {
    return <MyLoader />;
  }
  // return (
  //   <div className="container after-login pt-4">
  //   <div className="row">
  //     <div className="col-12 col-md-6 " data-aos="fade-up" data-aos-delay="300">
  //       <div className="col-12 pt-2" data-aos="fade-up" data-aos-delay="300">
  //         {member?.IS_ALLOW == 1 ? (
  //           <CheckOK member={member} prev={prev} next={next} />
  //         ) : (
  //           <CheckFailed member={member} prev={prev} next={next} />
  //         )}

  //         <pre
  //           style={{ height: "auto", whiteSpace: "pre-wrap", color: "blue" }}
  //         >
  //           {JSON.stringify(member, null, 2)}
  //         </pre>
  //       </div>
  //     </div>
  //   </div>
  //   </div>
  // );
  return (
    <GeneralPage>
      {member?.IS_ALLOW == 1 ? (
        <CheckOK member={member} prev={prev} next={next} />
      ) : (
        <CheckFailed member={member} prev={prev} next={next} />
      )}
    </GeneralPage>
  );
};

export default AfterLogin;

const CheckOK = (props) => {
  let { member, next, SignOut } = props;
  return (
    <Card className="my-card mb-4">
      <Tag color="green">{member?.STATUS_TEXT}</Tag>
      <Button onClick={() => next()}>คำนวณเงินกู้ใหม่</Button>
      {/* <Link to="/request">
        <Button>ต่อไป</Button>
      </Link> */}
    </Card>
  );
};

const CheckFailed = (props) => {
  let { member, prev, SignOut } = props;
  return (
    <Card className="my-card mb-4">
      <Tag color="red">{member?.STATUS_TEXT}</Tag>
      <Button
        onClick={() => {
          // SignOut();
          // prev();
        }}
      >
        back
      </Button>
      {/* <div className="alert alert-danger">{member?.STATUS_TEXT}</div> */}
    </Card>
  );
};

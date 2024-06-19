import { useDispatch, useSelector } from "react-redux";
import Card from "antd/es/card/Card";

import MemberAvatar from "../components/MemberAvatar";

import { useEffect } from "react";
import * as actions from "../app/actions/loan";
import MemberForm from "../components/MemberForm";
import IncomeForm from "../components/IncomeForm";
import StepController from "../components/StepController";
// import Debug from "../components/Debug";
// import { NEW_LOAN_V2 } from "../app/constants/APP_ROOT";
import Loading from "../components/Loading";

const BasicInfoMember = (props) => {
  const dispatch = useDispatch();
  const { isLoading, item: member } = useSelector((state) => state.loan.member);

  console.log("basic-member,newloan", member);

  useEffect(() => {}, []);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" basic-info">
      {/* {member && member && ( */}
      {member && (
        <div className="row">
          <div className="col-12 col-md-6">
            <Card className="my-card ">
              <MemberAvatar />
              <MemberForm />
            </Card>
          </div>
          <div className="col-12 col-md-6">
            <Card
              className="my-card "
              title={`ข้อมูลรายรับ-รายจ่าย [ ${member.MEMB_CODE} ]`}
            >
              <IncomeForm />
            </Card>
          </div>
        </div>
      )}
      <div className="step-controller">
        {/* <button>test</button> */}
        {member && <StepController next="ต่อไป" />}
      </div>
      {/* <Debug /> */}
    </div>
  );
};

export default BasicInfoMember;

import { Button, Card } from "antd";
import React from "react";
import GeneralPage from "./GeneralPage";

const Finished = (props) => {
  let{setStep,SignOut}=props;
  return (
    <GeneralPage>
      <Card className="my-card pt-4" data-aos="fade-up" data-aos-delay="300">
        <div className="alert alert-success">Finished</div>
        <Button onClick={() => setStep(1)}>Reset</Button>
        <Button onClick={() => SignOut()}>ออกจากระบบ</Button>
      </Card>
    </GeneralPage>
  );
};

export default Finished;

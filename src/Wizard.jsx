import { Button, Steps } from "antd";
import Login from "./pages/Login";
import AfterLogin from "./pages/AfterLogin";
import { useCallback, useState } from "react";
import RequestForm from "./pages/RequestForm";
import "./assets/styles/main-wizard.scss";

const Wizard = () => {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  // const next = useCallback(() => {
  //   // logic for next
  //   setCurrent(current + 1);
  // }, []);

  // const prev = useCallback(() => {
  //   // logic for prev
  //   setCurrent(current - 1);
  // }, []);
  var steps = [
    {
      key: 1,
      title: "login",
      subTitle: "subTitle1",
      content: <Login next={next} prev={prev} />,
      disabled: "0",
      description: "description1",
    },
    {
      key: 2,
      title: "ตรวจสอบสิทธิ์",
      subTitle: "subTitle2",
      content: <AfterLogin next={next} prev={prev} />,
      disabled: "0",
      description: "description2",
    },
    {
      key: 3,
      title: "คำนวณเงินกู้ใหม่",
      subTitle: "subTitle3",
      content: <RequestForm next={next} prev={prev} />,
      disabled: "0",
      description: "description3",
    },
    {
      key: 4,
      title: "Finished",
      subTitle: "subTitle4",
      content: "Finished",
      disabled: "1",
      description: "description4",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="main-wiz container-fluid">
      <div>Wizard</div>
      <Steps
        current={current}
        items={items}
        // status={current === 2 ? "error" : ""}
      />
      <div className="steps-content">{steps[current]?.content}</div>
      
    </div>
  );
};

export default Wizard;

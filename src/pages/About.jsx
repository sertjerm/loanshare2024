// import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import "../assets/styles/about.scss";
const About = () => {
  return (
    <>
      <div>Aboutxxx</div>
      <div className="row row-container">
        {items.map((item, index) => {
          return (
            <div className="col-content col-12 col-md-4">
              {/* <Card key={index} title={`ทดสอบ ${item.id}`}>
                {item.text}
              </Card> */}
              <Card
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                  }
                  title={`Card title ${item.id}`}
                  description={item.text}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default About;

const items = [
  {
    id: 1,
    title: "title 111",
    text: "มีผู้เข้าชื่อ 18 คน นำโดย อ.พิพัฒน์ สุจินดา ได้ทำหนังสือถึงคณบดีคณะเศรษฐศาสตร์สหกรณ์ พร้อมแนบรายชื่อผู้ขอจดทะเบียนจัดตั้งสหกรณ์ออมทรัพย์และเครดิตของผู้มีเงินเดือน กรมมหาวิทยาลัยเกษตรศาสตร์ 106 คน - ขอให้ดำเนินการจัดตั้งสหกรณ์ออมทรัพย์ข้าราชการกรมมหาวิทยาลัยเกษตรศาสตร์ เพราะท่านคณบดีคณะเศรษฐศาสตร์สหกรณ์จะจัดหาเงินจำนวน 200,000.-บาท จากพิทยาลงกรณ มูลนิธิ มาฝากสหกรณ์ที่จัดตั้งขึ้นนี้ เพื่อให้เป็นทนหมุนเวียน",
  },
  {
    id: 2,
    title: "title 222",
    text: "ประชุมคณบดี มก. ครั้งที่ 14/2500  ขอให้ระงับเรื่องที่คณะเศรษฐศาสตร์สหกรณ์ ได้ขอให้กรมมหาวิทยาลัยเกษตรศาสตร์ ",
  },
  {
    id: 3,
    title: "title 333",
    text: "ศ.พันธุม ดิษยมณฑล รองคณบดีคณะเศรษฐศาสตร์สหกรณ์ได้บันทึกถึงท่านอธิการบดีผ่านประธานกรรมการสวัสดิการ ขอให้ดำเนินการจัดตั้งสหกรณ์ออมทรัพย์ และเครดิต สำหรับผู้มีเงินเดือนในกรมมหาวิทยาลัยเกษตรศาสตร์ โดยให้เหตุผล 4 ข้อคือ",
  },
];

import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MyCarousel = () => {
  const prevArrow = (
    <Button type="primary" shape="circle" icon={<LeftOutlined />}>
      prev
    </Button>
  );

  const nextArrow = (
    <Button type="primary" shape="circle" icon={<RightOutlined />}>
      next
    </Button>
  );

  return (
    <Carousel prevArrow={prevArrow} nextArrow={nextArrow}>
      <div>
        <h3>Slide 1</h3>
      </div>
      <div>
        <h3>Slide 2</h3>
      </div>
      <div>
        <h3>Slide 3</h3>
      </div>
      <div>
        <h3>Slide 4</h3>
      </div>
    </Carousel>
  );
};

export default MyCarousel;

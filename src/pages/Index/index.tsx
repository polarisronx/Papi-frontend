// @ts-ignore
import { history } from '@umijs/max';
import { Button, Card, Carousel, Col, Row, Typography } from 'antd';
import React from 'react';
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    width: '1980px',
    height: '400px',

    // textAlign: 'center',
    // background: '#364d79',
  };
  const CarouselImag: React.FC = () => (
    <Carousel effect="fade" autoplay={true}>
      <div>
        <img src="images/9b15961d1089f7d69cd5382311e487dd.png" style={contentStyle} alt="Image 1" />
      </div>
      <div>
        <img src="images/fe6925eb59c54e50f5111e718766fbe1.png" style={contentStyle} alt="Image 2" />
      </div>
      <div>
        <img src="images/a3d4e4c7f47e98f65f0327dcff3072d3.png" style={contentStyle} alt="Image 3" />
      </div>
      <div>
        <img src="images/936e1376cb0c19269dfc09c472cb8eea.png" style={contentStyle} alt="Image 4" />
      </div>
    </Carousel>
  );
  const interfacePath = '/InterfaceMarket/';
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <Row>
        <Col span={18} push={2}>
          <Typography>
            <Title>Papi 在线接口开放平台</Title>

            <Paragraph strong={true}>一个为用户和开发者提供全面API接口调用服务的开发平台</Paragraph>
          </Typography>
        </Col>
        <Col span={1} pull={18}>
          <img
            src="icons/黑洞宇宙.png"
            alt="logo"
            style={{ width: '100px', height: '100px', marginRight: '10px' }}
          ></img>
        </Col>
      </Row>

      <br />
      <Card>
        <CarouselImag />
      </Card>
      <br />
      <div
        style={{
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          type="primary"
          size="large"
          key="offline"
          onClick={() => {
            history.push(interfacePath);
          }}
        >
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Index;

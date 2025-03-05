import { LikeOutlined } from '@ant-design/icons';
import { PageContainer, Statistic } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import { Chart, Guide, Line, Point, Tooltip } from 'bizcharts';
import { useState } from 'react';

const { Text } = Guide;

export default function SelfInfo() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teaClassList, _] = useState([
    {
      className: '周六18-20python',
      classId: '',
    },
  ]);

  const data = [
    {
      year: '1991',
      value: 3,
    },
    {
      year: '1992',
      value: 4,
    },
    {
      year: '1993',
      value: 3.5,
    },
    {
      year: '1994',
      value: 5,
    },
    {
      year: '1995',
      value: 4.9,
    },
    {
      year: '1996',
      value: 6,
    },
    {
      year: '1997',
      value: 7,
    },
    {
      year: '1998',
      value: 9,
    },
    {
      year: '1999',
      value: 13,
    },
  ];
  const data1 = [
    {
      gender: 'male',
      value: 50,
    },
  ];

  const scale = {
    value: {
      min: 0,
      max: 100,
    },
  };
  return (
    <PageContainer>
      <div className="header">
        <Row gutter={16}>
          <Col span={9}>
            <Statistic title="做题数" value={1128} prefix={<LikeOutlined />} valueStyle={{ color: '#1677ff' }}/>
          </Col>
          <Col span={9}>
            <Statistic title="作业" value={93} suffix="/ 100" valueStyle={{ color: '#1677ff' }}/>
          </Col>
          <Col span={6} >
          <Statistic title="正确率" value={93} suffix="/ 100" valueStyle={{ color: '#1677ff' }}/>

          </Col>
        </Row>
      </div>
      <div style={{margin:'40px 0'}}></div>
      <div className="zhe">
        <Chart
          appendPadding={[10, 0, 0, 10]}
          autoFit
          height={500}
          data={data}
          onLineClick={console.log}
          scale={{
            value: { min: 0, alias: '人均年收入', type: 'linear-strict' },
            year: { range: [0, 1] },
          }}
        >
          <Line position="year*value" />
          <Point position="year*value" />
          <Tooltip showCrosshairs follow={false} />
        </Chart>
      </div>
    </PageContainer>
  );
}

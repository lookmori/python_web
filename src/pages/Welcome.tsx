import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Badge, Button, Card, Divider, Flex, Pagination, Space, theme } from 'antd';
import React, { useState } from 'react';
import { history } from '@umijs/max';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();


  function findQuestion(){
    console.log('123');
    
  }
  return (
    <Link to={href} >
    <div
      onClick={() => findQuestion()}
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
        cursor:'pointer'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            fontWeight: 'bold',
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
    </div>
    </Link>
  );
};
const Welcome: React.FC = () => {
  return (
    <PageContainer
      header={{
        extra: (
                      <Button variant="outlined"onClick={() => history.push('')}>
                      <Badge status="success" text="已完成" />
            本周作业
          </Button>

        ),
      }}
    >

      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Card
          style={{
            borderRadius: 8,
          }}
        >

          <Divider />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="/problem/item"
              title="了解 umi"
              desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
            />
          </div>

          <Pagination align="center" defaultCurrent={1} total={50} style={{ marginTop: '40px' }} />
        </Card>
      </Space>
    </PageContainer>
  );
};

export default Welcome;

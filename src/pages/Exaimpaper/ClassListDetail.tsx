import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Descriptions } from 'antd';
import { useRef } from 'react';
export default function ClassListDeatil() {
  const actionRef = useRef(null);
  const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            history.push('/teacher/classstudent/detail')
          }}
        >
        详情
        </a>
      ],
    },
  ];
  const items: any = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao',
    },
  ];
  return (
    <PageContainer>
      <Card>
        <Descriptions title="User Info" items={items} />
      </Card>

      <div style={{ margin: ' 40px 0' }}></div>

      <ProTable
        columns={columns}
        cardBordered
        actionRef={actionRef}
        rowKey="id"
        search={false}
        options={{
          setting: false
        }}

        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="学生列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              
            }}
            type="primary"
          >
            添加学生
          </Button>,
        ]}
      />
    </PageContainer>
  );
}

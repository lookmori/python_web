import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import MDEditor from '@uiw/react-md-editor';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import ReactJson from 'react-json-view';
import { CozeAPI } from '@coze/api';


export default function Index() {
  const [pageLoading,setPageLoading] = useState(false)
  const actionRef = useRef(null);
  const [genderCode, setGenderCode] = useState({
  });
  const [isgenderCode, setIsGenderCode] = useState(false);
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
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
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
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeValue, setCodeValue] = useState('');


  // 生成题目确定后添加到数据库
  const hanldeOKIsGenderCode = () => {};

  // 调用ai生成题目数据
  const handleOk = async () => {
    setIsModalOpen(false);
    setPageLoading(true)
    setIsGenderCode(true)
    const apiClient = new CozeAPI({
      token: 'pat_4i3iAhP9W6dyCueGZ00ZRNTcvzV2M1PUOzVUz1BBJXlcaWMKsBz2T4JH3GP6qFtF',
      baseURL: 'https://api.coze.cn/',
      allowPersonalAccessTokenInBrowser: true
    });
    const res = await apiClient.workflows.runs.stream({
      workflow_id: '7477892587513479168',
      bot_id: '7475993452724617257',
      parameters: {
      "input": codeValue
    },
    })
    for await (const event of res) {
      if (event.data) {
        setGenderCode(JSON.parse(event.data.content))
      }
      setPageLoading(false)
    }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        cardBordered
        loading={pageLoading}
        editable={{
          type: 'multiple',
        }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: false,
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 15,
        }}
        dateFormatter="string"
        headerTitle="题目列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsModalOpen(true);
            }}
            type="primary"
          >
            Ai添加题目
          </Button>,
        ]}
      />

      <Modal title="ai生题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <MDEditor
          value={codeValue}
          onChange={setCodeValue}
          textareaProps={{
            placeholder:
              '示例：请帮我生成10道小学4年级的python练习题，设计到的知识点有： 条件控制，变量，循环',
          }}
        />
      </Modal>
      <Modal open={isgenderCode} onCancel={() => setIsGenderCode(false)} onOk={hanldeOKIsGenderCode}>
        <ReactJson src={genderCode} />
      </Modal>
    </PageContainer>
  );
}

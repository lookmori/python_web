import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import MDEditor from '@uiw/react-md-editor';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import ReactJson from 'react-json-view';
import { CozeAPI } from '@coze/api';


export default function Index() {
  const actionRef = useRef(null);
  const [genderCode, setGenderCode] = useState({
    "output": [
      {
        "示例输入": "无",
        "示例输出": "Hello, World!",
        "问题名": "打印问候语",
        "问题描述": "编写一个程序，输出'Hello, World!'",
        "问题日期": "2023-10-12",
        "问题标签": [
          "print语句"
        ],
        "问题答案": "print('Hello, World!')"
      },
      {
        "示例输入": "小明",
        "示例输出": "你好，小明！",
        "问题名": "姓名问候",
        "问题描述": "输入你的名字，输出'你好，[名字]！'",
        "问题日期": "2023-10-12",
        "问题标签": [
          "input",
          "字符串拼接"
        ],
        "问题答案": "name = input()\nprint(f'你好，{name}！')"
      },
      {
        "示例输入": "3\n5",
        "示例输出": "8",
        "问题名": "两数之和",
        "问题描述": "输入两个整数，输出它们的和",
        "问题日期": "2023-10-12",
        "问题标签": [
          "变量",
          "类型转换"
        ],
        "问题答案": "a = int(input())\nb = int(input())\nprint(a + b)"
      },
      {
        "示例输入": "4",
        "示例输出": "偶数",
        "问题名": "判断奇偶数",
        "问题描述": "输入一个整数，如果是偶数输出'偶数'，否则输出'奇数'",
        "问题日期": "2023-10-12",
        "问题标签": [
          "if语句"
        ],
        "问题答案": "num = int(input())\nprint('偶数' if num % 2 == 0 else '奇数')"
      },
      {
        "示例输入": "无",
        "示例输出": "1\n2\n3\n4\n5",
        "问题名": "打印数字序列",
        "问题描述": "输出1到5的数字，每个占一行",
        "问题日期": "2023-10-12",
        "问题标签": [
          "for循环"
        ],
        "问题答案": "for i in range(1,6):\n    print(i)"
      },
      {
        "示例输入": "apple",
        "示例输出": "elppa",
        "问题名": "字符串反转",
        "问题描述": "输入一个单词，输出反转后的结果",
        "问题日期": "2023-10-12",
        "问题标签": [
          "字符串操作"
        ],
        "问题答案": "s = input()\nprint(s[::-1])"
      },
      {
        "示例输入": "3\n4",
        "示例输出": "12",
        "问题名": "计算矩形面积",
        "问题描述": "输入长和宽，输出矩形面积",
        "问题日期": "2023-10-12",
        "问题标签": [
          "乘法运算"
        ],
        "问题答案": "l = int(input())\nw = int(input())\nprint(l * w)"
      },
      {
        "示例输入": "2\n3\n4",
        "示例输出": "3.0",
        "问题名": "求平均数",
        "问题描述": "输入三个数，输出它们的平均数（保留1位小数）",
        "问题日期": "2023-10-12",
        "问题标签": [
          "算术运算"
        ],
        "问题答案": "a = float(input())\nb = float(input())\nc = float(input())\nprint(f'{(a+b+c)/3:.1f}')"
      },
      {
        "示例输入": "2020",
        "示例输出": "是闰年",
        "问题名": "判断闰年",
        "问题描述": "输入年份，输出是否是闰年（能被4整除且不能被100整除，或能被400整除）",
        "问题日期": "2023-10-12",
        "问题标签": [
          "逻辑运算符"
        ],
        "问题答案": "year = int(input())\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print('是闰年')\nelse:\n    print('不是闰年')"
      },
      {
        "示例输入": "2",
        "示例输出": "2,4,6,8,10",
        "问题名": "简单乘法表",
        "问题描述": "输入数字n，输出n×1到n×5的结果，用逗号分隔",
        "问题日期": "2023-10-12",
        "问题标签": [
          "循环"
        ],
        "问题答案": "n = int(input())\nprint(','.join(str(n*i) for i in range(1,6)))"
      }
    ]
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

// Our official coze sdk for JavaScript [coze-js](https://github.com/coze-dev/coze-js)



  // 生成题目确定后添加到数据库
  const hanldeOKIsGenderCode = () => {};
  const handleOk = async () => {
    setIsModalOpen(false);
    console.log(codeValue);
    setIsGenderCode(true)
    // const apiClient = new CozeAPI({
    //   token: 'pat_4i3iAhP9W6dyCueGZ00ZRNTcvzV2M1PUOzVUz1BBJXlcaWMKsBz2T4JH3GP6qFtF',
    //   baseURL: 'https://api.coze.cn/',
    //   allowPersonalAccessTokenInBrowser: true
    // });
    // const res = await apiClient.workflows.runs.stream({
    //   workflow_id: '7477892587513479168',
    //   bot_id: '7475993452724617257',
    //   parameters: {
    //   "input": codeValue
    // },
    // })
    // for await (const event of res) {
    //   if (event.data) {
    //     console.log(event);
    //     console.log(event.data.content,'c');
    //     console.log(JSON.stringify(event.data.content),'c');
    //     setGenderCode(event.data.content)
        
    //   }
    // }
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        cardBordered
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
              '请帮我生成10道小学4年级的python练习题，设计到的知识点有： 条件控制，变量，循环',
          }}
        />
      </Modal>
      <Modal open={isgenderCode} onCancel={() => setIsGenderCode(false)} onOk={hanldeOKIsGenderCode}>
        <ReactJson src={genderCode} />
      </Modal>
    </PageContainer>
  );
}

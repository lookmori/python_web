import { PageContainer } from '@ant-design/pro-components';
import { Badge, Button, Card, Descriptions, DescriptionsProps, Divider, Modal } from 'antd';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';


export default function Ask_question({name,des,ex_in,ex_out,status,code}) {
  const editorRef = useRef(null)
  const [value,setValue] = useState('# python')
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleMount(editor:any,_monaco: any) {
    editorRef.current = editor
  }

  function changeValue(value: any) {
    setValue(value)
  }
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '问题名',
      children: 'Zhou Maomao',
      span: 4,
    },
    {
      key: '2',
      label: '问题详情',
      children: '1810000000',
      span: 4,
    },
    {
      key: '3',
      label: '示例输入',
      children: 'Hangzhou, Zhejiang',
      span: 4,
    },
    {
      key: '4',
      label: '示例输出',
      span: 4,
      children: <p>hello</p>,
    },
  ];
  return (
    <PageContainer>
      <Modal
        title="答案"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <code>{code}</code>
      </Modal>
      <Card extra={<Button type="primary" onClick={() => setVisible(true)}>查看答案</Button>}>
        <Badge.Ribbon
          text={status === '1' ? '已完成' : status === '0' ? '未完成' : '错误'}
          color={status === '1' ? 'cyan' : status === '0' ? 'gray' : 'red'}
        >
          <Descriptions
            title=""
            layout="vertical"
            items={items}
            labelStyle={{ fontSize: 16, fontWeight: 700, color: 'black' }}
          />
        </Badge.Ribbon>
      </Card>

      <Divider style={{ borderColor: '#1677ff' }}>代码区</Divider>
      <Card extra={<Button type="primary">提交代码</Button>}>
        <Editor
          height="50vh"
          defaultLanguage="Python"
          defaultValue={value}
          onMount={handleMount}
          onChange={changeValue}
        />
      </Card>
    </PageContainer>
  );
}

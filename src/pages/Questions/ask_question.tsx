import { PageContainer } from '@ant-design/pro-components';
import { Badge, Button, Card, Descriptions, DescriptionsProps, Divider, Modal } from 'antd';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';


export default function Ask_question({name,des,ex_in,ex_out,status,code}) {
  const [codeValue,setCodeValue] = useState(`## 问题描述

计算两数之和

## 问题名

## 示例输入
1，2
## 示例输出

3
## 参考答案

\`\`\`python
a = input()
b = input()
print(a+b)
\`\`\`
`)
  const editorRef = useRef(null)
  const [value,setValue] = useState('# python')
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleMount(editor:any,_monaco: any) {
    editorRef.current = editor
  }

  function changeValue(value: any) {
    setValue(value)
    console.log(value,'value');
    
  }

  function pushCode() {

  }
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
            <MDEditor.Markdown source={codeValue} style={{ whiteSpace: 'pre-wrap' }} />
        </Badge.Ribbon>
      </Card>

      <Divider style={{ borderColor: '#1677ff' }}>代码区</Divider>
      <Card extra={<Button type="primary" onClick={() => pushCode()}>提交代码</Button>}>
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

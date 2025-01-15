import { PageContainer, ProForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import MDEditor from '@uiw/react-md-editor';
import { Card, Divider, Space } from 'antd';
import React, { useState } from 'react'

export default function PubQues() {
    const [codeValue,setCodeValue] = useState('')
  return (
    <PageContainer>
      <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ProForm<{
          ques_name: string;
          ques_in?: string;
          ques_out?: string;
          ques_detail?: string;
          ques_status?: string;
        }>
          onFinish={async (values) => {
            console.log(values);
          }}
          submitter={{
            searchConfig: {
              submitText: '发布',
            },
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
          }}
          layout="vertical"
          formKey="base-form-use-demo"
          autoFocusFirstInput
        >
          <ProFormRadio.Group
            name="ques_status"
            label="问题难度"
            options={[
              {
                label: '简单',
                value: '0',
              },
              {
                label: '中等',
                value: '1',
              },
              {
                label: '困难',
                value: '-1',
              },
            ]}
            rules={[{ required: true }]}
          />
          <ProFormText
            width="lg"
            name="ques_name"
            label="问题名"
            placeholder="请输入问题名称"
            rules={[{ required: true, message: '这是必填项' }]}
          />
          <ProFormTextArea
            width="lg"
            name="ques_detail"
            label="问题详情"
            rules={[{ required: true, message: '这是必填项' }]}
          />
          <ProFormText
            width="lg"
            name="ques_in"
            label="示例输入"
            placeholder="请输入示例输入"
            rules={[{ required: true, message: '这是必填项' }]}
          />
          <ProFormText
            width="lg"
            name="ques_out"
            label="示例输出"
            placeholder="请输入示例输出"
            rules={[{ required: true, message: '这是必填项' }]}
          />
          <Divider plain>参考代码</Divider>
          <div
            style={{
              width: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
            }}
          >
            <MDEditor value={codeValue} preview="edit" onChange={(value) => setCodeValue(value)} />
            <MDEditor.Markdown source={codeValue} style={{ whiteSpace: 'pre-wrap' }} />
          </div>
        </ProForm>
      </Card>
    </PageContainer>
  );
}

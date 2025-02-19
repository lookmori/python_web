import React from 'react'


import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import { history } from '@umijs/max';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};



const columns: ProColumns[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '试卷名称',
    dataIndex: 'title',
    copyable: true,
  },
  {
    dataIndex: 'publishTeacher',
    title: '发布老师',
    key: 'publishTeacher',
    search: true,
    valueType: 'select',
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
        }}
      >
        编辑
      </a>,
      <a key='del' onClick={() => {}}>
      删除
      </a>,
    ],
  },
];

export default function Exaimworkpaper()  {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      options={false}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
            history.push('/weekquestion');
          }}
          type="primary"
        >
          新建试卷
        </Button>,
      ]}
    />
  );
};

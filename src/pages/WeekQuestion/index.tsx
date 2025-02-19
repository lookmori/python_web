import {
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Card } from 'antd';

const SelectWord = ['A','B','C','D','E','F','H']
const Demo = () => {
  return (
    <Card>
      <ProForm
        layout="horizontal"
        onFinish={async (values) => {
          console.log(values);
          return true;
        }}
      >
        <ProFormText style={{ padding: 0 }} width="xl" name="name" label="作业标题" />
        <ProFormList
          name="attributes"
          label=""
          creatorButtonProps={{
            creatorButtonText: '添加问题',
          }}
          min={1}
          copyIconProps={false}
          itemRender={({ listDom, action }, { index }) => (
            <ProCard
              bordered
              style={{ marginBlockEnd: 8 }}
              title={`第${index + 1}题`}
              extra={action}
              bodyStyle={{ paddingBlockEnd: 0 }}
            >
              {listDom}
            </ProCard>
          )}
          creatorRecord={{ name: '', items: [{ name: '' }] }}
          // initialValue={[{ name: '颜色', items: [{ name: '红' }, { name: '黄' }] }]}
        >
          <ProFormTextArea style={{ padding: 0 }} width="xl" name="name" label="问题" />
          <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="问题选项">
            <ProFormList
              name="items"
              creatorButtonProps={{
                creatorButtonText: '新建',
                icon: false,
                type: 'link',
                style: { width: 'unset' },
              }}
              min={4}
              copyIconProps={false}
              deleteIconProps={{ tooltipText: '删除' }}
              itemRender={({ listDom, action }, { index }) => (
                <div
                  style={{
                    display: 'inline-flex',
                    marginInlineEnd: 25,
                  }}
                >
                  <span style={{margin:'5px 10px 0'}}> {`${SelectWord[index]}`}</span>
                  
                  {listDom}
                  {action}
                </div>
              )}
            >
              <ProFormText allowClear={false} width="xs" name={['name']} />
            </ProFormList>
          </ProForm.Item>
        </ProFormList>
      </ProForm>
    </Card>
  );
};

export default Demo;

export default `
import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
import { Col, Form, Input, message, Row, Space } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import React from 'react';
import styles from './index.less';
import { useState } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(LAYOUT_TYPE_HORIZONTAL);

  const [grid, setGrid] = useState(true);

  return (
    <div className={styles['pro-form-wrap']}>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        layout={formLayoutType}
        grid={grid}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0]
        }}
        labelCol={{ flex: '100px' }}
        labelWrap
        submitter={{
          render: (props, doms) => {
            return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
              <Row justify='space-around' style={{ paddingTop: 24 }}>
                <Space>{doms}</Space>
              </Row>
            ) : (
              doms
            );
          }
        }}
        onFinish={async values => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        params={{}}
        request={async () => {
          await waitTime(100);
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
            company: '小鹏汇天'
          };
        }}
      >
        <ProFormRadio.Group
          label='标签布局'
          radioType='button'
          fieldProps={{
            value: formLayoutType,
            onChange: e => setFormLayoutType(e.target.value)
          }}
          colProps={{
            span: 20
          }}
          options={['horizontal', 'vertical', 'inline']}
        />
        <ProFormSwitch
          colProps={{
            span: 4
          }}
          fieldProps={{
            onChange: setGrid
          }}
          initialValue={true}
          label='grid开关'
          name='grid'
        />
        <ProFormText
          rules={[{ required: true, message: '请输入名称' }]}
          name='name'
          label='标题'
          tooltip='最长为 24 位'
          placeholder='请输入名称'
        />
        <ProFormText readonly colProps={{ md: 12, xl: 8 }} name='company' label='姓名' />
        <ProFormDigit colProps={{ md: 12, xl: 8 }} name='phone' label='电话' />
        <ProFormText colProps={{ md: 12, xl: 8 }} name='email' label='邮箱' />
        <ProFormTextArea colProps={{ span: 24 }} name='address' label='详细的工作地址或家庭住址' />
        <ProFormDatePicker width='xl' colProps={{ xl: 8, md: 12 }} label='入职日期' name='date' />
        <ProFormDateRangePicker
          width='xl'
          colProps={{ xl: 8, md: 12 }}
          label='工作周期'
          name='dateRange'
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label='职位'
          name='level'
          valueEnum={{
            1: 'front end',
            2: 'back end',
            3: 'full stack'
          }}
        />
        <Col span={8}>
          <Form.Item
            name='custom'
            label='自定义项'
            rules={[{ required: true, message: '请输入自定义项' }]}
          >
            <Input allowClear />
          </Form.Item>
        </Col>
      </ProForm>
    </div>
  );
};
`;

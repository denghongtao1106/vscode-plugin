export default `
import type { FC } from 'react';
import { useRef } from 'react';
import React, { useState, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';

/**
 * 弹窗类组件
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/ban-types
type TemplateProps = {} & ModalProps;

const ModalTemplate: FC<TemplateProps> = ({ visible = false, onOk, onCancel }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const handleModalOk = () => {
    //do something in this business component
    formRef.current?.validateFieldsReturnFormatValue?.().then(values => {
      onOk?.(values);
    });
  };

  const handleModalCancel = (e: React.MouseEvent<HTMLElement>) => {
    //do something in this business component
    onCancel?.(e);
  };

  return (
    <Modal
      width={600}
      title='标题'
      destroyOnClose
      visible={modalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        preserve={false}
        formRef={formRef}
        labelCol={{ flex: '130px' }}
        layout='horizontal'
        submitter={false}
      >
        <ProFormText
          rules={[{ required: true, message: '签约客户名称' }]}
          name='name'
          label='签约客户名称'
          tooltip='最长为 24 位'
          placeholder='请输入名称'
        />
        <ProFormText name='company' label='我方公司名称' placeholder='请输入名称' />
        <ProFormText name={['contract', 'name']} label='合同名称' placeholder='请输入名称' />
      </ProForm>
    </Modal>
  );
};

export default ModalTemplate;
`;

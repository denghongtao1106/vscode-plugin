export default `
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(10).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: \`活动名称\$\{index\}\`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000'
  };
});

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map(item => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项'
          }
        ]
      }
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error'
        },
        closed: {
          text: '已解决',
          status: 'Success'
        }
      }
    },
    {
      title: '描述',
      dataIndex: 'decs'
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      }
    }
  ];

  return (
    <div className={styles['edit-table-page']}>
      <EditableProTable<DataSourceType>
        size='small'
        headerTitle='可编辑表格'
        columns={columns}
        rowKey='id'
        scroll={{
          x: 960
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now()
          })
        }}
        toolBarRender={() => {
          return [
            <Button
              type='primary'
              key='save'
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys
        }}
      />
    </div>
  );
};
`;

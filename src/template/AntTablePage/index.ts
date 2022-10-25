export default `
import { Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.less';
import React from 'react';
import XpTag from '@/components/XpTag';
import { formatTime } from '@/common/utils';
import type { XphtFile } from '@/types/common';
import DownloadAndPreview from '@/components/DownloadAndPreview';

interface DataType {
  key: string;
  name: string;
  status: number;
  completeStatus: string;
  attachments: XphtFile[];
  createTime: string;
}

const valueEnum: Record<number, string> = {
  0: '未提交',
  1: '已提交'
};

const typeEnum: Record<number, React.ReactNode> = {
  '1': <XpTag status='success'>未完成</XpTag>,
  '2': <XpTag status='processing'>已完成</XpTag>
};

const columns: ColumnsType<DataType> = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => valueEnum[status]
  },
  {
    title: '完成状态',
    dataIndex: 'completeStatus',
    key: 'completeStatus',
    render: completeStatus => typeEnum[completeStatus]
  },
  {
    title: '附件',
    dataIndex: 'attachments',
    key: 'attachments',
    render: attachments =>
      attachments?.length ? (
        <Space size={0} direction='vertical' style={{ width: '100%' }}>
          {attachments?.map((attachment: XphtFile) => (
            <DownloadAndPreview key={attachment.fileId} path={attachment.fileUrl}>
              <p style={{ width: '100%', textAlign: 'left' }}>
                <Typography.Link>{attachment.fileName}</Typography.Link>
              </p>
            </DownloadAndPreview>
          ))}
        </Space>
      ) : (
        '-'
      )
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: createTime => formatTime(createTime, 'YYYY-MM-DD HH:mm')
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <a>邀请</a>
        <a>删除</a>
      </Space>
    )
  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    status: 0,
    completeStatus: '1',
    attachments: [],
    createTime: '2022-08-30T06:27:59.463Z'
  },
  {
    key: '2',
    name: 'Jim Green',
    status: 1,
    completeStatus: '1',
    attachments: [{ fileId: '1', fileName: '附件1.jpg', fileUrl: 'http://www.baidu.com' }],
    createTime: '2022-08-30T06:27:59.463Z'
  },
  {
    key: '3',
    name: 'Joe Black',
    status: 0,
    completeStatus: '2',
    attachments: [],
    createTime: '2022-08-30T06:27:59.463Z'
  }
];

const AntdTablePage: React.FC = () => (
  <div className={styles['antable-wrapper']}>
    <Table size='small' columns={columns} dataSource={data} pagination={false} />
  </div>
);

export default AntdTablePage;

`;

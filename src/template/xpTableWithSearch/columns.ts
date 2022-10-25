export default `
import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { Space, Badge, Typography, Input } from 'antd';
import type { XphtFile } from '@/types/common';
import DownloadAndPreview from '@/components/DownloadAndPreview';
import { formatTime } from '@/common/utils';
import { COMMON_YES_NO_ENUM } from '@/common/constant/common';

export type XpTablePageColumnsProps = {
  id: string;
  isNew: number;
  title: string;
  attachments: XphtFile[];
  createTime: string;
};

const TEMPLATE_ENUM: Record<number, string> = {
  1: '已回复',
  2: '未回复'
};

export const columns = (clickEvent: (record: XpTablePageColumnsProps) => void) => {
  const column: ProColumns<XpTablePageColumnsProps>[] = [
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        ...TEMPLATE_ENUM
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      hideInTable: true,
      renderFormItem: (_, { type, defaultRender, ...fieldProps }, form) => {
        if (type === 'form') {
          return null;
        }
        const status = form.getFieldValue('state');
        if (status !== 'open') {
          return (
            <Input
              {...fieldProps}
              allowClear
              // 自定义配置
              placeholder='请输入标题'
            />
          );
        }
        return defaultRender(_);
      }
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      fixed: 'left',
      width: 160,
      hideInSearch: true,
      renderText: (title: string, record: XpTablePageColumnsProps) => (
        <Badge dot={record.isNew === COMMON_YES_NO_ENUM.no}>
          <Typography.Link onClick={() => clickEvent(record)}>{title}</Typography.Link>
        </Badge>
      )
    },
    {
      title: '附件',
      dataIndex: 'attachments',
      valueType: 'text',
      width: 120,
      hideInSearch: true,
      renderText: (attachments: XphtFile[]) => {
        if (!attachments?.length) {
          return '-';
        }
        return (
          <Space size={0} direction='vertical' style={{ width: '100%' }}>
            {attachments?.map((attachment: XphtFile) => (
              <DownloadAndPreview key={attachment.fileId} path={attachment.fileUrl}>
                <p style={{ width: '100%', textAlign: 'left' }}>
                  <Typography.Link>{attachment.fileName}</Typography.Link>
                </p>
              </DownloadAndPreview>
            ))}
          </Space>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      width: 100,
      hideInSearch: true,
      renderText: (createTime: string) => {
        return formatTime(new Date(createTime), 'YYYY-MM-DD HH:mm');
      }
    }
  ];
  return column;
};
`;

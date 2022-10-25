export default `
import { COMMON_YES_NO_ENUM, PAGE, PAGE_SIZE } from '@/common/constant/common';
import React, { useRef } from 'react';
import XpTable from '@/components/XpTable';
import type { FC } from 'react';
import { parseRangerTime } from '@/common/utils';
import type { ActionType } from '@ant-design/pro-table';
import type { XpTablePageColumnsProps } from './columns';
import { columns } from './columns';

/**
 * xpTable表格页模板
 */

type XpTablePageProps = {};

const XpTablePage: FC<XpTablePageProps> = () => {
  const tableRef = useRef<ActionType>();

  //数据格式化
  const formatTableData = (data: any) => {
    return data?.map((item: any) => ({
      id: item.id,
      isNew: item.isNew,
      title: item.title,
      attachments: item.attachmentList?.map((attach: any) => ({
        fileId: attach.uid,
        fileName: attach.name,
        fileUrl: attach.url
      })),
      createTime: item.publishTime
    }));
  };

  //假请求
  const fakeRequest = (params: any) => {
    console.log(params);
    return Promise.resolve({
      code: 2000,
      success: true,
      count: 1,
      data: [
        {
          id: 1,
          isNew: COMMON_YES_NO_ENUM.yes,
          title: '我是表格模板',
          attachmentList: [
            {
              uid: '1',
              name: '模板附件',
              url: 'http://images.gongzuoshouji.cn/teacher/2021-08-09/84751fbcf153487f868a21a77048d19c.jpg'
            }
          ],
          publishTime: '2022-08-30T06:27:59.463Z'
        }
      ]
    });
  };

  //分页数据请求处理
  const getDataList = async (
    params: XpTablePageColumnsProps & {
      pageSize: number;
      current: number;
    }
  ) => {
    const { current, pageSize, title, createTime } = params;

    const [startCreateTime, endCreateTime] = parseRangerTime(createTime);

    const formatParams = {
      page: current || PAGE,
      size: pageSize || PAGE_SIZE,
      param: {
        title,
        startTime: startCreateTime,
        endTime: endCreateTime
      }
    };
    const { data, success, count } = await fakeRequest(formatParams);

    const formatData = formatTableData(data);

    return Promise.resolve({
      data: formatData,
      success: success,
      total: count
    });
  };

  const clickEvent = (record: XpTablePageColumnsProps) => {
    //do something
    console.log(record);
  };

  return (
    <XpTable
      actionRef={tableRef}
      rowKey='id'
      columns={columns(clickEvent)}
      request={getDataList}
      pagination={{
        showSizeChanger: true
      }}
      search={{
        labelWidth: 'auto',
        span: 6
      }}
    />
  );
};

export default XpTablePage;
`;

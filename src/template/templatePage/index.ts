export default `
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import styles from './index.less';

/**
 * 模板页
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/ban-types
type TemplateProps = {};

const Template: FC<TemplateProps> & { title: string } = () => {
  const [base, setBase] = useState(1);

  const init = () => {
    setBase(2);
    console.log(base);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles['template-page']}>我是模板页</div>;
};

Template.title = '模版';

export default Template;
`;

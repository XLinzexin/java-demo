import React from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import OrderCreate from './OrderCreate'
import OrderHandler from './OrderHandler'
export default () => {
  return (
    <Row>
      <Col span={12}>
        <OrderCreate></OrderCreate>
      </Col>
      <Col span={12}>
        <OrderHandler></OrderHandler>
      </Col>
    </Row>
  );
}

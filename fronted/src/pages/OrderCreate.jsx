import { useRequest } from 'ahooks';
import { Button } from 'antd';

export default ()=>{
  const createOrder = useRequest({
    url:'123',
    method:"post"
  })
  return <div id="components-button-demo-basic">
      <Button type="primary">创建1个订单</Button>
      <Button>创建10个订单</Button>
  </div>
}
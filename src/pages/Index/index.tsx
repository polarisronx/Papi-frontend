// @ts-ignore
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { List,message } from 'antd';
import { TrophyFilled } from '@ant-design/icons';
import { listInterfaceInfoByPageUsingGet } from '@/services/openAPI-backend/interfaceInfoController';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = () =>{
  
  // 定义状态和钩子函数，使用 useState 和 泛型来定义组件内的状态
  // 加载状态
  const [loading, setLoading] = useState(true);
  // 列表数据
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  // 总数
  const [total, setTotal] = useState<number>(0);

  // 定义异步加载数据的函数
  const fetchData = async (current=1,pageSize=5) => {
    //开始加载数据，设置loading状态为true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,        
      });
      // 将请求返回的数据设置到列表数据状态中
      setList(res?.data?.records??[]);
      // 请请求返回的总数设置到总数状态中
      setTotal(res?.data?.total??0);
    } // 捕获请求失败时的错误信息
    catch (error:any){
      //请求失败时的错误信息
      message.error('请求失败，'+error?.message);
    }
    // 数据加载完成，设置 loading 的状态为 false
    setLoading(false);
  };


  useEffect(() => {
    // 页面加载完成后调用加载数据的函数
    fetchData();
  },[]);


  return (  
    <PageContainer title="PApi 在线开放接口平台">
      <List
          className="papi-interface-list"
          // 设置 loading 属性，表示数据是否在加载中
          loading={loading}
          itemLayout="horizontal"
          // 将列表数据作为数据源传递给list组件
          dataSource={list}
          // 渲染每个列表项
          renderItem={(item) => {
            // 构建列表项的链接地址
            const apiLink = `/interface_info/${item.id}`;
            return (
              // 显示 接口详情 链接
              <List.Item actions={[<a key={item.id} href={apiLink}>接口详情</a>]}>
                <List.Item.Meta
                  // 列表项标题显示未可点击的链接
                  title={<a href={apiLink}>{item.name}</a>}
                  // 列表项描述 
                  description={item.description}
                />
              </List.Item>
            );
          }}
          pagination={{
            // 自定义显式总数
            // eslint-disable-next-line @typescript-eslint/no-shadow
            showTotal(total: number) {
              return '总数：' + total;
            },
            // 每页显式条数
            pageSize: 5,
            // 总数，从状态中获取
            total,
            // 切换页面出发的回调函数
            onChange(page, pageSize) {
              // 加载对应页面的数据
              fetchData(page, pageSize);
            },
          }}
        />
        
    </PageContainer>
  );
};

export default Index;

// @ts-ignore
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import {Button, Card, Descriptions, Form, message, Input, Spin, Divider,Badge} from 'antd';
import { TrophyFilled } from '@ant-design/icons';
import { getInterfaceInfoByIdUsingGet } from '@/services/openAPI-backend/interfaceInfoController';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const Index: React.FC = () =>{
  // 定义状态和钩子函数
  // 使用 useState 和 泛型来定义组件内的状态
  // 加载状态
  const [loading, setLoading] = useState(true);
  // 列表数据
  const [data, setData] = useState<API.InterfaceInfo>();
  // 总数
  const [total, setTotal] = useState<number>(0);
  // 使用 useParams 钩子函数来获取路由参数
  const params = useParams();

  // 定义异步加载数据的函数
  const fetchData = async (current=1,pageSize=5) => {
    // 检查路由参数是否存在
    if (!params.id) {
      message.error('参数错误');
      return;
    }
    //开始加载数据，设置loading状态为true
    setLoading(true);
    try {
      // 调用接口获取数据
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),      
      });
      // 将获取到的接口信息设置到 data 中
      setData(res.data);
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
    <PageContainer title="在线接口文档">
       <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? <Badge status="processing" text="Processing" /> : <Badge status="error" text="Error" />}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
        
    </PageContainer>
  );
};

export default Index;

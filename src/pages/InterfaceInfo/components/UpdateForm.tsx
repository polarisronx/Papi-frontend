import {
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect,useRef} from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { values } from 'lodash';

// 定义该组件要接收的哪些参数、属性
export type Props = {
  // 直接借用表单管理页表格的 columns
  columns: ProColumns<API.InterfaceInfo>[];
  // 当用户点击取消按钮时触发
  onCancel: () => void;
  // 当用户提交表单时，将用户输入的数据作为参数传递给后台
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 模态框是否可见
  visible: boolean;
  // 需要传递 values 修改前的信息
  values: API.InterfaceInfo;
};

// 定义更新模态框组件
const UpdateModal: React.FC<Props> = (props) => {
  // 从props中解构出需要的参数
  const {values,visible,columns,onCancel,onSubmit} = props;

  // 使用 React 的 useRef 创建一个引用以访问 ProTable 中的表单实例
  const proTableRef = React.useRef<ProFormInstance>();

  // 防止修改的表单内容在初次初始化后就不在变化，要监听Values的变化
  // 用React的useEffect在值发生改变时能更新表单的值
  useEffect(() => {
    if(proTableRef){
      proTableRef.current?.setFieldsValue(values);
    }
  },[values]);
  return (
    // 创建一个modal组件，通过visible属性控制其显示或隐藏。
    // footer 设置为null，这样能把表单项的取消和确认按钮去掉
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      {/* 创建一个ProTable组件，设定它为表单类型，通过columns属性设置表格的列，
      提交表单时调用onSubmit函数 */}
  
      <ProTable 
        type="form"
        form={proTableRef} 
        columns={columns} 
        onSubmit={ async (value) => {onSubmit?.(value);}} 
      />
    </Modal>
    )
}

export default UpdateModal;

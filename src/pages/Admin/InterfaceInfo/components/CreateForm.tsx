import {
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';

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
  // 不需要传递 values
  // values: Partial<API.RuleListItem>;
};
const CreateModal: React.FC<Props> = (props) => {
  // 从props中解构出需要的参数
  const {visible,columns,onCancel,onSubmit} = props;

  return (
    // 创建一个modal组件，通过visible属性控制其显示或隐藏。
    // footer 设置为null，这样能把表单项的取消和确认按钮去掉
    <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
      {/* 创建一个ProTable组件，设定它为表单类型，通过columns属性设置表格的列，
      提交表单时调用onSubmit函数 */}
      <ProTable 
        type="form" 
        columns={columns} 
        onSubmit={ async (value) => {onSubmit?.(value);}} 
      />
    </Modal>
    )
}

export default CreateModal;

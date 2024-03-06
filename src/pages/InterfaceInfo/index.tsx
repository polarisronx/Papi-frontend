import { addRule, removeRule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {addInterfaceInfoUsingPost, listInterfaceInfoByPageUsingGet} from "@/services/openAPI-backend/interfaceInfoController";
import CreateModal from './components/UpdateForm';


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  // 模态框的变量都在TableList组件里，所以把 增删改 handleAdd handleUpdate handleDelete 都放进来
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields // 修改参数的类型为 InterfaceInfo
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      // 原先是添加规则 Rule, 现在要改为我们自己的方法
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      return true;
    } catch (error) {
      hide();
      message.error('Adding failed, please try again!');
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
      await updateRule({
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      });
      hide();
      message.success('Configuration is successful');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      await removeRule({
        key: selectedRows.map((row) => row.key),
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      return true;
    } catch (error) {
      hide();
      message.error('Delete failed, please try again');
      return false;
    }
  };
  
  
  
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id', // 要显示的列名
      dataIndex: 'id', // 对应字段名
      // tip: render: 渲染类型,默认text
      valueType: 'index',// 数据类型
    },
    // {
    //   title: '规则名称',
    //   dataIndex: 'name',
    //   tip: 'The rule name is the unique key',
    //   render: (dom, entity) => {
    //     return (
    //       <a
    //         onClick={() => {
    //           setCurrentRow(entity);
    //           setShowDetail(true);
    //         }}
    //       >
    //         {dom}
    //       </a>
    //     );
    //   },
    // },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '描述',
      // description对应后端的字段名
      dataIndex: 'description ',
      //展示的文本为富文本编辑器
      valueType: 'textarea',
    },
    {
      title:'请求方法',
      dataIndex : 'method',
      valueType: 'text ' ,
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea ' ,
    },
    {
      title: '状态',
      dataIndex: 'status ',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status : ' Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime ',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime ',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
       
      ],
    },
  ];
  // 页面的内容
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await listInterfaceInfoByPageUsingGet({
            ...params
          })
          // 如果能够从后端获取返回的接口信息
          if (res?.data) {
            // 返回一个包含数据、成功状态和数据条数的对象
            return {
              data: res?.data.records || [],
              success: true,
              total: res?.data.total || 0,
            }
          } else {
            // 如果数据不存在，返回一个空数组，失败的状态和总数为零
            return {
              data: [],
              success: false,
              total: 0,
            }
          }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        // 当点击取消按钮时，设置更新模态框为false来隐藏模态窗口
        onCancel={() => {
          handleModalOpen(false);
        }}
        // 当点击确认按钮时，调用handleAdd函数来添加数据，去请求后端添加数据
        // 这里报错时因为组件的属性和外层的不一致，可以不管
        onSubmit={(values) =>{
          handleAdd(values);
        }}
        // 根据 visible 的值决定模态窗口是否显示
        visible={createModalOpen}
        />
    </PageContainer>
  );
};
export default TableList;

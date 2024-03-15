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
import {addInterfaceInfoUsingPost, deleteInterfaceInfoUsingPost, listInterfaceInfoByPageUsingGet, offlineInterfaceInfoUsingPost, onlineInterfaceInfoUsingPost, updateInterfaceInfoUsingPost} from "@/services/openAPI-backend/interfaceInfoController";
import CreateModal from './components/CreateForm';
import UpdateModal from './components/UpdateForm';


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
  // 用于获取保存用户当前点击的数据项的 id
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);


  // 模态框的变量都在TableList组件里，所以把 增删改 handleAdd handleUpdate handleDelete 都放进来
  /**
   * @en-US Add Interface
   * @zh-CN 添加接口
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
      message.success('创建成功');
      // 创建成功后关闭模态框
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      // 创建失败提示 创建失败 和 报错信息
      message.error('创建失败，请重试' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update Interface
   * @zh-CN 更新接口
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    // 如果没有 选中行currentRow,直接返回
    if(!currentRow){
      return;
    }
    // 加载中时的提示设置为'修改中'
    const hide = message.loading('修改中');
    try {
      // 把原先updateRule改成我们的updateInterfaceInfoUsingPOST
      await updateInterfaceInfoUsingPost({
        id: currentRow.id,// 把id传进来
        ...fields, //... 表示至少有一个参数为fields
      });
      hide();
      // 调用成功时提示'操作成功'
      message.success('操作成功');
      return true;
    } catch (error:any) {
      hide();
      // 更新操作失败提示'操作失败'和报错信息
      message.error('操作失败，'+ error.message);
      return false;
    }
  };

  /**
   *  Delete Interface
   * @zh-CN 删除接口
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    // 设置加载中的提示为'正在删除'
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPost({
        // 把id传进来
        id: record.id,
      });
      hide();
      // 删除成功提示'删除成功'
      message.success('删除成功');
      // 删除成功则自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      // 删除失败提示'删除失败'和报错信息
      message.error('删除失败，'+ error.message);
      return false;
    }
  };

  /**
   *  Online Interface
   * @zh-CN 上线接口
   *
   * @param selectedRows
   */
  const handleOnline = async (record: API.InterfaceInfo) => {
    // 设置加载中的提示为'正在上线'
    const hide = message.loading('正在上线');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPost({
        // 把id传进来
        id: record.id,
      });
      hide();
      // 上线成功提示'上线成功'
      message.success('上线成功');
      // 上线成功则自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      // 上线失败提示'上线失败'和报错信息
      message.error('上线失败，'+ error.message);
      return false;
    }
  };


  /**
   *  Offline Interface
   * @zh-CN 下线接口
   *
   * @param selectedRows
   */
  const handleOffline = async (record: API.InterfaceInfo) => {
    // 设置加载中的提示为'正在下线'
    const hide = message.loading('正在下线');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPost({
        // 把id传进来
        id: record.id,
      });
      hide();
      // 下线成功提示'下线成功'
      message.success('下线成功');
      // 下线成功则自动刷新表单
      actionRef.current?.reload();
      return true;
    } catch (error:any) {
      hide();
      // 下线失败提示'下线失败'和报错信息
      message.error('下线失败，'+ error.message);
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

    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [{
          // 必填项
          required: true,
          message: '接口名称是必填项'
        }
        ]

      }
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
        // 上线和下线不同时出现
        record.status === 0? 
        (<a
          key="online"
          onClick={() => {
            handleOnline(record);
          }}
        >
          上线
        </a>)
        : record.status === 1?
        (<Button
          type="text"
          danger
          key="offline"
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button>
        ):null,
        <Button
        danger
        type="text"
        key="config"
        onClick={() => {
          handleRemove(record);
        }}
      >
        删除
      </Button>,

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
      {/* 之前是UpdateForm,现在改成UpdateModal */}
      <UpdateModal
        // 把columns传递进来，不然修改模态框没有表单项
        columns={columns}
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
        // visible 控制模态窗的开关，要传进来
        visible={updateModalOpen}
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

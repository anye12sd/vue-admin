// api统一接口管理
import {fetchPost, fetchGet} from "../utils/https";

/**
 * @param {string} params
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

// 用户登陆接口
export const userLogin = params => fetchPost('/open/admin/login', params);
// 获取管理员列表
export const getAdminList = params => fetchGet('/admin/list', params);
// 获取管理员详细
export const getAdminListDetail = params => fetchGet('/admin/detail', params);
// 获取客户留言列表
export const getCustomerMessageList = params => fetchGet('/admin/message/list', params);
// 获取客户留言列表详情
export const getCustomerMessageDetail = params => fetchGet('/admin/message/detail', params);
// 获取站点列表
export const getSiteList = params => fetchGet('/admin/layout/list', params);
// 获取已验证用户列表
export const getVerifiedCustomerList = params => fetchGet('/admin/user/list', params);
//站点微信群编号编辑
export const editWeixinNumber = params => fetchPost('/admin/layout/weixin/number/save', params);
// 删除管理员
export const deleteAdmin = params => fetchPost('/admin/delete', params);
// 添加新管理员
export const addNewAdmin = params => fetchPost('/admin/add', params);
// 修改管理员密码
export const changeAdminPassword = params => fetchPost('/admin/password/edit', params);
// 编辑管理员状态
export const changeAdmin = params => fetchPost('/admin/edit', params);
// 删除已验证客户
export const deleteVerifiedCustomer = params => fetchPost('/admin/user/delete', params);
// 重置已验证客户密码
export const resetVerifiedCustomerPassword = params => fetchPost('/admin/user/password/init', params);
// 停用客户帐号
export const closeVerifiedCustomer = params => fetchPost('/admin/user/close', params);
// 启用用户账号
export const startVerifiedCustomer = params => fetchPost('/admin/user/open', params);
// 获取权限控制列表
export const getAccessControlList = params => fetchGet('/admin/permission/menu/list', params);
// 添加权限管理用户
export const addAccessControlAdmin = params => fetchPost('/admin/permission/role/add', params);
// 编辑权限管理用户
export const editAccessControlAdmin = params => fetchPost('/admin/permission/role/edit', params);
// 删除权限管理用户
export const deleteAccessControlAdmin = params => fetchPost('/admin/permission/role/delete', params);
// 获取权限管理用户列表
export const getAccessControlAdminList = params => fetchGet('/admin/permission/role/list', params);
// 角色分配菜单权限
export const assignAccessControl = params => fetchPost('/admin/permission/role/assignment', params);
// 获取该角色菜单权限
export const getAssignedAccessControl = params => fetchGet('/admin/permission/role/assignment/list', params);
// 权限菜单添加
export const addAccessMenu = params => fetchPost('/admin/permission/menu/add', params);
// 权限菜单删除
export const deleteAccessMenu = params => fetchPost('/admin/permission/menu/delete', params);
// 权限菜单修改
export const editAccessMenu = params => fetchPost('/admin/permission/menu/edit', params);
// 获取菜单权限列表
export const getAccessMenu = params => fetchGet('/admin/permission/menu/list', params);
// 获取日志管理列表
export const getAdminLogList = params => fetchGet('/admin/log/list', params);
// 获取订单管理列表
export const getOrderList = params => fetchGet('/admin/order/list', params);
// 获取订单管理详情
export const getOrderListDetail = params => fetchGet('/admin/order/order/detail', params);
// 订单审核通过
export const doPassOrder = params => fetchPost('/admin/order/auditPass', params);
// 订单审核不通过
export const doNotPassOrder = params => fetchPost('/admin/order/auditNotPass', params);
// 管理员订单提交
export const submitOrder = params => fetchPost('/admin/order/order/submit', params);


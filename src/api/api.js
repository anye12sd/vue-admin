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
// 获取客户留言详情
export const getCustomerMessageDetail = params => fetchGet('/admin/message/detail', params);
// 获取站点列表
export const getSiteList = params => fetchGet('/admin/layout/list', params);
// 获取已验证用户列表
export const getVerifiedCustomerList = params => fetchGet('/admin/user/list', params);
// 站点微信群编号编辑
export const editWeixinNumber = params => fetchPost('/admin/layout/weixin/number/save', params);
// 界面编辑免密登录
export const postLoginToJihui = params => fetchPost('/admin/layout/login', params);
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
// 获取模块列表
export const getModuleList = params => fetchGet('/admin/pc/module/list', params);
// 获取网站审核列表
export const getAuditList = params => fetchGet('/admin/pc/layout/audit/list', params);
// 获取站点管理V4列表
export const getSiteManageV4List = params => fetchGet('/admin/pc/layout/list', params);
// 清除缓存
export const postClearCache = params => fetchPost('/admin/pc/layout/data/clear', params);
// 保存站点全局脚本
export const postSaveGlobalJs = params => fetchPost('/admin/pc/layout/globalJs/save', params);
// 保存站点全局样式
export const postSaveGlobalStyle = params => fetchPost('/admin/pc/layout/globalStyle/save', params);
// 获取站点详情
export const getLayoutDetail = params => fetchGet('/admin/pc/layout/detail', params);
// 下架案例
export const postSiteCaseOff = params => fetchPost('/admin/pc/layout/case/off', params);
// 上架案例
export const postSiteCaseOn = params => fetchPost('/admin/pc/layout/case/on', params);
// 下架模板
export const postSiteTemplateOff = params => fetchPost('/admin/pc/layout/template/off', params);
// 上架模板
export const postSiteTemplateOn = params => fetchPost('/admin/pc/layout/template/on', params);
// 删除网站
export const postSiteDelete = params => fetchPost('/admin/pc/layout/delete', params);
// 关闭网站
export const postSiteClose = params => fetchPost('/admin/pc/layout/close', params);
// 同账号内复制站点
export const postCopySite = params => fetchPost('/admin/pc/layout/copy', params);
// 获取站点所属管理员账号详细
export const getAdminSet = params => fetchGet('/admin/pc/layout/manage/detail', params);
// 移动端首屏图片修改
export const postEditMobilePic = params => fetchPost('/admin/pc/layout/mobile/pic/edit', params);
// 修改站点所属管理员账号
export const PostAdminSet = params => fetchPost('/admin/pc/layout/manage/edit', params);
// 复制站点到指定账号
export const postCopySiteToUser = params => fetchPost('/admin/pc/layout/copy/user', params);
// 获取已选择分类标签列表
export const getCategoryTagList = params => fetchGet('/admin/pc/category/tag/list', params);
// 保存站点所属标签
export const postSaveTags = params => fetchPost('/admin/pc/tags/save', params);
// 修改站点过期时间
export const postEndTimeEdit = params => fetchPost('/admin/pc/layout/expire/edit', params);
// 站点审核站点名称修改
export const postSiteNameEdit = params => fetchPost('/admin/pc/layout/name/edit', params);
// 还原已被删除的站点
export const postSiteRestore = params => fetchPost('/admin/pc/layout/restore', params);
// 获取模板审核列表
export const getTemplateList = params => fetchGet('/admin/pc/layout/template/list', params);
// 获取模块审核V4列表
export const getModuleVerifyV4List = params => fetchGet('/admin/pc/module/template/list', params);
// v4下架模块
export const postSiteModuleOff = params => fetchPost('/admin/pc/module/template/off', params);
// v4上架模块
export const postSiteModuleOn = params => fetchPost('/admin/pc/module/template/on', params);
// 获取模块审核V5列表
export const getModuleVerifyV5List = params => fetchGet('/admin/pc/module/template/list/v5', params);
// v5下架模块
export const postSiteModuleOffV5 = params => fetchPost('/admin/pc/module/template/off/v5', params);
// v5上架模块
export const postSiteModuleOnV5 = params => fetchPost('/admin/pc/module/template/on/v5', params);
// 获取域名绑定列表
export const getDomainBindList = params => fetchGet('/admin/pc/bind/list', params);
// 域名审核通过
export const postDomainBindPass = params => fetchPost('/admin/pc/bind/pass', params);
// 域名审核不通过
export const postDomainBindUnpass = params => fetchPost('/admin/pc/bind/unpass', params);
// 获取代理商订单列表
export const getAgentOrderList = params => fetchGet('/admin/pc/agent/order/list', params);
// 代理订单审核不通过
export const postAgentOrderUnpass = params => fetchPost('/admin/pc/agent/order/unPass', params);
// 代理订单审核通过
export const postAgentOrderPass = params => fetchPost('/admin/pc/agent/order/pass', params);
// 获取代理商列表
export const getAgentList = params => fetchGet('/admin/pc/agent/list', params);
// 获取代理商站点列表
export const getAgentLayoutList = params => fetchGet('/admin/agent/layout/list', params);
// 获取代理商详细
export const getAgentDetail = params => fetchGet('/admin/pc/agent/detail', params);
// 获取版块标签列表
export const getModuleTagList = params => fetchGet('/admin/pc/module/tag/list', params);
// 版块标签修改
export const postModuleTagEdit = params => fetchPost('/admin/pc/module/tag/edit', params);
// 版块标签新增
export const postModuleTagAdd = params => fetchPost('/admin/pc/module/tag/add', params);
// 版块标签删除
export const postModuleTagDelete = params => fetchPost('/admin/pc/module/tag/delete', params);
// 版块标签排序
export const postModuleTagSort = params => fetchPost('/admin/pc/module/tag/sort', params);
// 获取站点分类总列表
export const getCategoryList = params => fetchGet('/admin/pc/layout/category/list', params);
// 站点分类添加
export const postCategoryAdd = params => fetchPost('/admin/pc/layout/category/add', params);
// 站点分类编辑
export const postCategoryEdit = params => fetchPost('/admin/pc/layout/category/edit', params);
// 站点分类删除
export const postCategoryDelete = params => fetchPost('/admin/pc/layout/category/delete', params);
// 站点分类排序
export const postCategorySort = params => fetchPost('/admin/pc/layout/category/sort', params);

// 获取站点分类标签列表
export const getLayoutCategoryTagList = params => fetchGet('/admin/pc/layout/category/tag/list', params);
// 站点分类标签修改编辑
export const postCategoryTagEdit = params => fetchPost('/admin/pc/layout/category/tag/edit', params);
// 站点分类标签修改添加
export const postCategoryTagAdd = params => fetchPost('/admin/pc/layout/category/tag/add', params);
// 站点分类标签修改排序
export const postCategoryTagSort = params => fetchPost('/admin/pc/layout/category/tag/sort', params);
// 站点分类标签修改删除
export const postCategoryTagDelete = params => fetchPost('/admin/pc/layout/category/tag/delete', params);

// 获取图片分类列表
export const getAlbumList = params => fetchGet('/admin/pc/album/list', params);
// 图片分类添加
export const postAlbumAdd = params => fetchPost('/admin/pc/album/add', params);
// 图片分类修改
export const postAlbumEdit = params => fetchPost('/admin/pc/album/edit', params);
// 图片分类排序
export const postAlbumSort = params => fetchPost('/admin/pc/album/sort', params);
// 图片分类排序
export const postAlbumDelete = params => fetchPost('/admin/pc/album/delete', params);
// 获取系统图片列表
export const getAlbumPicList = params => fetchGet('/admin/pc/album/att/list', params);
// 删除系统图片
export const postAlbumPicDelete = params => fetchPost('/admin/pc/album/att/delete', params);
// 获取模块内容替换进度查询
export const getModuleReplaceResult = params => fetchGet('/admin/pc/tool/module/replace/result', params);
// 模块内容替换
export const postModuleReplace = params => fetchPost('/admin/pc/tool/module/replace', params);
// 设计师账号模块转移
export const postModuleTransfer = params => fetchPost('/admin/pc/tool/module/transfer', params);
// 获取账号语言配置
export const getLanguageDetail = params => fetchGet('/admin/pc/tool/account/lang/config/detail', params);
// 获取账号语言配置
export const postLanguageSave = params => fetchPost('/admin/pc/tool/account/lang/config/save', params);
// 指派账号到代理商
export const postAgentBind = params => fetchPost('/admin/pc/tool/account/agent/bind', params);
// 取消指派账号到代理商
export const postCancelAgentBind = params => fetchPost('/admin/pc/tool/account/agent/unBind', params);
// 代理商充值
export const postAgentCharge = params => fetchPost('/admin/agent/account/add', params);
// 获取代理商充值记录列表
export const getAgentChargeList = params => fetchGet('/admin/agent/account/list', params);
// 代理商登录
export const getAgentLogin = params => fetchGet('/admin/agent/login', params);
// 获取代理商详细列表
export const getAgentDetailList = params => fetchGet('/admin/agent/list', params);
// 获取代理商配置信息详细
export const getAgentConfigDetail = params => fetchGet('/admin/agent/config/detail', params);
// 代理商配置信息保存
export const postAgentConfigEdit = params => fetchPost('/admin/agent/config/edit', params);
// 同平台产品数据互导
export const postProductTransfer = params => fetchPost('/admin/user/product/transfer', params);
// 同平台新闻数据互导
export const postNewsTransfer = params => fetchPost('/admin/user/news/transfer', params);

// 模块分类列表
export const getModuleCategoryList = params => fetchGet('/admin/pc/module/category/list', params);
// 模块分类新增
export const postAddModuleCategory = params => fetchPost('/admin/pc/module/category/add', params);
// 模块分类编辑
export const postEditModuleCategory = params => fetchPost('/admin/pc/module/category/edit', params);
// 模块分类排序
export const postSortModuleCategory = params => fetchPost('/admin/pc/module/category/sort', params);
// 模块分类删除
export const postDelModuleCategory = params => fetchPost('/admin/pc/module/category/delete', params);

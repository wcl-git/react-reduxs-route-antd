/**
 * Created by chenkaixia on 2017/7/21.
 */

/***
 * 资质信息
 */

const certificateBasePath = 'certificate/'
export const certificate = {
  base: certificateBasePath + 'base', //基本信息
  creditDetail: certificateBasePath + 'credit/detail/:id',
  creditEdit: certificateBasePath + 'credit/edit/:id',
  creditCreate: certificateBasePath + 'credit/create',
  creditList: certificateBasePath + 'credit/list',
  specificDetail: certificateBasePath + 'specific/detail/:id',
  specificEdit: certificateBasePath + 'specific/edit/:id',
  specificCreate: certificateBasePath + 'specific/create',
  specificList: certificateBasePath + 'specific/list'
}

/**
 *  专职人员
 */
const professionalBasePath = 'professional'
export const professional = {
  edit: professionalBasePath + '/edit/:userId', //专职人员编辑
  detail: professionalBasePath + '/detail/:userId', //专职人员详情
  list: professionalBasePath + '/list', //专职人员列表
  create: professionalBasePath + '/create', //新增专职人员
  audit: professionalBasePath + '/audit/:userId' //审批专职人员
}

/**
 *  财务信息
 */
const financialBasePath = 'financial'
export const financial = {
  edit: financialBasePath + '/edit/:id', //编辑
  detail: financialBasePath + '/detail/:id', //详情
  list: financialBasePath + '/list', //列表
  create: financialBasePath + '/create' //新增
}

/**
 *  代理机构查询
 */
const agencyQueryBasePath = 'agencyQuery'
export const agencyQuery = {
  //detail: agencyQueryBasePath + '/detail/:userId', //详情
  list: agencyQueryBasePath + '/list' //列表
}

/**
 *  分支机构信息
 */
const branchBasePath = 'branch'
export const branch = {
  edit: branchBasePath + '/edit/:id', //编辑
  detail: branchBasePath + '/detail/:id', //详情
  list: branchBasePath + '/list', //列表
  create: branchBasePath + '/create' //新增
}

/**
 *  分支机构审核
 */
const branchAuditBasePath = 'branchAudit'
export const branchAudit = {
  //detail: branchAuditBasePath + '/detail/:userId', //详情
  list: branchAuditBasePath + '/list' //列表
}

/**
 *  业绩信息
 */
const achievementBasePath = 'achievement'
export const achievement = {
  edit: achievementBasePath + '/edit/:id', //编辑
  detail: achievementBasePath + '/detail/:id', //详情
  list: achievementBasePath + '/list', //列表
  create: achievementBasePath + '/create/:performanceType' //新增(需要performanceType)
}

/**
 *  主要人员
 */
const keyPersonnelBasePath = 'keyPersonnel'
export const keyPersonnel = {
  detail: keyPersonnelBasePath + '/detail' //主要人员详情、次要人员列表
}

/**
 *  次要人员
 */
const minorPersonnelBasePath = 'minorPersonnel'
export const minorPersonnel = {
  edit: minorPersonnelBasePath + '/edit/:id', //编辑
  detail: minorPersonnelBasePath + '/detail/:id', //详情
  create: minorPersonnelBasePath + '/create' //新增
}

const approvalBasePath = 'approval'
export const approval = {
  list: approvalBasePath + '/list', //列表
  publicList: approvalBasePath + '/public/list', //公示入库列表
}

/**
 *  基本信息
 */
const organicPrefix = 'organic'
export const organic = {
  detail: organicPrefix + '/detail', //详情
  audit: organicPrefix + '/audit/:id/:orgId/:state(/:visible)', //详情
  edit: organicPrefix + '/edit' //编辑
}

/**
 *  出资信息
 */
const investorPrefix = 'investor'
export const investor = {
  create: investorPrefix + '/create', //新增
  detail: investorPrefix + '/detail/:id', //详情
  edit: investorPrefix + '/edit/:id' //编辑
}

/**
 *  场地信息
 */
const biddingPrefix = 'bidding'
export const bidding = {
  create: biddingPrefix + '/create', //新增
  detail: biddingPrefix + '/detail/:id', //详情
  edit: biddingPrefix + '/edit/:id' //编辑
}

/**
 *  机构信息审核记录
 */
const auditLoggingPrefix = 'auditLogging'
export const auditLogging = {
  list: auditLoggingPrefix + '/list',
  detail: auditLoggingPrefix + '/detail/:id' //详情
}

/**
 *  管理配置
 */
const manageConfigPrefix = 'manageConfig'
export const manageConfig = {
  notice: manageConfigPrefix + '/notice' // 公示管理配置
}

/**
 *  代理机构注册
 */
export const register = 'register'

export default {
  certificate,
  professional,
  financial,
  minorPersonnel,
  keyPersonnel,
  achievement,
  branchAudit,
  branch,
  agencyQuery,
  approval,
  organic,
  investor,
  bidding,
  auditLogging,
  manageConfig,
  register
}

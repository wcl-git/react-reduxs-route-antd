import CoreLayout from '../layouts/containers'
import Home from './Home'
import TableRoute from './ZCYTable'
import ZCYFormTest from './ZCYFormtest'
import organic from './organic' // 基本信息
import auditLoggingList from './auditLogging-list' //基本信息-审核记录列表
import auditLogging from './auditLogging' //基本信息-审核记录
import auditExplain from './auditExplain' //基本信息-审核说明
import auditAgency from './auditAgency' //基本信息-审核机构
import investorList from './investor-list' //出资信息-列表
import investor from './investor' //出资信息
import biddingList from './bidding-list' //场地信息-开评标场地列表
import bidding from './bidding' //场地信息-开评标场地详情、编辑、新增
import manageConfNotice from './config-notice' //机构管理配置(公示管理配置)
import professionalList from './professional-list' //专职人员列表
import professionalCreate from './professional-create' //专职人员列表
import professional from './professional' //专职人员详情、编辑
import FinancialList from './financial-list'//财务信息列表
import Financial from './financial'//财务信息新增、详情、编辑
import KeyPersonnel from './key-personnel' //主要人员列表
import minorPersonnel from './minor-personnel' // 次要人员详情、编辑、新增
import QueryList from './agency-query' //代理机构查询
import AchievementList from './achievement-list' //代理业绩
import Achievement from './achievement' //代理业绩详情
import BranchList from './branch-list' //分支机构列表
import Branch from './branch' //分支机构详情、编辑、新增
import BranchAuditList from './branch-audit-list' //分支机构审核列表
import approvalList from './approval-list' //注册变更审核列表
import approvalPublicList from './approval-public-list' //注册变更审核列表
import registerAudit from './registerAudit' //注册审核详情
import changeApproval from './changeApproval'
import writeExplain from './writeExplain' // 填写说明
import certificateBase from './certificate-base'//基本资质信息
import certificateCreditList from './certificate-credit-list'//基本资质信息
import certificateCredit from './certificate-credit'
import certificateSpecific from './certificate-specific'//基本资质信息
import certificateSpecificList from './certificate-specific-list'//基本资质信息
import register from './register/containers'//代理机构注册
import registerPolicy from './register-policy/containers'//代理机构承诺书

export const createRoutes = store => ([{
  path: '/registerPolicy',
  component:  registerPolicy(store),
},{
  path: '/register',
  component:  register(store),
},{
  path: '/',
  component: CoreLayout(store),
  indexRoute: Home,
  childRoutes: [
    certificateBase(store),
    ...certificateCredit(store),
    certificateCreditList(store),
    ...certificateSpecific(store),
    certificateSpecificList(store),
    TableRoute(store),
    ZCYFormTest(store),
    ...organic(store),
    auditLoggingList(store),
    auditLogging(store),
    auditExplain(store),
    auditAgency(store),
    investorList(store),
    ...investor(store),
    biddingList(store),
    ...bidding(store),
    manageConfNotice(store),
    ...professional(store),
    professionalList(store),
    professionalCreate(store),
    FinancialList(store),
    ...Financial(store),
    KeyPersonnel(store),
    QueryList(store),
    AchievementList(store),
    ...Achievement(store),
    BranchAuditList(store),
    BranchList(store),
    ...Branch(store),
    approvalList(store),
    approvalPublicList(store),
    registerAudit(store),
    changeApproval(store),
    writeExplain(store),
    ...minorPersonnel(store)
  ]
}])

export default createRoutes

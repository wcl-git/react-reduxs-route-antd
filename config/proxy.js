/**
 * 接口代理转发
 * 针对多个域名，分别进行接口转发
 */

const domainTable = {
  dev: 'dev-dragon.cai-inc.com',
  test: 'test.cai-inc.com',
  staging: 'staging.zcy.gov.cn'
}

const domain = domainTable['dev']

module.exports = {
  rules: {
    // 用户
    uaa: {
      host: `http://login.${domain}`,
      urls: []
    },
    // 网超
    mall: {
      host: `http://${domain}`,
      urls: []
    },
    // middle
    middle: {
      host: `http://middle.${domain}`,
      urls: [
        '/api/zoss/*',
        '/api/member/*',
        '/api/article/*',
        '/api/apps/getAppsBasicInfo',
        '/api/district/getMyDistrict',
        '/api/users/getUserIdentity',
        '/api/apps/getAppsByDimForFront',
        '/api/privileges/getAppMenuTree',
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',
        '/api/privileges/getEnvHref',
        '/api/district/getSubDistrictByPid',
        '/backlog/item/obtainBacklogHeadInfo'
      ]
    },
    //Rap Mock平台,无需token认证,修改本文件需要重启应用
    rap: {
      host: `http://rap.cai-inc.com/mockjs/23`, //项目ID
      urls: [
        '/api/district/getDistrictTree',
        '/api/address/:pid/children'
      ]
    },
    // 专家库
    experts: {
      host: `http://experts.${domain}`,
      urls: ['/zcy/experts/*']
    },
    // 代理机构
    agency: {
      host: `http://agency.${domain}`,
      urls: [
        '/agencymng/*',
        '/api/test/',
        '/api/*'
      ]
    },
    // 供应商
    supplier: {
      host: `http://supplier.${domain}`,
      urls: []
    },
    // 定点服务
    fixed: {
      host: `http://fixed.${domain}`,
      urls: []
    },
    // 招投标
    bidding: {
      host: `http://bidding.${domain}`,
      urls: []
    },
    // 车辆控购
    vehicle: {
      host: `http://vehicle.${domain}`,
      urls: []
    },
    // 反向竞价
    reverse: {
      host: `http://reverse.${domain}`,
      urls: []
    },
    // 在线询价，协议供货
    inquiry: {
      host: `http://inquiry.${domain}`,
      urls: []
    },
    // 合同
    contract: {
      host: `http://contract.${domain}`,
      urls: []
    }
  },
  user: {
    // account: 'binjiangcgzx',
    // password: 'test123456'
    account: 'gaojiali2016', //dev-dragon
    password: '123456'
    // account: 'test20170602', //dev
    // password: '123456'
    // account: '339900123456', //审批
    // password: '123456',
    //  account: '824786666', //分支机构
    // password: 'qwe12344'
    // account: 'a66666666', //分支机构2
    // password: 'a66666666'
    // account: 'biao01', // 代理机构
    // password: 'test123456'

  }
}

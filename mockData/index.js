module.exports = {
  "/api/zoss/getDownLoadUrl": function () {
    return {
      id: 1,
      name: 'test'
    }
  },
  "/api/article/list": function () {
    return {
      data:[{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park',
      }]
    }
  },
  "/api/member/menus": function () {
    return {
    "success": true,
    "result": [
        {
            "name": "工作台",
            "icon": "icon-gongzuotai",
            "href": "http://middle.dev.cai-inc.com/dashboard/panel",
            "child": []
        },
        {
            "name": "供应商管理",
            "icon": "icon-gongyingshangguanli",
            "href": null,
            "child": [
                {
                    "name": "供应商查询",
                    "icon": null,
                    "href": "http://supplier.dev.cai-inc.com/supplier/query",
                    "child": []
                },
                {
                    "name": "注册审核",
                    "icon": null,
                    "href": "http://supplier.dev.cai-inc.com/supplier/register-manage",
                    "child": []
                },
                {
                    "name": "网超资格确认",
                    "icon": null,
                    "href": "http://salesarea.dev.cai-inc.com/sales-agreement/audit-manage",
                    "child": []
                },
                {
                    "name": "资格列表",
                    "icon": null,
                    "href": "http://salesarea.dev.cai-inc.com/sales-agreement/qualification-list",
                    "child": []
                },
                {
                    "name": "变更记录",
                    "icon": null,
                    "href": "http://salesarea.dev.cai-inc.com/sales-agreement/changeLog",
                    "child": []
                },
                {
                    "name": "协议供应商列表",
                    "icon": null,
                    "href": "http://protocol.dev.cai-inc.com/agrsuppmng/procurementDealerList",
                    "child": []
                },
                {
                    "name": "协议供货商审核",
                    "icon": null,
                    "href": "http://protocol.dev.cai-inc.com/agrsuppmng/auditList?tab=SUBMITTED#SUBMITTED",
                    "child": []
                }
            ]
        },
        {
            "name": "商品服务管理",
            "icon": "icon-shangpinguanli",
            "href": null,
            "child": [
                {
                    "name": "商品查询",
                    "icon": null,
                    "href": "http://localhost:8080/",
                    "child": []
                },
                {
                    "name": "举报管理",
                    "icon": "icon-jubaoshensuguanli",
                    "href": "http://middle.dev.cai-inc.com/report/report-list",
                    "child": []
                },
                {
                    "name": "网超商品管理",
                    "icon": null,
                    "href": "http://www.dev.cai-inc.com/seller/item-supervise",
                    "child": []
                },
                {
                    "name": "网超商品审核",
                    "icon": null,
                    "href": "http://www.dev.cai-inc.com/seller/item-check?auditStatus=1",
                    "child": []
                },
                {
                    "name": "大宗商品管理",
                    "icon": null,
                    "href": "http://www.dev.cai-inc.com/seller/supperPro/item-supervise",
                    "child": []
                },
                {
                    "name": "大宗商品审核",
                    "icon": null,
                    "href": "http://www.dev.cai-inc.com/seller/supperPro/item-check-list",
                    "child": []
                },
                {
                    "name": "疫苗商品管理",
                    "icon": null,
                    "href": "http://www.dev.cai-inc.com/seller/vaccine-item-supervise",
                    "child": []
                },
                {
                    "name": "协供商品管理",
                    "icon": null,
                    "href": "http://protocol.dev.cai-inc.com/agreement/buyingcenter-product-manage",
                    "child": []
                }
            ]
        }
    ],
    "error": null
}
  },
  "/api/test/getFormData": function () {
    return {
        "email":"chenkaixia@126.com",
        "userName":"111111",
        "startDate":1500298712000,
        "inputNumber":4,
        "myDate":[1500298712000,1500298712000],
        "myRadio":1,
        "select":"lucy",
        "area":['150000','150100','150102'],
        "district":['150000','150100','150102']
      }
  },
  "/api/test/gettest": function () {
    return {
        "professional": {
            "1000119181": {
                "name": 'test',
                "sex": 'tes'
            }
        }
    }
  },
  "/agencymng/ageapproval/list": function () {
      return {
        data:[{
            approvalCode: 'fsf',
            fullName: 'fsf',
            districtFullName: 'fsf',
            contactName: 'fsf',
            contactPhone: 'fsf',
            gmtCreate: 1502258800253,
            state: 'FIRST_ORG'
        }, {
            approvalCode: 'fsfsff',
            fullName: 'fsfsdf',
            districtFullName: 'sdf',
            contactName: 'fsd',
            contactPhone: 'fsdfsw',
            gmtCreate: 1502258800253,
            state: 'AGAIN_ORG'
        }],
        total: 1
      }
  }
}

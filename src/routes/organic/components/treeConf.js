const treeData = [
  {
    label: '内资',
    value: '1',
    key: '1',
    children: [
      {
        label: '国有全资',
        value: '11',
        key: '11'
      },
      {
        label: '集体全资',
        value: '12',
        key: '12'
      },
      {
        label: '股份合作',
        value: '13',
        key: '13'
      },
      {
        label: '联营',
        value: '14',
        key: '14',
        children: [
          {
            label: '国有联营',
            value: '141',
            key: '141'
          },
          {
            label: '集体联营',
            value: '142',
            key: '142'
          },
          {
            label: '国有与集体联营',
            value: '143',
            key: '143'
          },
          {
            label: '其他联营',
            value: '149',
            key: '149'
          }
        ]
      },
      {
        label: '有限责任 （公司）',
        value: '150',
        key: '150'
      },
      {
        label: '其他有限责任 （公司）',
        value: '159',
        key: '159'
      },
      {
        label: '股份有限 （公司）',
        value: '16',
        key: '16'
      },
      {
        label: '私有',
        value: '17',
        key: '17',
        children: [
          {
            label: '私有独资',
            value: '171',
            key: '171'
          },
          {
            label: '私有合伙',
            value: '172',
            key: '172'
          },
          {
            label: '私营有限责任 （公司）',
            value: '173',
            key: '173'
          },
          {
            label: '私营股份有限 （公司）',
            value: '174',
            key: '174'
          },
          {
            label: '个体经营',
            value: '175',
            key: '175'
          },
          {
            label: '其他私有',
            value: '179',
            key: '179'
          }
        ]
      },
      {
        label: '其他内资',
        value: '19',
        key: '19'
      }
    ]
  },
  {
    label: '港、澳、台投资',
    value: '2',
    key: '2',
    children: [
      {
        label: '内地和港、澳、台合资',
        value: '21',
        key: '21'
      },
      {
        label: '内地和港、澳、台合作',
        value: '22',
        key: '22'
      },
      {
        label: '港、澳、台独资',
        value: '23',
        key: '23'
      },
      {
        label: '港、澳、台投资股份有限（公司）',
        value: '24',
        key: '24'
      },
      {
        label: '其他港澳台投资',
        value: '29',
        key: '29'
      }
    ]
  },
  {
    label: '国外投资',
    value: '3',
    key: '3',
    children: [
      {
        label: '中外合资',
        value: '31',
        key: '31'
      },
      {
        label: '中外合作',
        value: '32',
        key: '32'
      },
      {
        label: '外资',
        value: '33',
        key: '33'
      },
      {
        label: '国外投资股份有限（公司）',
        value: '34',
        key: '34'
      },
      {
        label: '其他国外投资',
        value: '39',
        key: '39'
      }
    ]
  },
  {
    label: '其他',
    value: '9',
    key: '9'
  }
]

export default treeData

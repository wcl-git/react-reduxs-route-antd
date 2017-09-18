import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, Address, ZCYUpload, ZCYDatePicker, ZCYUtils } from 'zcy-common'
import { Button, Modal, message, Row, Col } from 'zcy-antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { AgencyModal } from 'components-common'
import './index.less'
import logo from '../assets/logo.png'
import { submit, sendVerifyCode } from '../modules/index'

class register extends Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    const { params, location } = this.props
    const pathName = location.pathname
  }


  //弹框
  state = {
    formItemLayout: {
      labelCol: {
        span: 9
      },
      wrapperCol: {
        span: 15
      }
    },
    modalVisible: false,
    modalType: ''
  }

  render() {
    const { formItemLayout, modalVisible, modalType } = this.state

    return (
      <div className="register-policy">
        <div className="wrap">
          <Row type="flex" align="middle">
            <Col span={5}>
              <img src={logo} alt="" style={{ height: 47 }} />
            </Col>
            <Col style={{ marginLeft: 5 }} span={6}>
              <span>欢迎注册</span>
            </Col>
          </Row>
          <AgencyModal
            visible={this.state.modalVisible}
            modalType={this.state.modalType}
            onOk={this.state.onOk}
            onCancel={() => { this.setState({ modalVisible: false }) }}
          ></AgencyModal>
          <div className="panel">
            <div className="panel-body">
              <div className="con-box">
                <h3>政府采购代理机构注册须知</h3>
                <br />
                <h4>
                  注册政府采购代理机构应具备以下条件：
        </h4>
                <ol>
                  <li>具有独立承担民事责任的能力；</li>
                  <li>具有良好的商业信誉和健全的财务会计制度；</li>
                  <li>具有履行合同所必需的设备和专业技术能力；</li>
                  <li>有依法缴纳税收和社会保障资金的良好记录；</li>
                  <li>参加政府采购活动前3年内，在经营活动中没有重大违法记录；</li>
                  <li>具备开展政府采购业务所需的评审条件和设施；</li>
                  <li>法律、法规规定的其它条件。</li>
                </ol>
                <br />
                <h4>
                  申请政府采购代理机构应填报或扫描录入以下资料：
                </h4>
                <ol>
                  <li>营业执照(或事业单位等其他法人证书)，营业范围应当包括政府采购代理业务的相关内容；</li>
                  <li>组织机构代码证；</li>
                  <li>税务登记证(副本)；</li>
                  <li>社会保险登记证书(或相关证明)；</li>
                  <li>法定代表人身份证；</li>
                  <li>机构名称、注册地址、联系方式等基本信息；</li>
                  <li>开评标场所及音视频监控照片；</li>
                  <li>专职人员身份证、专业技术职务证书、执业资格证、政府采购培训证书；</li>
                  <li>其他相关证明材料；</li>
                </ol>
                <div style={{ color: 'red' }}>
                  备注：a、若代理机构的营业执照、组织机构代码证、税务登记证、社会保险登记证、统计登记证“五证合一”的，则只需扫描录入营业执照；b、若代理机构的营业执照、组织机构代码证、税务登记证 “三证合一”的，则除扫描录入营业执照外，还需扫描录入社会保险登记证(或相关证明）。
                 </div>
                <br />
                <h4>
                  注册代理机构享有以下权利：
                 </h4>
                <ol>
                  <li>依法接受采购人委托，代理政府采购项目；</li>
                  <li>使用政采云平台按规定进行公告发布、专家抽取、相关当事人评价等各项合法操作；</li>
                  <li>依法参加网上相关政府采购活动；</li>
                  <li>参加财政部门组织的各类政府采购业务培训；</li>
                  <li>使用政采云平台提供的其他服务；</li>
                  <li>法律、法规和其他制度规定的其他权利；</li>
                </ol>
                <br />
                <h4>
                  注册代理机构承担以下义务：
               </h4>
                <ol>
                  <li>全面、真实地登记代理机构相关信息，及时更新相关变更信息，并按规定报送审查机构审查,对所登记和发布的信息负相关法律责任；</li>
                  <li>自觉遵守政府采购相关法律法规和其他制度规定，依法、诚信地参加政府采购活动，依法履行政府采购委托合同及相关承诺，依法对政府采购相关当事人进行评价，切实维护国家和社会公共利益以及采购相关当事人的合法权益，自觉接受财政部门的监督检查；</li>
                  <li>建立完善内部监督管理制度，对在政府采购过程中获取的国家秘密和商业秘密负有保密责任；</li>
                  <li>对自愿选择的政采云平台有偿增值服务及时支付相关费用；</li>
                  <li>法律、法规和其他制度规定的其他义务；</li>
                </ol>
                <br />
                <h4>
                  其他事项：
        </h4>
                <div>请仔细阅读下列《政府采购代理机构注册协议》。阅读协议的过程中，如果不同意协议中任何条款约定的，代理机构应立即停止注册程序。</div>
                <br />
                <h3>政府采购代理机构注册协议</h3>
                <div className="textIndent">
                  根据《中华人民共和国政府采购法》、《中华人民共和国招标投标法》、《全国人大常委会关于维护互联网安全的决定》、《互联网信息服务管理办法》、《财政部关于做好政府采购代理机构资格认定行政许可取消后相关政策衔接工作的通知》等有关法律法规，制订以下条款：
        </div>
                <div className="textIndent">一、接受条款</div>
                <div className="textIndent">1、政府采购云平台（以下简称政采云平台）服务由政采云有限公司（以下简称政采云）提供。政采云在此特别提醒用户，本协议内容包括协议正文及所有财政部门和政采云平台已经发布或将来可能发布的各类规则。所有规则为协议不可分割的一部分，与协议正文具有同等法律效力。</div>
                <div className="textIndent">2、用户在申请注册流程中点击同意本协议之前，请务必审慎阅读、充分理解本协议各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款，以及其他以粗体下划线标识的涉及用户核心利益的重要条款。</div>
                <div className="textIndent">当用户按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示用户已充分阅读、理解并接受本协议的全部内容。阅读本协议的过程中，如果用户不同意本协议或其中任何条款约定，用户应立即停止注册程序。另外，用户通过点击平台其它相关位置上的同意按钮，亦表示完全接受了该按钮相关文件中的全部内容。</div>
                <div className="textIndent">二、账户注册与使用</div>
                <div className="textIndent">1、注册政府采购代理机构应具备以下条件：</div>
                <ul>
                  <li>（1）具有独立承担民事责任的能力；</li>
                  <li>（2）具有良好的商业信誉和健全的财务会计制度；</li>
                  <li>（3）具有履行合同所必需的设备和专业技术能力；</li>
                  <li>（4）有依法缴纳税收和社会保障资金的良好记录；</li>
                  <li>（5）参加政府采购活动前3年内在经营活动中没有重大违法记录；</li>
                  <li>（6）具备开展政府采购业务所需的评审条件和设施；</li>
                  <li>（7）法律、法规规定的其他条件；</li>
                </ul>
                <div className="textIndent">2、注册（登记）信息：用户应当向政采云平台提供真实准确的注册（登记）信息，包括但不限于机构名称、住所、联系地址、联系电话、电子邮箱，专职人员姓名、毕业院校、学历、手机号码等，以便政采云或其他用户通过上述联系方式与用户进行联系，同时便于财政部门进行符合性审查。登记信息将通过平台向社会公开，接受社会监督。</div>
                <div className="textIndent">注册（登记）信息发生变化的，用户应及时更新，确保信息最新、真实、准确、完整、有效。财政部门或其委托机构将依法不时地对用户的信息进行检查核实。</div>
                <div className="textIndent">如因提供虚假登记信息、联系方式不确切或不及时告知变更后的联系方式，用户应自行承担由此可能对其自身、他人及/或政采云产生的全部法律后果。</div>
                <div className="textIndent">3、账户获得</div>
                <div className="textIndent">（1）当用户按照注册页面提示填写信息且完成全部注册程序后，用户可获得政采云平台账户并成为政采云平台用户。</div>
                <div className="textIndent">同一代理机构（以营业执照和事业单位法人证书为准）在政采云平台上只能注册一个有效的机构账户。每个代理机构账户项下可登记多个分支机构及专职人员账户。</div>
                <div className="textIndent">（2）注册(登记）政府采购代理机构还需通过财政部门或其委托机构审查。代理机构应通过政采云平台填报并扫描录入以下资料：a、营业执照（或事业单位法人证书）；b、法定代表人身份证；c、专职人员身份证或专业技术职称证书、执业资格证书、政府采购培训证书；d、其他资质证书或证明材料，并应保证上述资料在其使用政采云平台服务期间持续合法、有效。</div>
                <div className="textIndent">通过财政部门或其委托机构审查的代理机构，经网上公示且无异议后自动入选代理机构库。</div>
                <div className="textIndent">4、账户安全与管理</div>
                <div className="textIndent">（1）请用户务必保管好账户及其密码，政采云任何时候均不会主动要求用户提供账户密码。若因用户保管不善导致用户账户信息泄露、采购项目评审信息泄露，或遭受他人攻击、诈骗等，从而引起的所有损失及不利后果，由用户自行承担全部责任。</div>
                <div className="textIndent">（2）用户进一步确认并同意，除本协议另有规定外，在用户账户登录状态下进行的所有操作均视为用户本人的操作，用户应对其账户项下的所有行为结果（包括但不限于在线发布信息、签署各类协议）负责，政采云不承担任何责任。</div>
                <div className="textIndent">四、代理机构的权利和义务</div>
                <div className="textIndent">（一）代理机构的权利</div>
                <ul>
                  <li>1、依法接受采购人委托，代理政府采购项目；</li>
                  <li>2、使用政采云平台按规定进行公告发布、专家抽取、相关当事人评价等各项合法操作；</li>
                  <li>3、依法参加网上相关政府采购活动；</li>
                  <li>4、参加财政部门组织的各类政府采购业务培训；</li>
                  <li>5、使用政采云平台提供的其他服务；</li>
                  <li>6、法律、法规和其他制度规定的其他权利。</li>
                </ul>
                <div className="textIndent">（二）代理机构的义务</div>
                <div className="textIndent">1、全面、真实地登记代理机构相关信息，及时更新相关变更信息，并按规定报送审查机构审查，对所登记和发布的信息负相关法律责任；</div>
                <div className="textIndent">2、自觉遵守政府采购相关法律法规和其他制度规定，依法、诚信地参加政府采购活动，依法履行政府采购委托合同及相关承诺，依法对政府采购相关当事人进行评价，切实维护国家和社会公共利益以及采购相关当事人的合法权益，自觉接受财政部门的监督检查；</div>
                <div className="textIndent">3、建立完善内部监督管理制度，对在政府采购过程中获取的国家秘密和商业秘密负有保密责任；</div>
                <div className="textIndent">4、对自愿选择的政采云平台有偿增值服务及时支付相关费用；</div>
                <div className="textIndent">5、法律、法规和其他制度规定的其他义务。</div>
                <div className="textIndent">五、用户信息的保护及授权</div>
                <div className="textIndent">（一）个人信息的保护</div>
                <div className="textIndent">政采云非常重视对用户个人信息的保护，在用户使用政采云平台各项服务时，用户同意政采云按照《隐私声明》及/或财政部门的要求收集、存储、使用、披露和保护用户的个人信息。隐私声明是本协议不可分割的组成部分。因此，请用户仔细阅读。</div>
                <div className="textIndent">（二）非个人信息的保证与授权</div>
                <div className="textIndent">1、用户保证对其所发布的信息拥有相应、合法的权利，不得发布含有《互联网信息服务管理办法》第十五条规定的信息。</div>
                <div className="textIndent">2、对于用户提供及发布的除个人信息外的文字、图片、视频、音频等非个人信息，用户免费授予政采云一项永久、全球排他的许可使用权利及再授权给其他第三方使用的权利。用户同意政采云存储、使用、复制、修订、编辑、发布、展示、翻译、分发用户的非个人信息或通过各种形式制作、使用其派生作品。</div>
                <div className="textIndent">六、责任限制及免除</div>
                <div className="textIndent">1、对于下述原因导致政采云无法正常提供服务的，政采云不承担任何责任：</div>
                <div className="textIndent">（1）因自然灾害、罢工、暴乱、战争等不可抗力因素；</div>
                <div className="textIndent">（2）因电力供应故障、通讯网络故障等公共服务因素或政采云平台升级、维护因素；</div>
                <div className="textIndent">（3）因黑客、病毒、木马、恶意程序攻击、常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全，以及第三方服务瑕疵或政府行为、司法行政命令等因素；</div>
                <div className="textIndent">（4）在紧急情况下为维护国家安全、其他用户及/或第三方之权益等因素；</div>
                <div className="textIndent">（5）用户操作不当或用户的上网设备软硬件出现故障等非政采云因素；</div>
                <div className="textIndent">（6）财政部门作出有关限制操作。</div>
                <div className="textIndent">尽管有前款约定，政采云将采取合理行动积极促使服务恢复正常。</div>
                <div className="textIndent">2、政采云以事先通知方式修改、中断或终止全部或部分本平台所提供的服务，若由此给用户造成损失的，政采云对该等损失不承担任何责任。</div>
                <div className="textIndent">3、除法律另有规定外，在任何情况下政采云不对使用本平台服务或功能导致的任何特殊、附带、偶然或间接的损害进行赔偿，即使政采云已被告知可能发生该等损害。</div>
                <div className="textIndent">七、违约责任</div>
                <div className="textIndent">政采云可根据国家法律法规变化及维护交易秩序等需要，不时修改本协议、政采云平台规则，变更后的协议、规则（以下简称变更事项）一旦在域名为zcy.gov.cn、zhengcaiyun.cn对应的网站或各级政府采购相关网站上公布即生效，并代替原版的协议、规则。</div>
                <div className="textIndent">用户有义务不时关注并阅读最新版的协议、规则。如用户对已生效的变更事项不同意的，用户应当于变更事项确定的生效之日起停止使用政采云平台服务，变更事项对用户不产生效力；如用户在变更事项生效后仍继续使用政采云平台服务，则视为用户同意已生效的变更事项。</div>
                <div className="textIndent">八、协议的修改</div>
                <div className="textIndent">政采云可根据国家法律法规变化及维护交易秩序等需要，不时修改本协议、政采云平台规则，变更后的协议、规则（以下简称变更事项）将通过域名为zcy.gov.cn、zhengcaiyun.cn对应的网站或各级政府采购相关网站公告的方式提前予以公布，变更事项在公告期届满之日起生效。</div>
                <div className="textIndent">如用户对已生效的变更事项不同意的，用户应当于变更事项确定的生效之日起停止使用政采云平台服务，变更事项对用户不产生效力；如用户在变更事项生效后仍继续使用政采云平台服务，则视为用户同意已生效的变更事项。</div>
                <div className="textIndent">九、知识产权及保密条款权</div>
                <div className="textIndent">1、用户知晓并同意，除用户依法发布的用户信息外，政采云所有系统及政采云平台上所有内容，包括但不限于著作、商标、LOGO、域名、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计以及任何有关的衍生作品等，均由政采云或相关权利人依法拥有其相关的著作权、商标权、专利权、域名权、商业秘密及其他合法权利。未经政采云书面同意，用户不得擅自使用。</div>
                <div className="textIndent">2、用户应对其在使用本平台服务过程中所知悉的属于政采云或其他用户（包括但不限于采购人、供应商、代理机构等）的保密或专有的信息予以保密，保密期限自用户接收或知悉政采云或其他用户保密信息之日起至该等保密信息公开之日止，但用户与政采云其他用户另有约定的除外。如用户违反保密义务造成政采云或其他用户损失的，用户应自行承担全部赔偿责任；若由此导致其他用户向政采云主张权益、诉讼或索赔的，用户应配合政采云解决争议，并赔偿政采云因此产生的全部损失。</div>
                <div className="textIndent">十、法律适用及争议解决</div>
                <div className="textIndent">1、本协议之订立、解释、修订、补充、执行与争议解决，均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。</div>
                <div className="textIndent">2、用户因使用政采云平台服务所产生的或与政采云服务有关的争议，由政采云与用户协商解决。协商不成时，任何一方均可向被告所在地人民法院提起诉讼。</div>
                <div className="textIndent">十一、其他</div>
                <div className="textIndent">1、通知：用户同意政采云通过下列任一种方式向用户发送通知：（1）公告；（2）站内信、客户端推送的消息；（3）根据用户预留的联系方式发送的电子邮件、短信、函件等。政采云以前述约定的电子方式发出的书面通知，在发送成功后即视为送达；以纸质载体发出的函件等书面通知，在政采云交邮后的第五个自然日即视为送达。</div>
                <div className="textIndent">2、本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。</div>
                <div className="textIndent">3、在法律允许的最大范围内，政采云对本协议拥有解释权和修改权。</div>
              </div>
              <Row type="flex" justify="center">
                <Col>
                  <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default register

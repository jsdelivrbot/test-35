<template>
  <div class="my-winning-detail">
    <div class="my-buy-list">
      <div class="avatar-wrapper">
        <img src="../../assets/banner_1.jpg" alt="" class="avatart"/>
        <div class="status">已揭晓</div>
      </div>
      <div class="content-wrapper">
        <h2 class="title">（第{{getPartyRecordInfoData.issueNo}}期）{{getPartyRecordInfoData.activityName}}</h2>
        <p class="join">您已参与<span class="join-num">{{getPartyRecordInfoData.userBuyCount}}</span>次</p>
        <p class="winning"> 获得者：<span class="winner">所有将军全认输了CNN</span></p>
        <p class="time">所揭晓时间：{{getPartyRecordInfoData.announceTime}}</p>
      </div>
    </div>

    <div class="join-num">参您总共参与<span class="num" >{{getPartyRecordInfoData.userBuyCount}}</span>次</div>

    <div class="join-number-wrapper">
      <p class="time">{{getPartyRecordInfoData.announceTime}}</p>
      <ul class="number-ul">
        <li class="number" v-for="item in getLuckNosData" v-bind:class="{active: item.isLuckMan == 'y'}">{{item.luckNo}}</li>
      </ul>
    </div>

    <div class="win_address disable" @click="adderss_info_btn">
      <p>{{Y_contactName}} , {{Y_mobile}}</p>
      <p>{{Y_region}}{{Y_address}}</p>
    </div>

    <div class="cover" v-show="hide" @click="close"></div>

    <div class="address-wrapper" v-show="hide">
      <div class="address">
        <span class="close" @click="close"></span>
        <h2 class="title border-bottom-1px">选择收货地址</h2>
        <div class="list-wrapper">
          <ul class="address-list" style="transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
            <li class="address-item border-bottom-1px" v-for="(item,index) in getAddressListData.obj"><span class="no-check " @click="checked(index, item.contactName, item.mobile, item.provinceGeoName, item.cityGeoName, item.countyGeoName, item.provinceGeoId, item.cityGeoId, item.countyGeoId, item.address, item.postalCode)" v-bind:class='{checked:index==qwerqwre}'></span>
              <div class="item-content">
                <p class="name-phone" @click="checked(index, item.contactName, item.mobile, item.provinceGeoName, item.cityGeoName, item.countyGeoName, item.provinceGeoId, item.cityGeoId, item.countyGeoId, item.address, item.postalCode)">
                  <span class="name">{{item.contactName}}</span>，<span class="phone">{{item.telephone}}</span>
                </p>
                <p class="item-address">
                  {{item.address}}
                </p>
              </div>
              <span class="editor" @click="editor(item.contactName, item.mobile, item.provinceGeoName, item.cityGeoName, item.countyGeoName, item.provinceGeoId, item.cityGeoId, item.countyGeoId, item.address, item.postalCode, item.postalAddressContactMechId)">编辑</span>
            </li>
          </ul>
        </div>
        <div class="add-address border-bottom-1px border-top-1px" @click="addAdderss">
          <span class="add-icon"></span><span class="add-tip" >新增地址</span><span class="next-btn"></span>
        </div>
        <div class="confirm" >
          <div class="confirm-text" @click="determine">
            确定
          </div>
        </div>
      </div>
    </div>


    <div class="add-address-wrapper" v-show="address_details">
      <div class="address">
        <span class="close" @click="closes"></span>
        <h2 class="title border-bottom-1px">{{address_text}}</h2>
        <div class="list-wrapper">
          <ul class="editor-list">
            <li class="list-item border-bottom-1px">
              <span class="item-tip">收件人：</span>
              <input type="text" v-model="contactName" class="item-input"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">联系电话：</span>
              <input type="text" class="item-input" v-model="mobile"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">选择地区：</span>
              <input type="text" readonly class="item-input addr2" name="input_area" v-model="region"/>
              <input type="text" id="addr2"></input>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">详细地址：</span>
              <input type="text" v-model="address" class="item-input"/>
            </li>
            <li class="list-item border-bottom-1px">
              <span class="item-tip">邮政编码：</span>
              <input type="text"  v-model="postalCode" class="item-input"/>
            </li>
          </ul>
        </div>
        <div class="confirm">
          <div class="confirm-text delete" @click="deletes">删除</div>
          <div class="confirm-text" @click="preservation">保存修改</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  const ERR_OK = 10000;
  import '../../common/js/geoData.js';

  export default {
    data(){
      return{
        getWinningRecordData: null,
        partyId: this.$route.query.partyId,
        hide: false,
        qwerqwre: 1,
        getAddressListData: [],
        name: null,
        address_text:"修改收货地址",
        region: '请选择地区',
        postalAddressContactMechId: null,//地址id
        postalCode: null,
        provinceGeoName: null,
        cityGeoName: null,
        countyGeoName: null,
        address_details: false,
        contactName: "收件人姓名",
        mobile: "收件人手机号",
        address: "详细地址",
        postalCode: "邮政编码",
        provinceGeoId: null,
        cityGeoId: null,
        countyGeoId: null,
        Y_contactName: null,
        Y_mobile: null,
        Y_region: null,
        Y_postalAddressContactMechId: null,
        Y_address: null,
        Y_postalCode: null,
        defaultPartyContactMechPurpose: true,
        activityId: this.$route.query.activityId,
        perIssueId: this.$route.query.perIssueId,
        getPartyRecordInfoData: [],
        getLuckNosData: []
      }
    },
    created(){
      setDocumentTitle('我的云购详情');
      this.$nextTick(() => {
        var area = new LArea();
        area.init({
          'trigger': '.addr2',//控件ID
          'keys':{id:'id',name:'name'},
          'valueTo':'#addr2',
          'data': lAreaData//数组格式数据源，可扩展为自定义数据源
        });
      })
    },
    mounted(){
      this.getAddressList();
      this.getPartyRecordInfo();
      this.getLuckNos();
    },
    methods: {
      intoDetail: function () {
        this.$router.push({path: '/mywinningdetail'})
      },
      getWinningRecord: function(){
        this.$http.get('/yyg/getWinningRecord',{params:{ partyId: this.partyId }}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getWinningRecordData = response.result;
              // this.getWinningRecordData.announceTime = this.timetrans(this.getWinningRecordData.announceTime);
              
              for(var i=0; i<this.getWinningRecordData.length; i++){
                this.getWinningRecordData[i].announceTime = this.timetrans(this.getWinningRecordData[i].announceTime)
              }
            }else{
                alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
      },
      timetrans: function(date){
        var date = new Date(date);//如果date为10位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
      },
      adderss_info_btn: function(){
        this.hide = true;
      },
      close: function(){
        this.hide = false;
      },
      checked: function(index, contactName, mobile, provinceGeoName, cityGeoName, countyGeoName, provinceGeoId, cityGeoId, countyGeoId, address, postalCode){
        this.qwerqwre = index;
        this.Y_contactName = contactName;
        this.Y_mobile = mobile;
        this.Y_region = provinceGeoName + cityGeoName + countyGeoName;
        this.Y_postalAddressContactMechId = provinceGeoId + "," + cityGeoId + "," + countyGeoId;//地址id
        this.Y_address = address;
        this.Y_postalCode = postalCode;
      },
      closes: function(){
        this.address_details = false;
      },
      preservation: function(){
        
        var str = $("#addr2").val();
        var strs= new Array();
        strs=str.split(",");
        this.provinceGeoId = strs[0];
        this.cityGeoId = strs[1];
        this.countyGeoId = strs[2];
  
        if(this.contactName != null && this.mobile != null && this.region != null && this.address != null){
          this.$http.post('/yyg/saveAddress',{postalAddressContactMechId: this.postalAddressContactMechId, contactName: this.contactName, mobile: this.mobile, provinceGeoId: this.provinceGeoId, cityGeoId: this.cityGeoId, countyGeoId: this.countyGeoId, address: this.address, postalCode: this.postalCode, defaultPartyContactMechPurpose: this.defaultPartyContactMechPurpose, token: '1ib0e5foq6an9' }).then((response) => { 
              response = response.body
              if(response.status == ERR_OK){ 
                this.getAddressList();
                this.address_details = false;
              }else{
                  // alert('加载数据失败！');
              }   
          }).then((error)=> this.error = error)
        }else{
          alert("请填写完整的信息")
        }

      },
      addAdderss: function(){
        this.address_details = true;
        this.hide = true;
        this.address_text = "新增收货地址";
        this.contactName = null;
        this.mobile = null;
        this.region = null;
        this.postalAddressContactMechId = null;//地址id
        this.address = null;
        this.postalCode = null;
        this.provinceGeoId = null;
        this.cityGeoId = null;
        this.countyGeoId = null;
      },
      editor: function(contactName, mobile, provinceGeoName, cityGeoName, countyGeoName, provinceGeoId, cityGeoId, countyGeoId, address, postalCode, postalAddressContactMechId){
        this.address_details = true;
        this.hide = true;
        this.address_text = "修改收货地址";
        this.contactName = contactName;
        this.mobile = mobile;
        this.region = provinceGeoName + cityGeoName + countyGeoName;
        this.provinceGeoId = provinceGeoId;
        this.cityGeoId = cityGeoId;
        this.countyGeoId = countyGeoId;
        this.postalAddressContactMechId = postalAddressContactMechId;//地址id
        this.address = address;
        this.postalCode = postalCode;
        var addr2 = provinceGeoId +","+cityGeoId +","+ countyGeoId
        $("#addr2").val(addr2);
      },
      getAddressList: function(){
        this.$http.post('/yyg/getAddressList',{ token: '1ib0e5foq6an9',postalAddressContactMechId: '' }).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getAddressListData = response.result;

              for(var i=0; i<this.getAddressListData.obj.length; i++){
                if(this.getAddressListData.obj[i].defaultPartyContactMechPurpose){
                  this.qwerqwre = i;
                  this.Y_contactName = this.getAddressListData.obj[i].contactName;
                  this.Y_mobile = this.getAddressListData.obj[i].mobile;
                  this.Y_region = this.getAddressListData.obj[i].provinceGeoName + this.getAddressListData.obj[i].cityGeoName + this.getAddressListData.obj[i].countyGeoName;
                  this.Y_postalAddressContactMechId = this.getAddressListData.obj[i].provinceGeoId + "," + this.getAddressListData.obj[i].cityGeoId + "," + this.getAddressListData.obj[i].countyGeoId;//地址id
                  this.Y_address = this.getAddressListData.obj[i].address;
                  this.Y_postalCode = this.getAddressListData.obj[i].postalCode;
                }
              }
              
            }else{
                alert('加载数据失败！');
            }
            
        }).then((error)=> this.error = error)
      },
      determine: function(){
        this.address_details = false;
        this.hide = false;
      },
      deletes: function(){
        this.$http.post('/yyg/removeAddress',{postalAddressContactMechId: this.postalAddressContactMechId, orderId: '',token: '1ib0e5foq6an9'}).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getAddressList();
              this.address_details = false;
            }else{
                // alert('加载数据失败！');
            }   
        }).then((error)=> this.error = error)
      },
      getPartyRecordInfo: function(){
        this.$http.post('/yyg/getPartyRecordInfo', {activityId: this.activityId, perIssueId: this.perIssueId, partyId: this.partyId }).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getPartyRecordInfoData = response.result[0];
              this.getPartyRecordInfoData.announceTime = this.timetrans(this.getPartyRecordInfoData.announceTime)
            }else{
                // alert('加载数据失败！');
            }   
        }).then((error)=> this.error = error)
      },
      getLuckNos: function(){
        this.$http.post('/yyg/getLuckNos', {activityId: this.activityId, perIssueId: this.perIssueId, partyId: this.partyId }).then((response) => { 
            response = response.body
            if(response.status == ERR_OK){ 
              this.getLuckNosData = response.result;
            }else{
                // alert('加载数据失败！');
            }   
        }).then((error)=> this.error = error)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #addr2
    width: 0
    height: 0
    font-size: 0
  .win_address
    position: relative
    box-sizing: border-box
    padding: .8rem 1.6rem
    border-bottom: 1px solid #eee
    font-size: .48rem
    background-color: #fff
    margin-top: 0.4rem
    p
      overflow: hidden
      width: 100%
      line-height: 0.8rem
      color: #323232
    &::after
      position: absolute
      left: .48rem
      display: block
      width: .6rem
      height: .88rem
      background: url(../../assets/ico-address_03.png) 0 0 no-repeat
      background-size: 100%
      content: ''
      -webkit-background-size: 100%
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    &::before
      position: absolute;
      right: .48rem;
      display: block;
      width: .32rem;
      height: .56rem;
      background: url(../../assets/ico-triangle_03.png) 0 0 no-repeat;
      background-size: 100%;
      content: '';
      -webkit-background-size: 100%;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
  .my-winning-detail
    .my-buy-list
      padding: 0.56rem 0.32rem
      display: flex
      border-bottom: 0.04rem solid #dedede
      background: #fff
      font-size: 0
      .avatar-wrapper
        flex: 0 0 3.12rem
        width: 3.12rem
        height: 3.06rem
        border: 0.04rem solid #e5e5e5
        border-radius: 0.12rem
        margin-right: 0.52rem
        position: relative
        vertical-align: top
        .avatart
          width: 100%
          height: 100%
          border-radius: 0.12rem
        .status
          position: absolute
          left: 0
          bottom: 0
          width: 100%
          height: 0.52rem
          line-height: 0.52rem
          border-radius: 0 0 0.12rem 0.12rem
          background: #cacaca
          font-size: 0.36rem
          text-align: center
          color: #fff
      .content-wrapper
        flex: 1
        vertical-align: top
        .title
          margin-bottom: 0.34rem
          font-size: 0.52rem
          color: #666
        .join
          margin-bottom: 0.34rem
          font-size: 0.44rem
          color: #999
          .join-num
            height: auto
            line-height: 1
            border-bottom: 0
            font-weight: 500
            color: #fda263
        .winning
          margin-bottom: 0.34rem
          font-size: 0.44rem
          color: #c5bcbc
          .winner
            font-weight: 500
            color: #fda263
        .time
          font-size: 0.44rem
          color: #c5bcbc

    .join-num
      height: 1.6rem
      line-height: 1.6rem
      background: #fff
      border-bottom: 0.04rem solid #dedede
      font-size: 0.48rem
      color: #999
      text-indent: 0.44rem
      .num
        margin-left: 0.08rem
        color: #ffa25c

    .join-number-wrapper
      padding: 0.44rem 0.5rem 0.12rem
      border-bottom: 0.04rem solid #dedede
      background: #fff
      .time
        margin-bottom: 0.5rem
        font-size: 0.44rem
        font-family: Arial
        color: #9f9f9f
      .number-ul
        font-size: 0
        .number
          display: inline-block
          width: 20%
          margin: 0 0 0.44rem 0
          font-size: 0.44rem
          color: #414141
          text-align: center
          &.active
            color: #fda263
</style>

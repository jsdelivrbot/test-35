<template>
	<div>
		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border-bottom-1px">
		      <span class="hd-title">资金总览</span>
		    </div>
		  </div>
		  <div class="bd">
		    <div class="content overview">
		      <ul>
		        <li>净入金：<span>{{funOverview.inMoney}}</span></li>
		        <li>手续费：<span>{{funOverview.poundage}}</span></li>
		        <li>红积分：<span>{{funOverview.redScore}}</span></li>
		        <li>蓝积分：<span>{{funOverview.blueScore}}</span></li>
		        <li>货款收入：<span>{{funOverview.paymentIn}}</span></li>
		        <li>佣金支出：<span>{{funOverview.rebateOut}}</span></li>
		      </ul>
		    </div>
		  </div>
		  <v-load v-show="load1"></v-load>
		</div>

		<div style="height:0.1rem"></div>

		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border_1px">
		      <span class="hd-title">近7日出入金趋势</span>
		      <div class="legend">
		        <span>入金</span>
		        <span>出金</span>
		      </div>
		      <!-- <span class="dete-control column-control" @click="showDetelist"></span> -->
		      <span class="dete-control column-control" @click="columnRequest"></span>
		      <span id="column_date" class="opacity_date">{{curdate}}</span>
		      <!-- <div class="stage-box column-dete" v-show="detailShow">
		        <div class="stage-inner">
		          <ul id="monthList">
		            <li @click="hideDetelist" v-for="(item, index) in columnDateValue" >
		            	<p @click="getColumnDete(columnDateKey[index])">{{columnDateValue[index]}}</p>	
		            </li>
		          </ul>
		        </div>
		      </div> -->
		    </div>
		  </div>
		  <div class="bd">
		    <div class="content chart-column">
		      <div id="main-column" style="width:100%;height:200px;"></div>
		    </div>
		  </div>
		  <v-load v-show="load2"></v-load>
		</div>

		<div style="height:0.1rem"></div>
		
		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border_1px">
		      <span class="hd-title">每日资金分布</span>
		      <!-- <span class="dete-control column-control" @click="showPie"></span>
		      <span class="curdate">日期：{{curdate}}</span> -->
              <span class="dete-control column-control" @click="pieRequest"></span>
              <span class="curdate" id="J-xl-2">{{curdate}}</span>
		      <!-- <div class="stage-box column-dete" v-show="pieShow">
		        <div class="stage-inner">
		          <ul id="monthList">
		            <li @click="hidePie" v-for="(item, index) in pieDateValue" >
		            	<p @click="getPieDete(pieDateKey[index],pieDateValue[index])">{{pieDateValue[index]}}</p>	
		            </li>
		          </ul>
		        </div>
		      </div> -->
		    </div>
		  </div>
		  <div class="bd">
		    <div class="content chart-column">
		      <div id="main-pie" style="width:100%;height:200px;"></div>
		    </div>
		  </div>
		  <v-load v-show="load3"></v-load>
		</div>

		<div class="stage-cover" v-show="coverShow" @click="hideDetelist"></div>
	</div>
</template>

<script>
import echarts from 'common/js/echarts.min.js';
import 'common/js/jquery-1.8.3.min.js';
import 'common/js/laydate.dev.js';
import load from 'components/load/load';

const ERR_OK = 'success';

 export default{
 	components:{
 		'v-load': load
 	},
 	data() {
 		return {
 			detailShow: false,
 			pieShow: false,
 			coverShow: false,
 			funOverview: {},
 			inOutMoneyTrend: {},
 			fundDistribute: {},
 			columnDateValue: [],
 			columnDateKey: [],
 			pieDateValue: [],
 			pieDateKey: [],
 			curdate: '',
            session_token: localStorage.getItem("session_token"),
            load1: true,
            load2: true,
            load3: true
 		}
 	},
 	created() {
 		// 资金总览
 		this.$http.get('/api/fundOverview',{params:{ session_token: this.session_token }}).then((response) => { 
 			if(response.body.result == ERR_OK){ 
 				this.load1 = false;
 				this.funOverview = response.body.data;
 				this.funOverview.inMoney = this.toolHelper.formatNum(parseInt(this.funOverview.inMoney));
 				this.funOverview.poundage = this.toolHelper.formatNum(parseInt(this.funOverview.poundage));
 				this.funOverview.redScore = this.toolHelper.formatNum(parseInt(this.funOverview.redScore));
 				this.funOverview.blueScore = this.toolHelper.formatNum(parseInt(this.funOverview.blueScore));
 				this.funOverview.paymentIn = this.toolHelper.formatNum(parseInt(this.funOverview.paymentIn));
 				this.funOverview.rebateOut = this.toolHelper.formatNum(parseInt(this.funOverview.rebateOut));
 			}else{
 				alert(response.body.message);
 			}
 			
 		}).then((error)=> this.error = error)

 		// 近7日出入金趋势
 		this.getColumnDete('');

 		// 每日资金分布
 		this.getPieDete('');
 	},
 	methods: {
        // getValue(selectValue) {
        //   this.selectValue = selectValue;
        // },
        columnRequest: function(){
        	var _this = this;
        	this.coverShow = true;
            laydate({
                elem: '#column_date',
                min: '2016-10-01', //设定最小日期
                max: laydate.now(-1), //最大日期
                choose: function(datas){ //选择日期完毕的回调
                	var date = datas;
                	date = date.replace(/-/g,'');
                    _this.getColumnDete(date);
                    _this.coverShow = false
                }

            });
        },
        pieRequest: function(){
        	var _this = this;
        	this.coverShow = true;
            laydate({
                elem: '#J-xl-2',
                min: '2016-10-01', //设定最小日期
                max: laydate.now(-1), //最大日期
                choose: function(datas){ //选择日期完毕的回调
                	var date = datas;
                	date = date.replace(/-/g,'');
                    _this.getPieDete(date);
                    _this.coverShow = false
                }

            });
        },
 		showDetelist: function() {
 			this.detailShow = true;
 			this.coverShow = true;
 		},
 		hideDetelist: function(){
 			this.detailShow = false;
 			this.coverShow = false;
 			this.pieShow = false;
 		},
 		showPie: function() {
 			this.pieShow = true;
 			this.coverShow = true;
 		},
 		hidePie: function(){
 			this.pieShow = false;
 			this.coverShow = false;
 		},
 		getColumnDete: function(date) {
            // alert(date);
            this.load2 = true;
            this.pieDateValue = [];
            this.pieDateKey = [];
            this.$http.get('/api/inOutMoneyTrend',{params:{ session_token: this.session_token, date: date }}).then((response) => { 
            	this.load2 = false;
            	if(response.body.result == ERR_OK){ 
            		this.inOutMoneyTrend = response.body.data;
            		this.column('main-column', this.inOutMoneyTrend.dateList, this.inOutMoneyTrend.inMoneyList, this.inOutMoneyTrend.outMoneyList);
     
            		// this.ArryReverse(this.inOutMoneyTrend.selectDateList, this.pieDateValue, this.pieDateKey);

            	}else{
            		alert(response.body.message);
            	}
            	
            }).then((error)=> this.error = error)
        },
        getPieDete: function(date,dateKey) {
            // this.curdate = date;
            this.load3 = true;
            this.columnDateValue = [];
            this.columnDateKey = [];
            this.$http.get('/api/fundDistribute',{params:{ session_token: this.session_token, date: date }}).then((response) => { 
            	this.load3 = false;
 			if(response.body.result == ERR_OK){ 
 				this.fundDistribute = response.body.data;
 				// console.log(this.fundDistribute)

 				if(date == ''){
 					var _date = this.fundDistribute.showDate;
 					// _date = _date.replace(/年/g,'-');
 					// _date = _date.replace(/月/g,'-');
 					// _date = _date.replace(/日/g,'');
 					this.curdate = _date;
 				}else{
 					// this.curdate = date;
 				}
 				this.pie('main-pie', parseInt(this.fundDistribute.marketRevenue/10000), parseInt(this.fundDistribute.mainFund/10000), parseInt(this.fundDistribute.tradeiIndividualFundEnableMoney/10000), parseInt(this.fundDistribute.noTradeiIndividualFundEnableMoney/10000));

            	// this.ArryReverse(this.fundDistribute.selectDateList, this.columnDateValue, this.columnDateKey);

 			}else{
 				alert(response.body.message);
 			}
 			
 			}).then((error)=> this.error = error)
        },
        ArryReverse: function(arry, typeDateValue, typeDateKey){
        	for(var i = arry.length-1; i >= 0; i--){
        		typeDateValue.push(arry[i].dateValue);
        		typeDateKey.push(arry[i].dateKey)
        	}

        },
        pie: function(el, v1, v2, v3, v4){

	        let pie = echarts.init(document.getElementById(el));
        	let option_pie = {
        		tooltip : {
    		        trigger: 'item',
    		        formatter: function(p,params){
    		        	var aaa = params.split('_');
    		        	var color = ['#5450fe', '#54b9ff', '#ff6600', '#ff0000'];
						return '<span style="display:inline-block;width:10px;height:10px;background-color:'+color[p.dataIndex]+';border-radius: 50%;margin:0 5px;"></span>' + p.name + '</br><span style="padding: 0 20px">' +formatNum(p.value) + '万</span></br><span style="padding: 0 20px">' + p.percent + '%</span>';
					},
    		        // position:[3,3]
    		    },
        		color:['#5450fe', '#54b9ff', '#ff6600', '#ff0000'],
        	    series : [
        	        {
        	        	name: "每日资金",
        	            type: 'pie',
        	            radius : '65%',
        	            center: ['50%', '55%'],
        	            data:[
        	                {value:v1, name:'市场收益'},
        	                {value:v4, name:'无交易客户'},
        	                {value:v2, name:'挂牌商'},
        	                {value:v3, name:'有交易客户'} 
        	            ],
        	            itemStyle: {
        	                emphasis: {
        	                    shadowBlur: 10,
        	                    shadowOffsetX: 0,
        	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
        	                },
        	                normal:{
	                           label:{
    	                           show:true,
    	                           // formatter: '{b}\n\n{c}\n\n{d}%'
    	                           formatter: function(p,params){
    	                           		return p.name + '\n' + formatNum(p.value) + '万';
    	                           }
	                           },
	                           labelLine:{show:true}
        	                }
        	            }
        	        }
        	    ]
        	};

		    pie.setOption(option_pie);
		    function formatNum(strNum) {
		    if (strNum.length <= 3) {
		    return strNum;
		    }
		    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
		    return strNum;
		    }
		    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
		    var re = new RegExp();
		    re.compile("(\\d)(\\d{3})(,|$)");
		    while (re.test(b)) {
		    b = b.replace(re, "$1,$2$3");
		    }
		    return a + "" + b + "" + c;
		    }

        },
        column: function(el, x, y1, y2){

	        let column = echarts.init(document.getElementById(el));
	        let option_column = {
	        	tooltip: {
                         trigger: 'axis',
                         axisPointer: {
                             type: 'shadow'
                         },
                         formatter: function(params) {
                             // for text color
                             var colorList = ['#ff954b','#54b9ff'];
                             var res = '<div>';
                             res += '<strong>' + params[0].name + '</strong>'
                             for (var i = 0, l = params.length; i < l; i++) {
                                 res += '<br/><span style="display:inline-block;margin: 0 5px;height:10px;width:10px;border-radius:50%;background-color: '+colorList[i]+'"></span>' + params[i].seriesName + ' : ' + parseInt(params[i].value) + '万'
                             }
                             res += '</div>';
                             return res;
                         }
                     },
		         color: ['#ff954b','#54b9ff'],
		         grid: {
		              left: '3%',
		              right: '3%',
		              bottom: '3%',
		              top: '3%',
		              containLabel: true
		          },
		         calculable : true,
		         xAxis : [
		             {  
		                 // splitArea : {show : true},
		                 boundaryGap: true,
		                 type : 'category',
		                 data : x,
		                 axisLabel :{  
		                      interval:0,
		                  }
		             }
		         ],
		         yAxis : [
		             {
		                 type : 'value',
		                 axisLabel: {
		                     formatter: '{value}万'
		                 },
		                 axisTick: {
		                      alignWithLabel: true
		                  }
		             }
		         ],
		         series : [
		             {
		                 type:'bar',
		                 data: y1,
		                 name: "入金",
		                 itemStyle: {
		                   normal: {
		                       color: new echarts.graphic.LinearGradient(
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0, color: '#ff7417'},
		                                {offset: 0.5, color: '#ff9a56'},
		                                {offset: 1, color: '#ffb584'}
		                            ]
		                        ),
		                       barBorderRadius:[5, 5, 0, 0],
		                      //  label: {
		                      //   show: true,
		                      //   position: 'top',
		                      //   formatter: "{c}"
		                      // }
		                   }
		                },
		                barGap: '1%',
		                barWidth: 13
		             },
		             {
		                 type:'bar',
		                 data: y2,
		                 name: "出金",
		                 itemStyle: {
		                   normal: {
		                       color: new echarts.graphic.LinearGradient(
		                            0, 0, 0, 1,
		                            [
		                                {offset: 0, color: '#59bbff'},
		                                {offset: 0.5, color: '#80cbff'},
		                                {offset: 1, color: '#a8dbff'}
		                            ]
		                        ),
		                       barBorderRadius:[5, 5, 0, 0],
		                      //  label: {
		                      //   show: true,
		                      //   position: 'top',
		                      //   formatter: "{c}"
		                      // }
		                   }
		                  },
		                  barGap: '1%',
		                  barWidth: 13
		             }
		         ]
		    };

		    column.setOption(option_column);
        }
 	}
 };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    #laydate_box
        right: 10px!important
        left: auto!important
</style>
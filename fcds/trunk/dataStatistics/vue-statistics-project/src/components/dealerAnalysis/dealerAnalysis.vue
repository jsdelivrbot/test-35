<template>
	<div>
		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border-bottom-1px">
		      <span class="hd-title">客户分析</span>
		    </div>
		  </div>
		  <div class="bd">
		    <div class="content overview">
		      <ul> 
		        <li>无交易客户：<span>{{tradeUserAnalysisData.noTransactionUserCount}}</span></li>
		        <li>无入金客户：<span>{{tradeUserAnalysisData.noInMoneyUserCount}}</span></li>
		        <li style="width:100%">认购客户金额低于一万：<span>{{tradeUserAnalysisData.moneyLessSubscribeUser}}</span></li>
		        <li>认购客户无交易：<span>{{tradeUserAnalysisData.noTradeSubscribeUserCount}}</span></li>
		        <!-- <li>优质认购客户：<span>{{tradeUserAnalysisData.transactionUser}}</span></li> -->
		      </ul>
		    </div>
		  </div>
		  <v-load v-show="load1"></v-load>
		</div>

		<div style="height:0.1rem"></div>

		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border_1px">
		      <span class="hd-title">新增有效客户趋势</span>
		      <div class="legend">
		        <span>入金客户</span>
		        <span>交易客户</span>
		      </div>
		      <!-- <span class="dete-control column-control" @click="showDetetrend"></span> -->
		      <span class="dete-control column-control" @click="newAddTradeUserTrendRequest"></span>
		      <span id="newAddTradeUserTrend_date" class="opacity_date">{{curdate}}</span>
		      <!-- <div class="stage-box column-dete" v-show="detetrend">
		        <div class="stage-inner">
		          <ul id="monthList">
		            <li @click="hideDetetrend" v-for="(item, index) in newAddTradeUserTrendDete" >
		            	<p @click="getNewAddTradeUserTrendData(newAddTradeUserTrendDete[index].dateKey)">{{newAddTradeUserTrendDete[index].dateValue}}</p>	
		            </li>
		          </ul>
		        </div>
		      </div> -->
		    </div>
		  </div>
		  <div class="bd">
		    <div class="content chart-polyline">
		      <div id="main-polyline" style="width:100%;height:200px;"></div>
		    </div>
		  </div>
		  <v-load v-show="load2"></v-load>
		</div>

		<div style="height:0.1rem"></div>

		<div class="section">
		  <div class="hd">
		    <div class="hd-inner border_1px">
		      <span class="hd-title">认购客户活跃度</span>
		      <div class="legend">
		        <span>在线</span>
		        <span>交易</span>
		      </div>
		      <!-- <span class="dete-control column-control" @click="showDetelist"></span> -->
		      <span class="dete-control column-control" @click="activeTrendRequest"></span>
		      <span id="activeTrend_date" class="opacity_date">{{curdate}}</span>
		      <!-- <div class="stage-box column-dete" v-show="detailShow">
		        <div class="stage-inner">
		          <ul id="monthList">
		            <li @click="hideDetetrend" v-for="(item, index) in activeTrendDate" >
		            	<p @click="getActiveTrendData(activeTrendDate[index].dateKey)">{{activeTrendDate[index].dateValue}}</p>
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
		  <v-load v-show="load3"></v-load>
		</div>
		<div class="stage-cover" v-show="cover" @click="hideDetelist"></div>
		
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
 			detetrend: false,
 			cover: false,
 			curdate: '',
 			datetrend:['2017-03','2017-03','2017-02','2017-02','2017-01'],
 			tradeUserAnalysisData: {},
 			newAddTradeUserTrendDate: {},
 			newAddTradeUserTrendDete: [],
 			activeTrendData: {},
 			activeTrendDate: [],
 			session_token: localStorage.getItem("session_token"),
 			load1: true,
 			load2: true,
 			load3: true
 		};
 	},
 	created() {
 		this.tradeUserAnalysis();
 		this.newAddTradeUserTrend('');
 		this.activeTrend('');
 	},
 	methods: {
 		newAddTradeUserTrendRequest: function(){
 			var _this = this;
 			this.cover = true;
 		    laydate({
 		        elem: '#newAddTradeUserTrend_date',
 		        min: '2016-10-01', //设定最小日期
                max: laydate.now(-1), //最大日期
 		        choose: function(datas){ //选择日期完毕的回调
 		        	var date = datas;
 		        	date = date.replace(/-/g,'');
 		            _this.getNewAddTradeUserTrendData(date);
 		            _this.cover = false;
 		        }

 		    });
 		},
 		activeTrendRequest: function(){
 			var _this = this;
 			this.cover = true;
 		    laydate({
 		        elem: '#activeTrend_date',
 		        min: '2016-10-01', //设定最小日期
                max: laydate.now(-1), //最大日期
 		        choose: function(datas){ //选择日期完毕的回调
 		        	var date = datas;
 		        	date = date.replace(/-/g,'');
 		            _this.getActiveTrendData(date);
 		            _this.cover = false;
 		        }

 		    });
 		},
 		showDetelist: function() {
 			this.detailShow = true;
 			this.cover = true;
 		},
 		hideDetelist: function(){
 			this.detailShow = false;
 			this.detetrend = false;
 			this.cover = false;
 		},
 		showDetetrend: function(){
 			this.detetrend = true;
 			this.cover = true;
 		},
 		hideDetetrend: function(){
 			this.detetrend = false;
 			this.detailShow = false;
 			this.cover = false;
 		},
        getNewAddTradeUserTrendData: function(date) {
        	this.newAddTradeUserTrend(date);
        },
        getActiveTrendData: function(date) {
        	this.activeTrend(date);
        },
        tradeUserAnalysis: function() {
        	this.load1 = true;
        	this.$http.get('/api/tradeUserAnalysis',{params:{ session_token: this.session_token}}).then((response) => { 
        		this.load1 = false;
        		if(response.body.result == ERR_OK){ 
        			this.tradeUserAnalysisData = response.body.data;
        			this.tradeUserAnalysisData.noTradeSubscribeUserCount = this.toolHelper.formatNum(parseInt(this.tradeUserAnalysisData.noTradeSubscribeUserCount));
        			this.tradeUserAnalysisData.noInMoneyUserCount = this.toolHelper.formatNum(parseInt(this.tradeUserAnalysisData.noInMoneyUserCount));
        			this.tradeUserAnalysisData.moneyLessSubscribeUser = this.toolHelper.formatNum(parseInt(this.tradeUserAnalysisData.moneyLessSubscribeUser));
        			this.tradeUserAnalysisData.noTransactionUserCount = this.toolHelper.formatNum(parseInt(this.tradeUserAnalysisData.noTransactionUserCount));
        		}else{
        			
        		}
        		
        	}).then((error)=> this.error = error)
        },
        newAddTradeUserTrend: function(date) {
        	this.newAddTradeUserTrendDete = [];
        	this.load2 = true;
        	this.$http.get('/api/addEffectiveUser',{params:{ session_token: this.session_token, date: date}}).then((response) => { 
        		this.load2 = false;
        		if(response.body.result == ERR_OK){ 
        			this.newAddTradeUserTrendDate = response.body.data;
        			// this.ArryReverse(this.newAddTradeUserTrendDate.selectDateList, this.newAddTradeUserTrendDete);
        			this.folding('main-polyline', this.newAddTradeUserTrendDate.dateList, this.newAddTradeUserTrendDate.firstInMoneylist, this.newAddTradeUserTrendDate.firstTransactionlist);
        			if(date == ''){
        			  this.curdate = this.newAddTradeUserTrendDate.showDate;
        			}else{
        			  // this.curdate = dateValu;
        			}
        		}else{
        			alert(response.body.message);
        		}
        		
        	}).then((error)=> this.error = error)
        },
        activeTrend: function(date) {
        	this.activeTrendDate = [];
        	this.load3 = true;
        	this.$http.get('/api/activeSubscribeUser',{params:{ session_token: this.session_token, date: date}}).then((response) => { 
        		this.load3 = false;
        		if(response.body.result == ERR_OK){ 
        			this.activeTrendData = response.body.data;
        			// this.ArryReverse(this.activeTrendData.selectDateList, this.activeTrendDate);
        			this.column('main-column', this.activeTrendData.dateList, this.activeTrendData.onLinelist, this.activeTrendData.joinTransactionUserList)
        		}else{
        			alert(response.body.message);
        		}
        		
        	}).then((error)=> this.error = error)
        },
        ArryReverse: function(arry, curArry) {
          for(var i = arry.length-1; i >= 0; i--){
            curArry.push(arry[i]);
          }
        },
        folding: function(el, v1, v2, v3){
          let folding = echarts.init(document.getElementById(el));
          let option_folding = {
              tooltip : {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              grid: {
                  left: '2%',
                  right: '7%',
                  bottom: '3%',
                  top: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : v1,
                      axisLabel: {
                         interval: 0
                      }
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series : [
                  {
                      name:'入金客户',
                      type:'line',
                      data:v2,
                      itemStyle: {
                        normal: {
                          color:'#ff6701',
                           // label: {
                           //   show: true,
                           //   position: 'top',
                           //   formatter: "{c}"
                           // }
                        }
                      }
                  },
                  {
                      name:'交易客户',
                      type:'line',
                      data:v3,
                      itemStyle: {
                        normal: {
                          color:'#54b9ff',
                           // label: {
                           //   show: true,
                           //   position: 'top',
                           //   formatter: "{c}"
                           // }
                        }
                      }
                  }
              ]
          };
          folding.setOption(option_folding);
        },
        column: function(el, date, v1, v2) {
	        let column = echarts.init(document.getElementById(el));
	        let option_column = {
	        	tooltip: {
                         trigger: 'axis',
                         axisPointer: {
                             type: 'shadow'
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
		                 type : 'category',
		                 data : date,
		                 axisLabel :{  
		                      interval:0,
		                  }
		             }
		         ],
		         yAxis : [
		             {
		                 type : 'value',
		                 axisLabel: {
		                     formatter: '{value}'
		                 },
		                 axisTick: {
		                      alignWithLabel: true
		                  }
		             }
		         ],
		         series : [
		             {
		                 type:'bar',
		                 name:'在线',
		                 data:v1,
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
		                 name:'交易',
		                 data:v2,
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

</style>
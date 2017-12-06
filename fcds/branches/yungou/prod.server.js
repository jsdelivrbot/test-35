var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app= express()
var router = express.Router()

router.get('/',function (req, res, next) {
  req.url = '/index.html'
  next()
 })

app.use(router)

//异步接口
var yunData = require("./yun.json");
var goods = yunData.goods;
var lists = yunData.lists;
var apiRoutes = express.Router();
apiRoutes.get('/goods', function (req, res) {
  res.json({
    result: 'success',
    data: goods
  });
});
apiRoutes.get('/lists', function (req, res) {
  res.json({
    result: 'success',
    data: lists
  });
});

app.use('/api', apiRoutes);

//定义express静态目录
app.use(express.static('./dist'))

var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port
var opn = require('opn')
//启动express
module.exports = app.listen(port, function (err) {
   if (err) {
     console.log(err)
    return
   }
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
     opn(uri)
   }
 })

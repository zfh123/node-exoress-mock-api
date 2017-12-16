/**
 * @desc 引入模块
 * @param {Object} express
 * @param {Object} mockjs
 */
let express = require('express'); //引入express模块
let Mock = require('mockjs'); //引入mock模块
let app = express(); //实例化express

/**
 * @desc 模拟和后端解决跨越
 * @param {String} req
 * @param {String} res
 * @param {Function} next
 */
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,business_id,client_id");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET");
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        /*让options请求快速返回*/
    } else {
        next();
    }

});

/**
 * 监听8078端口
 * get请求 req.query （可以通过接收的参数选择不同的数据）
 * post请求 req.body
 */
app.listen(8078, () => {
    console.log('JSON Server is running')
})

/**
 * @desc mock.js模拟数据
 * @param 
 */
const SimulatedData = {
    /**
     * @desc 模拟获取token
     */
    'getToken': () => {
        return Mock.mock({
            "code": 200,
            "token": '4274-4234-jkfjs23-424234',
            "refresh_token": '12de-kdek-jdkjq-eiw33',
            "message": "成功",
        })
    },
    /**
     * @desc 模拟获取商铺列表
     */
    'getBusinessCodes': () => {
        return Mock.mock({
            "code": 200,
            "data": {
                "businessObjectList": [{
                        "id": '57100001',
                        "code": '57100001'
                    },
                    {
                        "id": '57100002',
                        "code": '57100002'
                    },
                ]
            },
            "message": "成功",
        })
    },
    /**
     * @desc 模拟获取数据
     */
    'init': () => {
        return Mock.mock({
            "code": 200,
            "data": {
                "business": {
                    "id": '57100001',
                    "code": '57100001'
                }
            },
            "message": "成功",
        })
    }
}

/**
 * @desc 实例化接口名称
 * @param
 */
app.all('/getToken', (req, res) => {
    let getToken = SimulatedData['getToken']()
    res.json(getToken);
});
/**
 * @desc 实例化接口名称
 * @param
 */
app.all('/getBusinessCodes', (req, res) => {
    let getBusinessCodes = SimulatedData['getBusinessCodes']()
    res.json(getBusinessCodes);
});
/**
 * @desc 实例化接口名称
 * @param
 */
app.all('/init', (req, res) => {
    let init = SimulatedData['init']()
    res.json(init);
});

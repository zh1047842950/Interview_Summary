setstate是同步还是异步
    setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
    setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
    setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。


跨域请求时，OPTIONS请求触发条件【复杂请求】
简单请求必须符合以下规定：
    只能使用get/post/head请求方式
    不能手动设置以下集合之外的请求头信息
        accept
        accept-language
        content-language
        content-type
        content-type只能设置以下内容：
            text/plain
            multipart/form-data
            application/x-www-http-urlencoded
    不能为XMLHttpRequestUpdate注册监听器
    请求中没有使用readableStream对象
CORS预检请求触发条件	
1. 使用了下面任一HTTP 方法：	
PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH	
2. 人为设置了以下集合之外首部字段：	
Accept/Accept-Language/Content-Language/Content-Type/DPR/Downlink/Save-Data/Viewport-Width/Width	
3. Content-Type 的值不属于下列之一:	
application/x-www-form-urlencoded、multipart/form-data、text/plain



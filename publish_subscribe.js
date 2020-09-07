// 发布订阅模式
// 经纪人，中间站，消息中心etc
class Broker {
  constructor() {
    this.subs = {}
  }
  // 订阅
  subscribe(topic, cb) {
    const { subs } = this
    // 需要订阅的主题是否有人订阅过
    const cbs = subs[topic]
    if(cbs) {
      cbs.push(cb)
    } else {
      this.subs[topic] = [cb]
    }
  }
  unsubscribe(topic, cb) {
    const { subs } = this
    const cbs = subs[topic]
    if(cbs) {
      const index = cbs.indexOf(cb)
      if(~index) {
        cbs.splice(index, 1)
      }
    }
  }
  // 发布
  publish(topic, args) {
    (this.subs[topic] || []).forEach(cb => {
      cb(args)
    })
  }
}

const broker = new Broker()

// A订阅了A事件，他只关心A事件本身，至于谁发布的无所谓
broker.subscribe('A', function A(...args) {
  console.log(`A接收到了：`, args)
})
broker.subscribe('A', function A_1(...args) {
  console.log(`A_1接收到了：`, args)
})

function B(...args) {
  console.log(`B接收到了：`, args)
}
// B订阅了B事件，他只关心A事件本身，至于谁发布的无所谓
broker.subscribe('B', B)

// XX发布了A事件，他只关心他发了什么，谁接收的无所谓
broker.publish('A', '海贼王更新到800集了')
// XX发布了B事件
broker.publish('B', '海贼王更新到800集了')

// B退订了B事件
broker.unsubscribe('B', B)

// XX发布了A事件
broker.publish('A', '海贼王更新到801集了')
// XX发布了B事件
broker.publish('B', '海贼王更新到801集了')

// 观察者模式
// 被观察者即目标
class Subject {
  constructor() {
    this._observes = []
  }
  // 订阅
  add(ob) {
    const { _observes } = this
    const index = _observes.indexOf(ob)
    if(ob && !~index) {
      _observes.push(ob)
    }
  }
  remove(ob) {
    const { _observes } = this
    if(ob) {
      const index = _observes.indexOf(ob)
      ~index && _observes.splice(index, 1)
    }
  }
  // 发布
  notify(args) {
    this._observes.forEach(ob => {
      ob.update(args)
    })
  }
}
// 观察者，需要提供一个接口（update）给目标，让它可以通过这个接口传递更新的消息
class Observer {
  constructor(name) {
    this.name = name
  }
  update(...args) {
    console.log(`${this.name}收到了：`, args)
  }
}

// 目标告诉观察者自己更新了，所以得建个目标对象
const subject = new Subject()
// 创建观察者
const ob1 = new Observer('ob1')
const ob2 = new Observer('ob2')

subject.add(ob1)
subject.add(ob2)
subject.notify('海贼王更新到800集了')

console.error('退订了，推送新消息')
subject.remove(ob2)
subject.notify('海贼王更新到801集了')

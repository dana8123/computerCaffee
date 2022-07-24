import { EventEmitter } from 'events'

function helloEvents() {
    const eventEmitter = new EventEmitter()
    setTimeout(() => eventEmitter.emit('complete', 'hello world'), 100)
    return eventEmitter
}

function helloCallback(cb) {
    setTimeout(() => cb(null, 'hello world'), 100)
}

helloEvents().on('complete', message => console.log(message))
helloCallback((err, message) => console.log(message))


// 두 함수의 기능적 차이는 없음
// 가독성, 의미, 구현, 사용되는데 필요한 코드의 양으로 구분
// 콜백 : 여러 유형의 결과를 전달하는데 제한이 있음, 
// 콜백의 인자로 타입을 전달하거나 각 이벤트에 적합한 여러개의 콜백을 취하여 차이를 둘 수 있으나, 깔끔한 API는 아님
// Event Emitter : 같은 이벤트가 여러번 발생하거나 발생하지 않을 수 있음, 콜백은 단 한번 호출됨.

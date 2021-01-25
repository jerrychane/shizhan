function echo<T>(arg: T): T {
    return arg
}
// const str: string = 'str'
const result = echo(123)

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])
// 约束泛型-方案一,返回结果只能是数组
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
const arrs = echoWithArr([1, 2, 3])
// 约束泛型-方案二,通过 extends 和 interface 设置约束条件
interface IWithLength {
    length: number;
}
function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
const str = echoWithLength('str')
const obj = echoWithLength({ length: 10, width: 10 })
const arr2 = echoWithLength([1, 2, 3])
// 类使用泛型约束
class Queue<T> {
    private data = []
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.shift()
    }
}
const queque = new Queue<number>()
queque.push(1)
console.log(queque.pop().toFixed())

const queque2 = new Queue<string>()
queque2.push('str')
console.log(queque2.pop().length)

// 接口添加泛型
interface KeyPair<T, U> {
    key: T;
    value: U;
}
let kp1: KeyPair<number, string> = { key: 123, value: 'str' }
let kp2: KeyPair<string, number> = { key: 'test', value: 123 }

let arr: number[] = [1, 2, 3]
let arrTwo: Array<number> = [1, 2, 3]

// inerface 描述一个函数的type
interface IPlus<T> {
    (a: T, b: T): T
}
function plus(a: number, b: number): number {
    return a + b;
}
function connect(a: string, b: string) {
    return a + b;
}
const a: IPlus<number> = plus
const b: IPlus<string> = connect
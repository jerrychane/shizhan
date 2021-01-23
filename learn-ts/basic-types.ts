let isDone: boolean = false
let age: number = 20
let binaryNumber: number = 0b1111
let firstName: string = 'viking'
let message: string = 'Hello, ${firstName}, age is ${age}'
let u: undefined = undefined
let n: null = null
let num: number = undefined

let notSure: any = 4
notSure = 'maybe it is a string'
notSure = true

notSure.myName
notSure.getName()

let numberOrString: number | string = 234
numberOrString = 'abc'
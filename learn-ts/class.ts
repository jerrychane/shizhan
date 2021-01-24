class Animal {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}
const snake = new Animal('lily')
// 继承
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}
const xiaobao = new Dog('xiaobao')
// 重写类-多态
class Cat extends Animal {
    constructor(name) {
        super(name)
        console.log(this.name)
    }
    run() {
        // 调用父类的方法，需使用super关键字
        return 'Meow, ' + super.run()
    }
}
const maomao = new Cat('maomao')
console.log(maomao.run())
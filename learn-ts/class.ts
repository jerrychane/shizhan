class Animal {
    public name: string;
    static categories: string[] = ['mammal', 'bird'];
    static isAnimal(a) {
        return a instanceof Animal
    }
    // private name: string;
    // protected name: string;
    // readonly name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running`
    }
}
console.log(Animal.categories)
const snake = new Animal('lily')
console.log(Animal.isAnimal(snake))
console.log(snake.name)
snake.name = 'lucy'
console.log(snake.name)

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

interface Radio {
    switchRadio(): void;
}
interface Battery {
    checkBatteryStatus();
}
interface RadioWithBattery extends Radio {
    checkBatteryStatus();
}
class Car implements Radio {
    switchRadio() {

    }
}
class Cellphone implements RadioWithBattery {
    switchRadio() {

    }
    checkBatteryStatus() {

    }
}
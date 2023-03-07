# 一个只实现基本注入功能的 DI 容器

编译：`npm run dev`

测试: `npm run test`

## 什么是 di 容器

di 就是依赖注入(dependence inject)。di 容器就是依赖注入容器。

## 什么是依赖注入

假设有两个类，Log 类，Main 类。Main 类需要依赖 Log 类来输出日志。

没有依赖注入的写法：

```javascript
class Log {
  output(logText: String) {
    console.log(logText);
  }
}

class Main {
  constructor() {
    this.log = new Log();
    this.log.output('main 初始化完成');
  }
}

new Main(); //输出： main 初始化完成
```

有依赖注入的写法：

```javascript
class Log {
  output(logText: String) {
    console.log(logText);
  }
}

class Main {
  constructor(private log:Log) {
    this.log.output("main 初始化完成");
  }
}

const diContainer = new DiContainer();
diContainer.addDependence([Log]);
diContainer.instantiate(Main); //instantiate可以检测到Main的constructor依赖了Log，且Log为第一个参数。这样它就会先创建一个Log的实例，然后把这个实例传递给Main并同时创建Main的实例。
```

- 没有依赖注入：Main 需要自己通过 new Log()来实例化 Log；

- 有依赖注入：只需要把 Log 这个依赖注册到容器，然后由容器来实例化 Main，容器在实例化 Main 的时候就会自动实例化 Main 的依赖 Log，然后注入到 Main 中。

表面来看，有 Di 容器的写法倒还多了一些代码，但是当我们的依赖非常多的时候，有 Di 容器就可以省掉很多类似`this.a = new A();this.b = new B(); this.c = new C() ....  this.z = new Z()`这种样板代码了。对于最佳实践来说，这种重复的样板代码确实是应该干掉的，这样可以让我们的代码看起来更加清爽。这只是 Di 容器的优点之一，它还有很多其他的优点，比如通过 Di 容器的写法可以清晰的看到我们程序中各个类的依赖关系，方便静态分析，等等优势。最重要的是：

- Di 容器是符合程序设计中的 SOLID 原则中 Dip(Dependency Inversion Principle)依赖倒置原则的重要方法。

## 什么是控制反转

在上面的例子中，Main 依赖了 Log，但是它没有直接创建 Log 而是容器创建好 Log 后给它，它对创建 Log 这个控制就反转给容器了。这就是控制反转。

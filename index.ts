import Container from './src/lib/container/container';
import Injectable from './src/lib/decorators/injectable';

class Log {
  constructor() {}
  output(logText: String) {
    console.log(logText);
  }
}

@Injectable()
class Main {
  constructor(private log: Log) {
    this.log.output('调用注入的log成功，main 初始化完成');
  }
}

const diContainer = new Container();
diContainer.addDependence(Log);
diContainer.instantiate(Main);

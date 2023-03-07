import 'reflect-metadata';
import { isInjectable } from '../decorators/injectable';
class Container {
  dependenceMap: WeakMap<any, any>;
  dependenceInstanceMap: WeakMap<any, any>;
  constructor() {
    this.dependenceMap = new WeakMap();
    this.dependenceInstanceMap = new WeakMap();
  }

  addDependence(dependence: Function) {
    this.dependenceMap.set(dependence, dependence);
  }

  getDependence(dependence: Function) {
    return this.dependenceMap.get(dependence);
  }

  instantiate(classTarget: ClassType<any>) {
    const injectable = isInjectable(classTarget);
    if (!injectable) {
      return Reflect.construct(classTarget, []);
    }
    const paramTypes = Reflect.getMetadata('design:paramtypes', classTarget);
    return Reflect.construct(
      classTarget,
      paramTypes.map((target: any) => {
        const dependence = this.getDependence(target);
        if (!dependence) {
          throw new Error(`dependence ${target} is not added to container`);
        }

        let dependenceInstance = this.dependenceInstanceMap.get(target);
        if (!dependenceInstance) {
          dependenceInstance = this.instantiate(target);
        }
        return dependenceInstance;
      }),
    );
  }
}

export default Container;

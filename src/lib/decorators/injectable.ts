const INJECTABLE_META_KEY = Symbol('injectable');
function Injectable() {
  return (target: Function) =>
    Reflect.defineMetadata(INJECTABLE_META_KEY, true, target);
}

function isInjectable(target: Function) {
  return Reflect.getMetadata(INJECTABLE_META_KEY, target) === true;
}

export default Injectable;

export { isInjectable };

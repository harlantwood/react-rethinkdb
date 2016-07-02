import { BaseMixin } from 'react-rethinkdb';

const Rethinkable = sessionGetter => component => {
  const proto = BaseMixin.call(component.prototype, sessionGetter);
  const unmount = proto.componentWillUnmount;

  proto.componentDidMount = function () {
    this._isMounted = true;
  };

  proto.componentWillUnmount = function () {
    this._isMounted = false;
    unmount.call(this);
  };

  for (let key in proto) {
    const _proto = component.prototype[key];
    component.prototype[key] = function (...args) {
      proto[key].call(this, ...args);
      if (_proto) {
        _proto.call(this, ...args);
      }
    }
  }
};

export default Rethinkable;

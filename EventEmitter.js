class EventEmitter {
  constructor () {
    this.listeners = []
  }

  on (type, callback) {
    this.listeners.push({
      type,
      callback
    })
  }

  emit (type, ...args) {
    this.listeners
      .filter(listener => listener.type === type)
      .forEach(listener => listener.callback(...args))
  }

  off (type, callback) {
    if (!callback) {
      this.listeners = this.listeners
        .filter(listener => listener.type === type)
    } else {
      this.listeners = this.listeners
        .filter(listener => listener.type !== type && listener.callback !== callback)
    }
  }

  once (type, callback) {
    const self = this
    function _callback (...args) {
      callback(...args)
      self.off(type, _callback)
    }
    this.on(type, _callback)
  }
}
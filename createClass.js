function createClass (parent, object) {
  typeof parent !== 'function' && (
    object = parent,
    parent = null
  )
  let { constructor, ...methods } = object

  
  // 构造函数
  function retClass () {
    /**
     * 如果是有父类的话，就要制造一个 _super 对象，
     * 实现就是将父类的方法全部以 bind(this) 的形态挂载到 _super 上，
     * 而 _super 本身是父类的构造函数，当然这个构造函数中的 this 是当前对象
     */
    if (parent) {
      const parentPrototype = parent.prototype
      const _super = parentPrototype.constructor.bind(this)
      Object.keys(parentPrototype)
        .reduce((o, i) => {
          if (typeof parentPrototype[i] === 'function') {
            o[i] = parentPrototype[i].bind(this)
          } else {
            o[i] = parentPrototype[i]
          }
        }, _super)

      this._super = _super
      constructor.apply(this, [
        _super,
        ...arguments
      ])
    } else {
      constructor.apply(this, arguments)
    }
  }

  // 继承父类方法
  parent && Object.setPrototypeOf(retClass.prototype, parent.prototype)
  
  // 将方法和静态方法分别挂载到 prorotype 和 对象上
  Object.keys(methods).forEach(k => {
    const v = methods[k]
    if (k.startsWith('STATIC_')) {
      retClass[k.replace(/^STATIC_/, '')] = v
    } else {
      retClass.prototype[k] = v
    }
  })


  return retClass
}
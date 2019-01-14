const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const FAILED = 'failed'

class Callback {
  constructor (type, callback) {
    this.type = type
    this.fn = callback
  }
}

class MyPromise {
  constructor (fn) {
    this.status = PENDING
    const resolve = (res) => {
      this.status = FULFILLED
      this.result = res
    }
    const reject = (err) => {
      this.status = FAILED
      this.result = err
    }

    this.callbacks = []
    this.result = undefined

    this._start(() => fn(resolve, reject))
  }

  then (resolve, reject) {
    resolve && this.callbacks.push(new Callback('resolve', resolve))
    reject && this.callbacks.push(new Callback('reject', reject))
    return this
  }

  catch (reject) {
    reject && this.callbacks.push(new Callback('reject', reject))
    return this
  }

  _start (fn) {
    fn()
    this._runThen()
  }

  _runThen () {
    setTimeout(() => {
      let callback
      if (this.status === FULFILLED) {
        while (this.callbacks.length > 0 && !callback) {
          callback = this.callbacks.shift()
          callback.type !== 'resolve' && (callback = null)
        }
      } else if (this.status === FAILED) {
        while (this.callbacks.length > 0 && !callback) {
          callback = this.callbacks.shift()
          callback.type !== 'reject' && (callback = null)
        }
      }
      try {
        callback && (this.result = callback.fn(this.result))
      } catch (err) {
        this.status = FAILED
        this.result = err
        this._runThen()
        return
      }
      this.status = FULFILLED
      this._runThen()
    })
  }
}

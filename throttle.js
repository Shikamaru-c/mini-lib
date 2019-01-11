function throttle1 (fn, wait) {
  let last = 0
  return function () {
    if (getNow() - last > wait) {
      fn.apply(this, arguments)
      last = getNow()
    }  
  }

  function getNow () {
    return +(new Date())
  }
}

function throttle2 (fn, wait) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
}

function throttle (fn, wait, immediate) {
  let last = 0
  let timer
  return function () {
    if (immediate) {
      if (getNow() - last > wait) {
        fn.apply(this, arguments)
        last = getNow()
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, arguments)
          timer = null
        }, wait)
      }
    }
  }

  function getNow () {
    return +(new Date())
  }
}
function debounce1 (fn, wait) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

function debounce2 (fn, wait) {
  let timer
  return function () {
    if (timer) {
      clearTimeout(timer)
    } else {
      fn.apply(this, arguments)
    }
    timer = setTimeout(() => {
      timer = null
    }, wait)
  }
}

function debounce3 (fn, wait, immediate) {
  let timer
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate) {
      if (!timer) fn.apply(this, arguments)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
}

// underscore 版
function debounce (fn, wait, immediate) {
  let timer
  const later = (context, args) => setTimeout(() => {
    timer = null
    if (!immediate) {
      fn.apply(context, args) 
    }
  }, wait)

  return function () {
    if (!timer) {
      timer = later(this, arguments)

      if (immediate) {
        fn.apply(this, arguments)
      }
    } else {
      clearTimeout(timer)
      timer = later(this, arguments)
    }
  }
}
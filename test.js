const MiniPromise = require('./MiniPromise')

const p = new MiniPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 1000)
})

p.then(res => {
  console.log(res)
  return new MiniPromise((resolve, reject) => {
    setTimeout(() => {
      console.log(222)
      resolve(222)
    }, 1000)
  })
}).then(res => {
  console.log(res)
})

export default () => {
  const prefix = '[OverGrid]'

  function log(...args: any[]) {
    console.log(prefix, ...args)
  }

  function warn(...args: any[]) {
    console.warn(prefix, ...args)
  }

  function error(...args: any[]) {
    console.error(prefix, ...args)
  }

  return {
    log,
    warn,
    error,
  }
}

export default () => {
  const prefix = '[OverGrid]'

  function info(...args: any[]) {
    console.info(prefix, ...args)
  }

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
    info,
    log,
    warn,
    error,
  }
}

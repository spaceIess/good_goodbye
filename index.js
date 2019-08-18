class GoodGoodbye {
  constructor () {
    this.callbacks = {}

    this.setGoodByes()
  }

  setGoodByes = () => window.addEventListener("beforeunload", e => this.executeCallbacks(e))

  executeCallbacks = e => {
    let result

    Object.keys(this.callbacks).forEach(name => {
      const callbackResult = this.callbacks[name] && this.callbacks[name]()
      if (!result && callbackResult) result = callbackResult
    })

    if (result) {
      if (e) e.returnValue = result
      return result
    }
  }

  set = (name, callback) => {
    if (this.callbacks[name]) return `Func "${name}" is already used`

    this.callbacks[name] = callback
    return this.callbacks[name]
  }

  unset = name => delete this.callbacks[name]

  unsetAll = () => {
    Object.keys(this.callbacks).forEach(this.remove)
    this.setPrompt(false)

    return this.callbacks
  }
}

module.exports = new GoodGoodbye()

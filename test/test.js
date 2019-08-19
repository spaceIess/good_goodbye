const Unloader = require("../index")
const expect  = require('chai').expect
const sinon = require("sinon")

describe("Unloader", () => {
  beforeEach(() => {
    Unloader.unsetAll()
  })

  describe("#add", () => {
    it("add callback function", () => {
      Unloader.set("test", () => {})
      expect(Unloader.callbacks).to.include.all.keys("test")
      expect(typeof Unloader.callbacks.test).to.equal("function")
    })

    it("doesn't add existing name callback", () => {
      Unloader.set("test", () => {})
      expect(Unloader.set("test", () => {})).to.equal(`Func "test" is already used`)
    })
  })

  describe("#unset", () => {
    it("remove callback function", () => {
      Unloader.set("test", () => {})
      expect(Unloader.callbacks).to.include.all.keys("test")

      Unloader.unset("test")
      expect(Unloader.callbacks).not.to.include.all.keys("test")
    })
  })

  describe("executeCallbacks", () => {
    it("call all registered callbacks", () => {
      callbackMock1 = sinon.spy()
      callbackMock2 = sinon.spy()
      callbackMock3 = sinon.spy()

      Unloader.set("test", callbackMock1)
      Unloader.set("test2", callbackMock2)
      Unloader.set("test3", callbackMock3)

      Unloader.executeCallbacks()

      expect(callbackMock1.calledOnce).to.be.true
      expect(callbackMock2.calledOnce).to.be.true
      expect(callbackMock3.calledOnce).to.be.true
    })
  })

  describe("unsetAll", () => {
    it("remove all callbacks", () => {
      const callbacks = ["test", "test2", "test3"]

      callbacks.forEach(callbackName => Unloader.set(callbackName, () => {}))
      expect(Unloader.callbacks).to.include.all.keys(callbacks)

      Unloader.unsetAll()
      expect(Object.keys(Unloader.callbacks).length).to.equal(0)
    })
  })
})

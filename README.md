# good_goodbye

Easy way to determine any beforeunload callbacks do you need.

## Installation

Install with yarn:

```sh
yarn add good-goodbye
# or npm:
npm i -S good-goodbye
```

## Usage

```js
import GooodGoodbye from 'good-goodbye'

GooodGoodbye.set("testUnload", () => { 
  SomeModule.call("unloadCallback")
})

//To show browser prompt return text or true value
GooodGoodbye.set("testUnload", () => { 
  SomeModule.call("unloadCallback")
  if (SomeModule.hasWarnings()) return "Warning"
  if (SomeModule.unfinished()) return true
})

//Get all callbacks
GooodGoodbye.callbacks // => { testUnload: f }

//Unset callback
GooodGoodbye.unset("testUnload")

//Unset all callbacks
GooodGoodbye.unsetAll()
```

## License
Released under MIT License.

## Authors
Created by spaceIess.
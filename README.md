
# React-Tooltiper - creating Tooltips is never being so easy! [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=See&url=https://github.com/BiosBoy/react-tooltiper&via=svyat770&hashtags=js,jsx,tooltips,react-tooltiper,react,html,css)

### The easist way to perform tooltips in React ecosystem!

[![npm](https://badgen.net/npm/v/react-tooltiper)](https://www.npmjs.com/package/react-tooltiper) [![Price](https://img.shields.io/badge/price-FREE-purple.svg)](https://github.com/BiosBoy/react-tooltiper/blob/master/LICENSE) [![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/BiosBoy/react-tooltiper/blob/master/LICENSE) [![GitHub package version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/BiosBoy/react-tooltiper)

  

![logo_image](https://raw.githubusercontent.com/BiosBoy/react-tooltiper/master/react-tooltiper_logo.png)

  
  

## Motivation

Once you came in situation with repeating youself in code you what to optimize it somehow. As for me **Tooltips** is the on of such problems. It's so easy to create, but in the the same time it's very boring create them each time in a different App parts for they apper. From other side we have a caveat in face of the code size and perfomance which's on my opinion is even more relevant then just code-readablity. So, to solve all these problems abive by once I've create library **React-Tooltiper** based on top of the React 16 (*Hooks support!*). It's not just save your time in tooltip creation, but also (and the most important) it'll give you an opporuninty to manage all your tooltips by one single place without any efforts or tears! The core principle here is "**Initialize it once - use everywhere!**" :)

  
## How to use (Quick Start):

#### 1. Grab React-Tooltiper package from `npm` by:

```

npm install react-tooltiper -g

```

----------or-----------

```

yarn add react-tooltiper -g

```

#### 2. Inject React-Tooltiper on top of your App:

- For example:

  

```
  import React from 'react'
  import ReactTooltiper from 'react-tooltiper'

  class AppContainer extends {
    render() {
      return (
        <div className='mainWrap'>
          <ReactTooltiper /> // inject main React-Tooltip Component only once and use it everywhere inside your app!
          // ... Your Component Here
        </div>
      )
    }
  }
```

**or in case of Hooks/SFC inspiration use:**

```
  const AppContainer = () => {
    return (
      <div className='mainWrap'>
        <ReactTooltiper /> // inject main React-Tooltip Component only once and use it everywhere inside your app!
        // ... Your Component Here
      </div>
    )
  }
```

  

#### 3. Add Tooltips:

- Add tooltip which you want to use by calling React Tooltiper **tooltipSubscriber** hook:

  

```
  // ... component initialization
  
  componentDidMount() {
    const ID = 'testID'
    const child = 'Some Tooltip Label'
    
    tooltipSubscriber.subscribe({ child, ID }) // invoke the `subscribe` method that will grab your tooltip on the fly! It'll be shown during the first render.
}

  // ... some logic between

  render() {
    return (
      <div id='testID'> // set `ID` for node that your want to overlap by the tooltip.
        Some Text Here...
      </div>
    )
  }
```

  

**or in case of Hooks/SFC inspiration use:**

  

```
  // ... component initialization 

  const SomeComponent = () => {
    const ID = 'testID'
    const child = 'Some Tooltip Label'

    // we're using `useLayoutEffect` effect's hook here because of adding tooltips inside its own store before the screen render. So it guarantees that tooltips will be painted in time!
    useLayoutEffect() {
      tooltipSubscriber.subscribe({ child, ID })
    }
  }

  return (
    // return logic here
  )
```


**Important Note!**

The very obvios reader can spot that we're currently should set the exact `ID`s for both `subscribe` and `node` elements. That is main point of how to give the React-Tooltiper understending about how, when and where the tooltip should be shown.


#### That's all! Take it all above and you're good to go! :)

### Example:

 // TODO: Add some example Here

![React-Tooltiper Example](https://raw.githubusercontent.com/BiosBoy/React-Tooltiper/master/Example.gif)

Here I need something to describe :) 

### API

**Accessible `<Tooltip />` props (sets only once per initialization):**
- `addArrow: boolean` - gives an opportunity to manage the arrow (show/hide) while Tooltip appear

- `customCoods: { x, y }` - probably I'd not need to use that. Set fixed position for all tooltips.

- `manualCoordsFix: { fixX: number|string, fixY: number|string }` - can be used to extra manual positioning based on calculated own tooltip coords. Useful when you need to make some tiny shift of the tooltips apper position.

 - `closeButton: { active: boolean, buttonChildren: any, actionOnClose: Function }`  - the close button for Tooltip hidding. Helps to deal with cases when you need to hide tooltip manually by onClick event.

 - `animProps: { className: string', timeExit: number, timeIn: number }` - tuning animation configuration, makes you own one appear/hidding transitions. Builded on top of the `react-transition-group v.2.6` package.

 - `overrideStyles: { button: string, wrap: string, container: string, arrowWrap: string, tooltipArrow: string, title: string }` - customizing all core **React-Tooltiper**  DOM elements by custom styles providing.

 - `actionOnEntered: Function` - callback, fires on onEntered phase of CSSTransitionGroup.

 - `actionOnExit: Function` - callback, fires on the onExited Animation phase of CSSTransitionGroup.


**The Core props of the `tooltipSubscriber` React-Tooltiper store hook:**

-  `subscribe: { child: any, ID: string }` - the main method allow us to add throwed tooltip data inside React-Tooltiper store.
- `update: { child: any, ID: string }` - gives an opportunity to update particular tooltip data for present tooltip inside the store, if it's not found there adds it immediantly with the props provided.
- `unsubscribe: { ID: string }` - delete a particular tooltip data from the React-Tooltiper store.
- `getTargets: readOnly!` - returns all stored tooltips data from React-Tooltiper store. Can be used for manipulating apper of array of elements with tooltips to render.
- `destroyAll: readOnly!` - erashing the store by deleting all the tooltips data from it.

----

### *FAQ:*

- Does React-Tooltiper accepts custom data, like prepeared html markup with some nodes inside?
--- Yes, sure! You can always throw inside the React-Tooltip any payload to render that you wants.


# Global ToolTip Component

How to use:
  - Quick Start:

  for quick ToolTip usage you just need to use observable environment in your comeponent and mount the tooltipe on top of the your App components tree:

    ```
      <App>
        <ToolTip />
        <Slider>
          <Button /> // the Tooltip shold be showed here for example
        </Slider>
      </App>
    ```

  so, to show it we should import `tooltipsObservable` helper from `@torn/share/components/TooltipsNew/utils/tooltipsObservable` and then run it i method named `subscribe` nside `componentDidMount()` method with props you're required to do. Like:

    ```
      class Button extends React.Component {
        componentDidMount() {
          tooltipsObservable.subscribe({ child: 'TITL_TO_SHOW', ID: 'NODE_ID_TO_BIND' })
        }
      }
    ```

  That is all! :)

  - Advanced ToolTip Configuration:

  You customize this Component as you wish: starting from animations and finish by styling at you own:

    ```<ToolTip
          addArrow: true, // gives an opportunity to cut the arrow from Tooltip
          position: {  // gives an opportunity to set the Tooltip position via comfortable API
            x: '',
            y: ''
          },
          customCoods: {  // gives an opportunity to set the Tooltip position manually
            x: '',
            y: ''
          },
          manualCoordsFix: { // can be used to extra manual positioning based on calculated own tooltip coords.
            fixX: 0,
            fixY: 0
          }
          closeButton: { // can render the button to close Tooltip explicitly by onClick event.
            active: false,
            buttonChildren: '' // text of the button,
            actionOnClose: () => {} // some action for the close click button
          },
          animProps: { // tuning animation configuration, makes you own one
            className: 'tooltip',
            timeExit: 1000,
            timeIn: 30
          },
          overrideStyles: { // customizing all Tooltip DOM elements by custom styles providing.
            button: '',
            wrap: '',
            container: '',
            arrowWrap: '',
            tooltipArrow: '',
            title: ''
          },
          actionOnEntered: () => {}, // callbak, fires on onEntered phase during Animation mode active
          actionOnExit: () => {} // the same one callback, that fires just only on the onExited Animation phase
      />```

  - PRO-MASTER ToolTip Configuration:
   // TODO: Need to be written. About update, unsubscribe and actions extra method incuded for dynamic data manipulation throwed inside it during live updates.

  So, as you can see - that's very easy to use. The rest part is need just on your own. Have fun! :)

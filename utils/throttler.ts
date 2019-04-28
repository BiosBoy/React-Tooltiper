interface IThrottler {
  event: string
  callback: Function
  delay?: number
  target?: Window
}

const throttler = ({ event = 'resize', callback = () => {}, delay = 50, target = window }: IThrottler) => {
  let timerID = null
  const eventSubscribeTarget = target || window

  const resizeThrottler = () => {
    if (timerID) return

    timerID = setTimeout(() => {
      callback()
      timerID = null
    },                   delay)
  }

  eventSubscribeTarget.addEventListener(event, resizeThrottler, false)
}

export default throttler

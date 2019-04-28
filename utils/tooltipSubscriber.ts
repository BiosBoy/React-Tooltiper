import { ITooltips } from '../types'

class ActionObserver {
  actions?: Function[]

  constructor() {
    this.actions = []
  }

  unitAlreadyAdded = unit => this.actions.some(func => func.name === unit.name)

  addAction = (unit: Function) => {
    if (this.unitAlreadyAdded(unit)) return

    this.actions.push(unit)
  }

  removeAction = (f: Function) => {
    this.actions = this.actions.filter(unit => unit !== f)
  }

  notifyActions = (payload: ITooltips[]) => {
    this.actions.forEach(unit => unit(payload))
  }
}

class TooltipObserver extends ActionObserver {
  targets?: ITooltips[]

  constructor() {
    super()

    this.targets = []
  }

  getTargets = () => this.targets

  subscribe = (target: ITooltips) => {
    const targetAlreadyIn = this.targets.some(item => item.ID === target.ID)

    if (targetAlreadyIn) return

    this.targets.push(target)
    this.notifyActions(this.targets)
  }

  update = (target: ITooltips) => {
    this.targets.forEach((item, index) => {
      const targetMatch = item.ID === target.ID
      const childsNotEqual = item.child !== target.child

      if (targetMatch && childsNotEqual) {
        this.targets[index] = {
          ...item,
          child: target.child
        }

        this.notifyActions(this.targets)
      }
    })
  }

  unsubscribe = (target: ITooltips) => {
    this.targets = this.targets.filter(item => item.ID !== target.ID)
    this.notifyActions(this.targets)
  }

  destroyAll = () => {
    this.targets.splice(0, this.targets.length)
    this.actions.splice(0, this.actions.length)
  }
}

const tooltipSubscriber = new TooltipObserver()

export default tooltipSubscriber

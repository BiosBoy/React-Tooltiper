const getCoordsShift = (coordX, coordY, restProps) => {
  const positions = {
    x: {
      left: ({ parentLeft, tooltipWidth }) => parentLeft - tooltipWidth,
      center: ({ parentLeft, parentWidth }) => parentLeft + parentWidth / 2,
      right: ({ parentRight }) => parentRight
    },
    y: {
      top: ({ parentTop, tooltipHeight }) => parentTop - tooltipHeight + pageYOffset,
      center: ({ parentTop, parentHeight, tooltipHeight }) =>
        parentTop + (parentHeight - tooltipHeight) / 2 + pageYOffset,
      bottom: ({ parentBottom }) => parentBottom + pageYOffset
    }
  }

  const left = positions.x[coordX](restProps.x)
  const top = positions.y[coordY](restProps.y)

  return {
    top,
    left
  }
}

export default getCoordsShift

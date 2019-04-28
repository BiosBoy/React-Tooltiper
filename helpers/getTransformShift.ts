const getTransformShift = (coordX, coordY) => {
  const positions = {
    x: {
      left: '0%',
      center: '-50%',
      right: '0%'
    },
    y: {
      top: '0%',
      center: '0%',
      bottom: '0%'
    }
  }

  const trasformX = positions.x[coordX]
  const trasformY = positions.y[coordY]

  return {
    trasformX,
    trasformY
  }
}

export default getTransformShift

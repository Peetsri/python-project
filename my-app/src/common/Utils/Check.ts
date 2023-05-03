const checkThisDay = (date: Date) => {
  const thisDate = new Date()
  return (
    thisDate.getFullYear() === date.getFullYear() &&
    thisDate.getMonth() === date.getMonth() &&
    thisDate.getDay() === date.getDay()
  )
}

const checkDigit = (digit: string, point: number) => {
  if (digit.length > point) {
    return false
  } else {
    return true
  }
}

const checkInteger = (integer: string, condition: number) => {
  if (Number(integer) > condition) {
    return false
  } else {
    return true
  }
}

export {
  checkThisDay,
  checkDigit,
  checkInteger
}

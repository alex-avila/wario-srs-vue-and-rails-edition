import { calcEF, calcInterval } from './supermemo2'

const getNewDate = (availableDate, interval) => {
  let date = availableDate ? new Date(availableDate) : new Date()

  if (date < new Date()) {
    date = new Date()
  }
  date.setUTCDate(date.getUTCDate() + interval)

  return date
}

export const getDateAndSrsStage = (quality, srsStage, oldDate, interval) => {
  // Set new review date
  let newDate
  let newSrsStage
  // Card is only given new date if quality is 4 or 5
  if (quality > 3) {
    newDate = getNewDate(oldDate, interval)
    newSrsStage = srsStage + 1
  } else if (quality === 3) {
    newSrsStage = srsStage
  } else if (quality < 3) {
    newSrsStage = 1
  }
  return [newDate || oldDate, newSrsStage]
}

export const getIntervalAndEF = (quality, eFactor, srsStage) => {
  return [calcEF(quality, eFactor), calcInterval(srsStage, eFactor)]
}

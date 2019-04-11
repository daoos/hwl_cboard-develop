export default {
  /**
   * 根据时间戳获取时间每一项
   * @param date
   * @returns {{year: number, month: string, day: string, hours: string, minutes: string}}
   */
  timestampToDate (date) {
    if (date) {
      const newDate = new Date(date)
      const year = newDate.getFullYear()
      let month = newDate.getMonth() + 1
      month = month.toString().padStart(2, 0)
      const day = newDate.getDate().toString().padStart(2, '0')
      const hours = newDate.getHours().toString().padStart(2, '0')
      const minutes = newDate.getMinutes().toString().padStart(2, '0')
      const seconds = newDate.getSeconds().toString().padStart(2, '0')
      return {
        year,
        month,
        day,
        hours,
        minutes,
        seconds
      }
    }
  },
  /**
   * 将日期格式化为时间戳
   * @param date
   * @returns {*}
   */
  formatDateTimeStamp (date) {
    if (date && Object.prototype.toString.call(date).includes('Date')) {
      return date.getTime()
    }
    return date
  },
  /**
   * 时间戳 -> hours:minutes
   * @param time
   * @returns {string}
   */
  formatTime (time) {
    if (time) {
      const newTime = this.timestampToDate(time)
      return newTime.hours + ':' + newTime.minutes + ':' + newTime.seconds
    }
  },
  /**
   * 日期 -> year-month-day
   * @param time
   * @returns {string}
   */
  formatDate (time) {
    if (time) {
      const newDate = this.timestampToDate(time)
      return newDate.year + '-' + newDate.month + '-' + newDate.day
    }
  }
}

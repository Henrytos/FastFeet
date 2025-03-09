export class GetPreviousDateByTime {
  private currentDate: Date
  constructor() {
    this.currentDate = new Date()
  }

  get date(): Date {
    return this.currentDate
  }

  differenceInHours(timeInHours: number): Date {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
      this.currentDate.getHours() - timeInHours,
    )
  }

  differenceInDays(days: number): Date {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDate() - days,
    )
  }

  differenceInWeeks(weeks: number): Date {
    return this.differenceInDays(weeks * 7)
  }

  differenceInMonths(months: number): Date {
    return new Date(
      this.currentDate.getFullYear() - Math.floor(months / 12),
      (this.currentDate.getMonth() + months) % 12,
      this.currentDate.getDate(),
    )
  }

  differenceInYears(years: number): Date {
    return new Date(
      this.currentDate.getFullYear() - years,
      this.currentDate.getMonth(),
      this.currentDate.getDate(),
    )
  }
}

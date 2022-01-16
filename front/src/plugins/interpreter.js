export default {
  install: (Vue) => {
    Vue.prototype.$interpreter = {
      interpretOrderStatus (status) {
        switch (status) {
          case 'Untreated':
            return 'На рассмотрении'
          case 'Planned':
            return 'Запланирован'
          case 'Denied':
            return 'Отказан'
          case 'Done':
            return 'Выполнен'
          default:
            return status
        }
      },
      interpretProductCategory (title) {
        switch (title) {
          case 'hair':
            return 'Парикмахерский зал'
          case 'cure':
            return 'Маникюр, педикюр'
          case 'massage':
            return 'Массаж'
          case 'cosmetology':
            return 'Косметология'
          default:
            return title
        }
      },
      interpretUserRole (role) {
        switch (role) {
          case 'admin':
            return 'Администратор'
          case 'moder':
            return 'Модератор'
          default:
            return role
        }
      },
      interpretDuration (duration) {
        const hours = Math.trunc(duration / 60)
        const minutes = duration % 60
        return (hours >= 1 ? ' ' + hours + ' ч.' : '') + (minutes > 0 ? ' ' + minutes + ' мин.' : '')
      },
      interpretDate (dateString) {
        const date = new Date(dateString)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
      }
    }
  }
}

export default {
  install: (Vue) => {
    Vue.prototype.$interpreter = {
      interpretOrderStatus (status) {
        switch (status) {
          case 'Untreated':
            return 'На рассмотрении'
          case 'Planned':
            return 'Запланировано'
          case 'Denied':
            return 'Отказано'
          case 'Done':
            return 'Выполнено'
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
      }
    }
  }
}

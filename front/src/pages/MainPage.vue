<template>
  <section class="main">
    <div class="main__image-container">
      <img class="main__image" src="../assets/png/home.webp"/>
      <div class="main__social-icons social-icons">
        <a href="https://ru.wikipedia.org/wiki/Заглавная_страница" target="_blank" class="social-icons__icon social-icons__vk"><div/></a>
        <a href="https://ru.wikipedia.org/wiki/Заглавная_страница" target="_blank" class="social-icons__icon social-icons__fb"><div/></a>
        <a href="https://ru.wikipedia.org/wiki/Заглавная_страница" target="_blank" class="social-icons__icon social-icons__inst"><div/></a>
        <a href="https://ru.wikipedia.org/wiki/Заглавная_страница" target="_blank" class="social-icons__icon social-icons__wapp"><div/></a>
      </div>
    </div>
    <div class="main__containers">
      <article class="main__container">
        <h2 class="main__subtitle">Контакты</h2>
        <div class="main__container-content">
          <p class="main__container-line main__container-line_selected">Телефон:</p>
          <p class="main__container-line">8-800-555-35-35</p>
          <p class="main__container-line">8-800-777-77-77</p>
          <p class="main__container-line main__container-line_selected">Адрес:</p>
          <p class="main__container-line">Базовская ул., 15, к. 1, Москва, 125635</p>
        </div>
      </article>
      <article class="main__container">
        <h2 class="main__subtitle">Время приёма</h2>
        <div class="main__container-content">
          <p class="main__container-line">Пон.: 9:00 - 20:00</p>
          <p class="main__container-line">Втор.: 10:00 - 18:00</p>
          <p class="main__container-line">Сред.: 9:00 - 20:00</p>
          <p class="main__container-line">Чет.: 9:30 - 19:00</p>
          <p class="main__container-line">Пят.: 9:00 - 20:00</p>
          <p class="main__container-line">Суб.: 10:00 - 18:00</p>
          <p class="main__container-line">Вос.: 10:00 - 16:00</p>
        </div>
      </article>
      <article class="main__container">
        <h2 class="main__subtitle">Каталог</h2>
        <div class="main__container-content">
          <p class="main__container-line">В нашем каталоге вы можете выбрать услуги для записи на приём.</p>
          <p class="main__container-line">В нём содержится обширный список, который может быть отфильтрован.</p>
          <button class="main__container-button" @click="$router.push({ name: 'catalog' })">Перейти</button>
        </div>
      </article>
      <article class="main__container">
        <h2 class="main__subtitle">Специалисты</h2>
        <div class="main__container-content">
          <p class="main__container-line">Все наши специалисты обладают высокой квалификацией и стажем работы.</p>
          <p class="main__container-line">Все наши сотрудники привиты для обеспечения безопасности вашего здоровья.</p>
        </div>
      </article>
      <article class="main__container">
        <h2 class="main__subtitle">Партнёры</h2>
        <div class="main__container-content">
          <p class="main__container-line">Мы сотрудничаем со множеством косметологических компаний, что позволяет нам иметь в распоряжении самые эффективные средства для ухода за вашим здоровьем и красатой.</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

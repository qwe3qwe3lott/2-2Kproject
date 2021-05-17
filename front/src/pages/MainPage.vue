<template>
  <section>
    {{ f }}
  </section>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
    f: ''
    }
  },
  mounted() {
    this.f = localStorage.getItem('token')
  }
}
</script>
<template>
  <div>
    <button @click="$router.push({ name: 'main' })">main</button>
    <button @click="$router.push({ name: 'admin' })">admin</button>
    <button @click="$router.push({ name: 'moder' })">moder</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout"
}
</script>

<style scoped>

</style>
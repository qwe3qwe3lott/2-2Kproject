<template>
  <body id="app">
    <modal-window />
    <router-view/>
  </body>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
export default {
  name: 'App',
  components: {ModalWindow}
}
</script>
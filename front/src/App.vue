<template>
  <div id="app">
    <modal-window/>
    <router-view/>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow";
export default {
  name: 'App',
  components: {ModalWindow}
}
</script>
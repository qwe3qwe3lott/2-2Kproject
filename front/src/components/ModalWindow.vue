<template>
  <div class="modal">
    <div class="modal__window" role="dialog">
      <h2 class="modal__window-title">
        {{ title }}
      </h2>
      <button type="button" class="modal__window-close" @click="$emit('close')" />
      <div class="modal__window-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalWindow',
  props: {
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>

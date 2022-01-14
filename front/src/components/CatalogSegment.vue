<template>
  <article class="catalog__segment" v-if="this.cards.length !== 0">
    <h2 class="catalog__segment-title">{{$interpreter.interpretProductCategory(title)}}</h2>
    <ProductCard v-for="(card, index) in cards" :key="index" :props="card" :edit="edit" @chooseDescription="$emit('chooseDescription', $event)" @edit="$emit('edit', $event)"/>
  </article>
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
  name: 'CatalogSegment',
  components: { ProductCard },
  props: ['cards', 'title', 'edit']
}
</script>

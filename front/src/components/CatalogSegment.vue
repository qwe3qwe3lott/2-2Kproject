<template>
  <article class="catalog__segment">
    <h2 class="catalog__segment-title">{{interpretTitle(title)}}</h2>
    <ProductCard v-for="(card, index) in cards" :key="index" :props="card" :edit="edit"/>
  </article>
</template>

<script>
import ProductCard from "@/components/ProductCard";
export default {
  name: "CatalogSegment",
  components: {ProductCard},
  props: ['cards', 'title', 'edit'],
  methods: {
    interpretTitle(title) {
      switch (title) {
        case 'hair':
          return 'Парикмахерский зал'
        case 'cure':
          return 'Маникюр, педикюр'
        case 'massage':
          return 'Массаж'
        case 'cosmetology':
          return 'Косметология'
      }
      return title
    }
  }
}
</script>
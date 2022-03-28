<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :projectlists="documents" />
      <!-- <div v-for="doc in documents" :key="doc.id">{{ doc.title}}</div> -->
    </div>
  </div>
</template>

<script>
import ListView from '../components/ListView.vue'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { ListView },
  setup() {
    
    const { error, documents } = getCollection('projectlists')
    console.log(documents)
    return { error, documents }

  }
}
</script>

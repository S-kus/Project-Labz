<template>
  <div class="user-playlists">
    <h2>My Projectlists</h2>
    <div v-if="projectlists">
      <ListView :projectlists="projectlists" />
    </div>
    <router-link :to="{ name: 'CreateProjectlist' }" class="btn">Create a New Projectlist</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: projectlists } = getCollection(
      'projectlists', 
      ['userId', '==', user.value.uid]
    )

    return { projectlists }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>
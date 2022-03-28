<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Projects</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Project</h4>
      <input type="text" placeholder="Project title" required v-model="title">
      <input type="text" placeholder="Project codebase Link" required v-model="codelink">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'

export default {
    props: ['projectlist'],
    setup(props) {
    const title = ref('')
    const codelink = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('projectlists', props.projectlist.id)

    const handleSubmit = async () => {
      const newProject = {
        title: title.value,
        codelink: codelink.value,
        id: Math.floor(Math.random() * 1000000)
      }
      const res = await updateDoc({
        projects: [...props.projectlist.projects, newProject]
      })
      title.value = ''
      codelink.value = ''
    }

    return { title, codelink, showForm, handleSubmit }
  }
}
</script>

<style scoped>
  .add-song {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>
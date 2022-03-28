<template>
  <div>
      <div class="error" v-if="error">{{ error }}</div>
      <div v-if="projectlist " class="playlist-details">
            <div class="playlist-info">
              <div class="cover">
                  <img :src="projectlist.coverUrl">
              </div>
              <h2>{{ projectlist.title }}</h2>
              <p class="username">Created by {{ projectlist.userName }}</p>
              <p class="description">{{ projectlist.description }}</p>
              <button v-if="ownership" @click="handleDelete">Delete Projectlist</button>
            </div>
      </div>
      <!-- 
            <div class="song-list">
            <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
            <div v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                <h3>{{ song.title }}</h3>
                <p>{{ song.artist }}</p>
                </div>
                <button v-if="ownership" @click="handleClick(song.id)">delete</button>
            </div>
            <AddSong :playlist="playlist" />
            </div>
            
        </div> -->
  </div>
</template>

<script>
// import AddSong from '@/components/AddSong.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
//   components: { AddSong },
  setup(props) {
    const { error, document: projectlist} = getDocument('projectlists', props.id)
    const { user } = getUser()
    const { deleteDoc} = useDocument('projectlists', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return projectlist.value 
        && user.value 
        && user.value.uid == projectlist.value.userId
    })

    const handleDelete = async () => {
      await deleteDoc()
      await deleteImage(projectlist.value.filePath)
      router.push({ name: 'Home' })
    }

    // const handleClick = async (id) => {
    //   const songs = playlist.value.songs.filter((song) => song.id != id)
    //   await updateDoc({ songs })
    // }

    return { error, projectlist, ownership, handleDelete}
  }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>
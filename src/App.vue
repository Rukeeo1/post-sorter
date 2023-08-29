<template>
  <div><div class="rectangle"></div></div>

  <div class="app">
    <div class="app__posts">
      <h1 class="app__posts__title">Sortable Post List</h1>
      <PostList
        @on-post-travel="addAction"
        :posts="posts"
        @move-post-up="movePostUp"
        @move-post-down="movePostDown"
        :loading="loading"
      />
    </div>
    <div class="app__actions">
      <ActionList :actions="actions" @on-time-travel-click="handleTimeTravel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostList from '@/components/PostList.vue'
import ActionList from '@/components/ActionList.vue'
import { ActionInterface } from '@/interfaces/Actions'
import Skeleton from '@/components/Skeleton.vue'
import { PostInterface } from '@/interfaces/Post'
import { getPosts } from '@/services/PostService'

// data
const posts = ref<PostInterface[]>([])

const actions = ref<ActionInterface[]>([])

const loading = ref<boolean>(false)

// methods
const addAction = (postId: number, movedFrom: number, movedTo: number) => {
  const newAction = {
    id: actions.value.length + 1,
    postId,
    movedFrom,
    movedTo
  }

  actions.value = [newAction, ...actions.value]
}

const movePostUp = (currentPostIndex: number) => {
  if (currentPostIndex > 0) {
    const newPostIndex = currentPostIndex - 1
    const tempPost = posts.value[currentPostIndex]

    console.log(tempPost,'***')
    posts.value[currentPostIndex] = posts.value[newPostIndex]
    posts.value[newPostIndex] = tempPost



    addAction(tempPost.id, currentPostIndex, newPostIndex)
  }
}

const movePostDown = (currentPostIndex: number) => {
  if (currentPostIndex < posts.value.length - 1) {
    const newPostIndex = currentPostIndex + 1


    const tempPost = posts.value[currentPostIndex]

    posts.value[currentPostIndex] = posts.value[newPostIndex]
    posts.value[newPostIndex] = tempPost

    addAction(tempPost.id, currentPostIndex, newPostIndex)
  }
}

const handleTimeTravel = (actionId: number) => {
  const actionIndex = actions.value.findIndex((item) => item.id === actionId)

  if (actionIndex !== -1) {
    const actionsToRevert = actions.value.slice(0, actionIndex + 1)
    const actionsLeft = actions.value.slice(actionIndex + 1)

    actions.value = actionsLeft

    actionsToRevert.forEach((action) => {
      const postToMove = posts.value.find((post) => post.id === action.postId)
      if (postToMove) {
        const originalIndex = action.movedFrom
        const newIndex = action.movedTo
        // Swap the posts back
        const tempPost = posts.value[originalIndex]
        posts.value[originalIndex] = posts.value[newIndex]
        posts.value[newIndex] = tempPost
      }
    })
  }
}

// lifecycle hooks
onMounted(async () => {
  loading.value = true
  try {
    const res = await getPosts('/posts')
    posts.value = res.slice(0, 5)
  } catch (error) {
    // console.error(error)
    //TODO: handle error with a toast or alert component___
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.app {
  padding: 0 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &__posts {
    margin: 50px 53px 0 0;
    &__title {
      color: $white;
      font-weight: 600;
      margin: 0 0 29px 0;
    }
  }

  &__actions {
    margin: 50px 0 0 53px;
  }
}

.rectangle {
  width: 100%;
  height: 256px;
  background: linear-gradient(to top left, transparent 50%, $purple 50%);
  position: absolute;
  z-index: -1;

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 256px 100% 0 0;
    border-width: 0 0 100% 256px;
    border-color: $purple transparent transparent transparent;
    top: 0;
    left: 0;
  }
}
</style>

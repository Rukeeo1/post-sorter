<template>
  <transition-group name="slide" tag="div" move-class="slide-move">
    <Skeletor v-for="i in 5" height="100" v-if="loading" />
    <Post
      v-else
      v-for="(post, index) in posts"
      :key="post.id"
      :post="post"
      :isFirst="index === 0"
      :isLast="index === posts.length - 1"
      :postIndex="index"
      @movePostUp="movePostUp(index)"
      @movePostDown="movePostDown(index)"
    />
  </transition-group>
</template>
<script setup lang="ts">
import Post from '@/components/Post.vue'

import { Skeletor } from 'vue-skeletor'

import { PostInterface } from '@/interfaces/Post'

// enums
enum PostListEnums {
  movePostUp = 'movePostUp',
  movePostDown = 'movePostDown'
}

// props
interface PostListPropsInterface {
  posts: PostInterface[]
  loading: boolean
}

defineProps<PostListPropsInterface>()

// emits
interface PostListEmits {
  (e: PostListEnums.movePostUp, index: number): void
  (e: PostListEnums.movePostDown, index: number): void
}

const emits = defineEmits<PostListEmits>()

// methods
const movePostUp = (currentPostIndex: number) => {
  emits(PostListEnums.movePostUp, currentPostIndex)
}

const movePostDown = (currentPostIndex: number) => {
  emits(PostListEnums.movePostDown, currentPostIndex)
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.slide-move {
  transition: transform 0.5s ease;
}
</style>

<template>
  <div class="post">
    <div>
      <h1>{{ `Post ${post.id}` }}</h1>
    </div>
    <div class="post__chevron">
      <div v-for="icon in caretIcons" :key="icon">
        <component :is="icon" @click="handleChevronClick(icon)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed } from 'vue'
import {PostInterface} from '@/interfaces/Post'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import IconChevronUp from '@/components/icons/IconChevronUp.vue'

// review typings
const props = defineProps({
  post: { type: Object as PropType<PostInterface>, required: true },
  isFirst: Boolean as PropType<boolean>,
  isLast: Boolean as PropType<boolean>,
  postIndex: { type: Number as PropType<number>, required: true }
})

enum postEventNames {
  movePostUp = 'movePostUp',
  movePostDown = 'movePostDown'
}

interface Emits {
  (e: postEventNames.movePostDown): void
  (e: postEventNames.movePostUp): void
}

const emits = defineEmits<Emits>()

const caretIcons = computed(() => {
  if (props.isFirst) {
    return [IconChevronDown]
  } else if (props.isLast) {
    return [IconChevronUp]
  } else {
    return [IconChevronUp, IconChevronDown]
  }
})

const handleChevronClick = (icon: any) => {
  if (icon === IconChevronUp) {
    emits(postEventNames.movePostUp)
  } else if (icon === IconChevronDown) {
    emits(postEventNames.movePostDown)
  }
}

</script>
<style lang="scss" scoped>
.post {
  display: flex;
  justify-content: space-between;
  background: $white;
  padding: 16px 24px;
  border-radius: 4px;
  box-shadow: 0px 3px 4px 2px rgba(0, 0, 0, 0.06);
  margin: 0 0 29px 0;
  transition: box-shadow 0.3s ease-in-out;
  height: 106px;

  h1 {
    font-size: 1.3rem;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
  }

  &__chevron {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }
}
</style>

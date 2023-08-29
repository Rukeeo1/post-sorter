<template lang="">
  <div class="action">
    <div class="action__title">
      <p>
        {{
          `Moved Post ${action.postId} from index ${action.movedFrom} to index ${action.movedTo}`
        }}
      </p>
    </div>
    <div><BaseButton variant="primary" @click="goBackInTime">Time travel</BaseButton></div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { ActionInterface } from '@/interfaces/Actions'

// props
const props = defineProps({
  action: {
    type: Object as PropType<ActionInterface>,
    required: true
  }
})

// enums
enum ActionEnum {
  onTimeTravelClick = 'onTimeTravelClick'
}

// emits
interface ActionEmitsInterface {
  (e: ActionEnum.onTimeTravelClick): void
}

const emits = defineEmits<ActionEmitsInterface>()

// methods:
const goBackInTime = () => {
  emits(ActionEnum.onTimeTravelClick)
}
</script>
<style lang="scss" scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  height: 82px;
  padding: 0 10px;
  border-bottom: 1px solid $white100;
  &:last-child {
    border-bottom: none;
  }


  &__title {
    p {
      font-weight: 600;
      font-size: 1.1875rem;
      color: $gray;
      padding: 0 1rem 0 0;
      display: flex;
      align-items: center;
    }
  }
}
</style>

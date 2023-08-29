<template lang="">
  <div class="action-list">
    <div class="action-list__title">
      <h1>List of actions committed</h1>
    </div>
    <div class="action-list__container">
      <div class="action-list__empty-state" v-if="actions.length < 1">
        <p>
          Ready to shape your list? 🌟 Start sorting posts by moving them up or down. Your actions
          will shine here!
        </p>
      </div>
      <div v-else class="action-list__actions">
        <Action
          v-for="(action, index) in actions"
          :key="action.id"
          :action="action"
          @onTimeTravelClick="onTimeTravelClick(action.id)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Action from '@/components/Action.vue'
import { ActionInterface } from '@/interfaces/Actions'

// enums
enum ActionListEnum {
  onTimeTravelClick = 'onTimeTravelClick'
}

// props
interface ActionListPropsInterface {
  actions: ActionInterface[]
}

defineProps<ActionListPropsInterface>()

// emits
interface ActionListEmitsInterface {
  (e: ActionListEnum.onTimeTravelClick, actionId: number): void
}

const emits = defineEmits<ActionListEmitsInterface>()

// methods
const onTimeTravelClick = (actionId: number) => {
  emits(ActionListEnum.onTimeTravelClick, actionId)
}
</script>
<style lang="scss" scoped>
@mixin bg-white-shadow {
  background: $white;
  box-shadow: 0px 3px 14px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.action-list {
  box-shadow: 0px 3px 14px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  &__title {
    display: flex;
    align-items: center;
    border-radius: 5px 5px 0px 0px;
    background: $white;
    height: 90px;
    padding: 0 27px;

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  &__container {
    padding: 29px 24px;
  }

  &__empty-state,
  &__actions {
    @include bg-white-shadow();
  }

  &__empty-state {
    padding: 1.5rem;
  }

}
</style>

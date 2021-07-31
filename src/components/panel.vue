<template>
  <view class="panel">
    <view
      v-if="title"
      class="panel__title"
    >{{ title }}</view>

    <slot name="controller" />

    <view
      :class="contentClasses"
      :style="$attrs.style"
    >
      <slot />
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
export default defineComponent({
  name: "panel",
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    noPadding: Boolean
  },
  setup(props, {  }) {
    const contentClasses = computed(() => ({
      'panel__content': true,
      'no-padding': props.noPadding
    }))
    return {
      ...toRefs(props),
      contentClasses,
    }
  }
})
</script>

<style lang="scss">
.panel {
  margin: 32px 0 56px;

  &__title {
    position: relative;
    margin-bottom: 50px;
    padding-left: 50px;
    color: #6a6a77;
    font-size: 32px;
    font-weight: bold;
    line-height: 1.5;

    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 24px;
      top: 50%;
      margin-top: -20px;
      width: 2PX;
      height: 40px;
      background-color: #6190e8;
      box-shadow: 0 7px 12px 0 rgba(97, 144, 232, 0.2);
      border-radius: 1PX;
    }
  }

  &__content {
    padding: 0 20px;

    &.no-padding {
      padding: 0;
    }
  }
}
</style>

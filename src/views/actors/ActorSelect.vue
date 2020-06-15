<template>
  <div class="my-3">
    <div class="actor-select row justify-content-around">
      <p>게시글을 작성할 배우를 골라주세요!</p>
      <div class="col-12">
        <ActorList :selectList="''"/>
      </div>
      <UserSearch class="col-4" />
    </div>
  </div>
</template>

<script>
import ActorList from '@/components/ActorList'

export default {
  name: 'ActorSelect',
  components: {
    ActorList,
  }

}
</script>

<style>

</style>
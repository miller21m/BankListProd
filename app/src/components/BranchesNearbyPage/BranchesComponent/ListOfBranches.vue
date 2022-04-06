<template>
  <div class="m_listOfBranches">
    <div v-for="branch in listOfBranches" :key="branch._id">
        <appBranch :singleBranch="branch"/>
    </div>
    
  </div>
</template>


<script>
import Branch from './Branch.vue';
export default {
  props:['listOfBranches'],
  components:{
    appBranch: Branch
  }
}
</script>


<style scoped>
.m_listOfBranches{
  width: 80%;
  margin: 20px auto;
  direction: rtl;
  height: 1000px;
  overflow-y: auto;
}


@media only screen and (min-width: 960px) {
  .m_listOfBranches{
    width: 50%;
    
  }
}
</style>

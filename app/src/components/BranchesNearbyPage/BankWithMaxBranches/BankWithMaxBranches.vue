<template>
  <div>
    <div v-if="bankName" class="m_bankWithMaxBranches" v-on:click="getNearBranches">
      {{bankName}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bankName: null
    }
  },
  methods: {
    getNearBranches:function(){
      //Once the user click on the button redirect to the page of all the near branch of specific bank
      this.$router.push(`/BranchesNearby/${this.$route.params.latitude}/${this.$route.params.longitude}/${this.bankName}/NearBranches`);
    }
  },
  watch:{
    '$store.state.bankWithMaxBranchesNearBy'(value){
      this.bankName = value;
    }
  }
  
}
</script>




<style scoped>
.m_bankWithMaxBranches{
  width: 60%;
  margin: 20px auto;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 20px;
  background: #6BCB77;
  color: white;
}

.m_bankWithMaxBranches:hover{
  cursor: pointer;
  color: gray;
  box-shadow: 1px 2px #88888848;
}

@media only screen and (min-width: 960px) {
  .m_bankWithMaxBranches{
    width: 30%;
    
  }
}
</style>
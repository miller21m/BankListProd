
<template>
<!-- This component represntes the page of all the braches sorted by there distance -->
  <div>

    <!-- Button for the bank with the max branches in 7 km radius -->
    <appBankWithMaxBranches/>

    <!-- List of all the braches sorted -->
    <appListOfBranches :listOfBranches = "branches"></appListOfBranches>
    <router-view></router-view>
  </div>
</template>


<script>
import ListOfBranches from "./BranchesComponent/ListOfBranches.vue";
import BankWithMaxBranches from "./BankWithMaxBranches/BankWithMaxBranches.vue";
export default {
  components:{
    appListOfBranches: ListOfBranches,
    appBankWithMaxBranches: BankWithMaxBranches
  },
  data() {
    return {
      branches: null
    }
  },
  methods: {
    //dispatch action from the store  'getNearBranches' to get all the braches.
    getNearBranches: function(){
      this.$store.dispatch('getNearBranches',this.$route.params);
    }
  },
  beforeMount() {
    this.getNearBranches();
  },
  watch:{
    '$store.state.nearBranches'(value){
      this.branches = value.branches;
    }
  }
  
}
</script>


<style scoped>
</style>
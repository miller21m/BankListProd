<template>
  <div class="m_nearBranchesContainer">
      <div class="m_containerWraper">
        <div class="m_backBtn" @click="returnToPrevPage">
          חזור            
        </div>
        <div class="m_listContainer">
          <div v-for="branch in branchesList" :key="branch._id">
                <appBranch :singleBranch="branch"/>
          </div>
        </div>

    </div>
  </div>
</template>


<script>
import Branch from '../BranchesComponent/Branch.vue';
export default {
  components:{
    appBranch:Branch
  },
  data() {
    return {
      branchesList: null
    }
  },
  beforeMount() {
    this.getBankNearBranches()
  },
  methods: {
    getBankNearBranches:function(){
      this.$store.dispatch('getBankNearBranches')
    },
    returnToPrevPage:function(){
      this.$router.go(-1);
    }
  },
  watch:{
    '$store.state.listOfNearBranches'(value){
      this.branchesList = value;
    }
  }
}
</script>

<style scoped>
.m_nearBranchesContainer{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.445);
  z-index: 9;
  direction: rtl;
}

.m_containerWraper{
  background: rgba(255, 255, 255, 0.85);
  height: 80%;
  width: 80%;
  box-shadow: 0px 0px 10px 0px #fff;
  margin: 20px auto;
  padding: 20px 0px;
}
.m_listContainer{
  height: 80%;
  overflow-y: auto;
  margin: 0 auto;
  display: block;
}

.m_closeBtn{
margin-right: 20x;
}

.m_backBtn{
  background: #0097f0;
  border-radius: 25px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 10px;
  padding: 3px 6px;
  color: white;
  font-weight: bold;
}

.m_backBtn:hover{
  cursor: pointer;
}


@media only screen and (min-width: 960px) {
  .m_listContainer{
    width: 50%;
  }
}
</style>
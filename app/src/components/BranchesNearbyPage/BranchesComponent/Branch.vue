<template>
  <div>

    <div class="m_brachContainer">
      <div class="m_branchName">{{singleBranch.Bank_Name}}</div>
      <div class="m_bankCode">{{ '(' + singleBranch.Bank_Code + ') '}}</div>
      <div class="m_branchBodyData">
        <div>{{singleBranch.Branch_Name + ' (' + singleBranch.Branch_Code + ')'}}</div>
        <div>{{singleBranch.Branch_Address}}</div>
        <div>{{singleBranch.distance}} ק״מ</div>
        <div  v-if="!singleBranch.is_closed" class="m_isOpen">פתוח</div> 
        <div  v-if="singleBranch.is_closed" class="m_isClosed">סגור</div>
        <div :class="{isInFav: inFavList }" class="m_favorites" @click="addToFav">+</div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  props:['singleBranch'],
  data() {
    return {
      inFavList: false
    }
  },
  methods: {
    addToFav:function(){
      var id =  this.singleBranch._id;
      this.$store.dispatch('addBankToFav', id);
      
    },
  checkIfBankInFavList(favList){

        if(!favList){
          this.inFavList = false;
        }
        else if(favList.includes(this.singleBranch._id)){
          this.inFavList = true;
        }else{
          this.inFavList=false;
        }
  }
  },
  watch:{
    '$store.state.myFavBank'(value){
      this.checkIfBankInFavList(value);
    }
  },
  mounted() {
    //Check if the bank alredy part of my list and update ui
    var myFavList = this.$store.getters.getFavBankList;
    this.checkIfBankInFavList(myFavList)
  },
  
}
</script>


<style scoped>
.m_brachContainer{
  width:80%;
  border: 1px solid rgba(0, 0, 0, 0.139);
  margin: 7px auto;
  padding: 7px 10px;
  border-radius: 5px;
  box-shadow: 1px 2px #8888880d;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background: white;
}

.m_branchName{
  display: inline-block;
  color: #0097f0;
  font-size: 18px;
  font-weight: bold;
  margin-left: 5px;

}

.m_bankCode{
  display: inline-block;
  color: #9e9e9e;
}

.m_branchBodyData{
  font-size: 16px;
  color: #5c5c5c;
  margin-top:5px;
}

.m_isOpen{
  display: inline-block;
  padding: 2px 5px;
  margin-top: 5px;
  border-radius: 50px;
  background-color: #6BCB77;
  color: white;
  font-weight: bold;
}

.m_isClosed{
  display: inline-block;
  padding: 2px 5px;
  margin-top: 5px;
  border-radius: 50px;
  background-color: red;
  color: white;
  font-weight: bold;
}

.m_favorites{
  display: inline;
  border-radius: 50px;
  padding: 1px 5px;
  float: left;
  font-weight: bold;
  font-size: 22px;
  background: rgba(128, 128, 128, 0.221);
  color: white;
  box-shadow: 1px 1px #88888885;
}

.isInFav{
    display: inline;
  border-radius: 50px;
  padding: 1px 5px;
  float: left;
  font-weight: bold;
  font-size: 22px;
  background: green;
  color: white;
  box-shadow: 1px 1px #88888885;
}

@media only screen and (min-width: 960px) {
  .m_brachContainer{
    width: 60%;
  }
}
</style>
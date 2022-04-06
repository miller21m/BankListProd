<template>
  <div class="m_coords" v-if="this.$store.getters.getCoords">

    <div class="m_title">המיקום הנוכחי שלי</div>

    <div class="m_coordsContainer">
      <div class="m_coordsLabel"><b>קו רוחב</b> {{coords.latitude}}</div>
      <div class="m_coordsLabel"><b>קו אורך</b> {{coords.longitude}}</div>
    </div>

    <!-- Button for the next page with a list of all braches  -->
    <div class="m_nearBranches" v-on:click="findNearBranches">
      הצג סניפי בנק באזור           
    </div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      coords: "Wating for user coords"
    }
  },
  methods: {
    //Calling findNearBranches when the user is pressing on the show branches will take the user to the next page 
    //with list of all the braches
    findNearBranches:function(){
      this.$router.push(`/BranchesNearby/`+ this.coords.latitude + `/`+ this.coords.longitude); 
    }
  },
  watch:{
    //Getting the coords from the store 
    '$store.state.coords'(value){
      this.coords = value;
    }
  }
  
}
</script>


<style scoped>
.m_coords{
  width: 80%;
  position: flex;
  margin: 0 auto;
  display: block;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.m_title{
  display: block;
  text-align: center;
  margin: 30px;
  font-size: 30px;
  color: #548CFF;
  font-weight: bold;
}

.m_coordsContainer{
  display: flex;
  align-items: stretch;
  justify-content: space-around;
}
.m_coordsLabel{
  text-align: center;
  background: #6BCB77;
  /* margin: 0 .5em; */
  padding: 10px 15px;
  min-height: 100%;
  border-radius: 30px;
  font-size: 20px;
  color: aliceblue;
}

.m_nearBranches{
  margin-top: 30px;
  border-radius: 15px;
  background-color: rgba(128, 128, 128, 0.064);
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  padding: 10px;
  box-shadow: 0px -18px 0px #fff;
  border-bottom: 1px solid #e6e9ef;
  box-shadow: 1px 2px #88888848;
}

.m_nearBranches:hover{
  cursor: pointer;
  box-shadow: none;
  color: #548CFF;
}
</style>
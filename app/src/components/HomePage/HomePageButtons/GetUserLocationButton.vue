<template>
  <div class="m_locationBtn" v-on:click="getMyLocation">
    הצג מיקומך    
  </div>
</template>


<script>
export default {
methods: {
  //when the user is cliking on the button show my location, we are dispatch a function for the action 'setUserLocation' 
  //In order to get the current location and to set it as a state in the store
  getMyLocation:function(){
    this.$store.dispatch('setUserLocation');
  }
}
}


</script>


<style scoped>
.m_locationBtn{
  text-align: center;
  position: flex;
  display: block;
  margin: 0 auto;
  border: 1px solid transparent;
  padding: 10px 15px;
  width: 150px;
  font-size: 20px;
  border-radius: 30px;
  align-self: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: #6BCB77;
  color: white;
  font-weight: bold;
}

.m_locationBtn:hover{
  cursor: pointer;
  color: gray;
  box-shadow: 1px 2px #88888848;

}
</style>
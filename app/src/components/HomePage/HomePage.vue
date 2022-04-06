<template>
  <div class="m_homePage">
    <div class="m_locationContainer">
      <!-- show location button in the main page -->
       <appGetLocationBtn/>
    </div>

    <!-- component that will display the user location ones the location is avilable -->
     <appUserCoords/>

    
  </div>
</template>


<script>
import GetUserLocationButtonVue from "./HomePageButtons/GetUserLocationButton";
import UserCoords from './UserCoords.vue';
export default {
  components:{
    appGetLocationBtn: GetUserLocationButtonVue,
    appUserCoords: UserCoords
  }
}
</script>


<style scoped>
.m_homePage{
  height: 600px;
  padding-top: 30px;
}

.m_locationContainer{
  height: 100px;
  margin: 0 auto;
  width: 80%;
  display: flex;
}
</style>


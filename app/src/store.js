import Vue from 'vue';
import Vuex from 'vuex';
// import router from  './router'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    coords:undefined,
    nearBranches: undefined,
    bankWithMaxBranchesNearBy:undefined,
    listOfNearBranches: undefined,
    max_bank_id: undefined,
    myFavBank: []
  },

  mutations:{
    //Set the state of the the coords
    SET_USER_LOCATION(state,data){
      state.coords = data.coords;
    },

    //set the state of the nearBranches (List of all the branches sorted by distance)
    SET_NEAR_BRANCHES(state,data){
      state.nearBranches = data;

      //Cheking if we alredy have favorit list of bank in the local storage.
      state.myFavBank =JSON.parse(window.localStorage.getItem('fav_list'));
    },

    //Set the bank name and id with the max branches in radius of 7km 
    SET_BANK_WITH_MAX_BRANCHES_NEAR(state,data){
      state.bankWithMaxBranchesNearBy = data.bank_name;
      state.max_bank_id = data.bank_id;
    },

    //Set the list of near branches for the bank with max branches
    SET_LIST_OF_NEAR_NBRANCHES_FOR_BANK(state,data){
      state.listOfNearBranches = data;
    },

    //Update and set the state of the list of fav banks
    SET_MY_FAV_BANK(state, bank_id){

      //If the state is empty them set new array
      if(!state.myFavBank){
        state.myFavBank = [];
      }
      //Else if the array is set then we are inserting the new value and saving in the local storage 
      state.myFavBank.push(bank_id);
      window.localStorage.setItem('fav_list', JSON.stringify(state.myFavBank));
    },

    //Remove the bank_id (record in the data id) from the list of fav banks
    REMOVE_BANK_FROM_FAV_LIST(state, bank_id){

      //Find the index where the _id  is stored in the array and remove from the array
      const index = state.myFavBank.indexOf(bank_id);
      if (index > -1) {
        state.myFavBank.splice(index, 1);

        //Update the local storage with the new array
        window.localStorage.setItem('fav_list', JSON.stringify(state.myFavBank));
      }
    }

  },
  actions:{
    setUserLocation({commit}){
      
    //Getting location using js built in function when the user press on the show my current location from the ui
    window.navigator.geolocation.getCurrentPosition(
        //In case of success
        position =>{
          commit('SET_USER_LOCATION', position);
        }, 

        //In case of an Error
        err=> {
          alert('Wasnt able to set the user location');
          console.log(err);
        },

        {maximumAge:60000, timeout:5000, enableHighAccuracy:true}
      );

    },

    getNearBranches({commit}, data){
      //Making get req to the server in order to get the list of all the branches adding the distance value done in the server 
      axios.get(`/bank/calcDist/`+ data.latitude +`/`+ data.longitude)
      .then(res=>{

        var listOfBranches = res.data.branches;
        
        //The indexs of the array represents all the bank-ids (0-99 ids)
        var arrayObBankIds = new Array(100).fill(0); 

        //Will store the bnk_id of the bank with the max branches in 7km
        var max_bankId = 0;
        
        // Temp value for the max 
        var max_value=0; 

        //Will store the bnk_name of the bank with the max branches in 7km
        var bank_name = null; 

        //check if the current object (brache is located less then 7 km from the user location)
        listOfBranches.filter(branch => branch.distance < 7) 
        .forEach(item => {
          //Array of counters we are adding +1 to the index that matchs the brache id
          arrayObBankIds[item.Bank_Code]++; 
           //Checking if the vlaue in the current index is grater then the max_value if yes then we are updating the new max_value and the bankId equals the current index 
          if(arrayObBankIds[item.Bank_Code] > max_value){
            max_value = arrayObBankIds[item.Bank_Code];
            max_bankId = item.Bank_Code;
            bank_name = item.Bank_Name;
           }
        });

        // res.data[bankWithMaxBranchesNearBy] = bank_name;
        //set list of the bracnches 
        commit('SET_NEAR_BRANCHES', res.data); 

        //store the bank_id and bank_name with max branches in 7km
        commit('SET_BANK_WITH_MAX_BRANCHES_NEAR', {bank_name: bank_name, bank_id: max_bankId});
      })
      .catch(err=>{
        console.log(err);
        alert('Wasnt able to load a list of banks');
      })
    },

    getBankNearBranches({commit, state}){
      //Setting list for the bank with max branches in 7KM
      var branchesList = state.nearBranches.branches;
      var listOfBranches = new Array;

      //If the bank_id is equals to the max_bank_id and the distance is less then 7 km then add it to the array
      branchesList.filter(branch => branch.distance < 7 && branch.Bank_Code == state.max_bank_id) 
      .forEach(item => {
        listOfBranches.push(item);
      });

      commit('SET_LIST_OF_NEAR_NBRANCHES_FOR_BANK', listOfBranches);
    },

    addBankToFav({commit, state},data){
      //Handle the add/remove bank from fav list, if no 
      if(!state.myFavBank){
        commit('SET_MY_FAV_BANK', data);
      }

      //if the bank is aledy in the list then will remove it from the list
      else if(state.myFavBank.includes(data)){
        commit('REMOVE_BANK_FROM_FAV_LIST', data);
      }else{
        commit('SET_MY_FAV_BANK', data);
      }
    }
  },
  getters:{
    getCoords(state){
      return state.coords;
    },
    getFavBankList(state){
      return state.myFavBank;
    }
  }
})
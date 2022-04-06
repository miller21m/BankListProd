import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage/HomePage.vue';
import BranchesNearbyPage from './components/BranchesNearbyPage/BranchesNearbyPage.vue';
import ListOfNearBranches from './components/BranchesNearbyPage/BankWithMaxBranches/ListOfNearBranches.vue'

Vue.use(VueRouter);


const routes = [
  {
    path:'/',
    name:'HomePage',
    component:HomePage
  },
  {
    path:'/BranchesNearby/:latitude/:longitude',
    name:'BranchesNearbyPage',
    component:BranchesNearbyPage,
    children:[
      {
        path:'/BranchesNearby/:latitude/:longitude/:bank/NearBranches',
        name:'NearBranches',
        component:ListOfNearBranches
      }
    ]
  }
];


const router = new VueRouter({
  mode:"history",
  base: process.env.BASE_URL,
  routes
});

export default router;
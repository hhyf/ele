import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex);
const state = {
  shopTypeList : [],
  shopList : [],
  pageNum : 0,
  sum : 2,
  comArr : ["App","login","detail","shopDetail"],
  index : 0,
  count : 0,//购物车的数量
  carList : [],//购物车列表
  goodscount : 0,//商品的购买数量
  keyWord : "",
  shopList : [],//所有店铺列表
  activityList : [] ,//所有活动列表
  isLoading : true,//加载
  shopDetailInfo : {} , //指定店铺的所有商品列表
  orderList : [] //订单列表
};
const mutations = {
    CHANGE_COM(state,index){
      state.index = index;
    },
    CHANGE_KEYWORD(state,keyWord){
        state.keyWord = keyWord
    },
    CHANGE_LOADING(state,load){
        state.isLoading = load
    }
};
const getters = {
      balanced(){
          return state.count ? "去结算" : "20元起送"
      },
      bgColor(){
          return state.count ? "#38ca73" : ""
      },
      txcolor(){
          return state.count ? "#fff" : ""
      },
      fsize(){
          return state.count ? "0.14rem" : ""
      },
      allMoney(){
          var sum = 0;
          state.carList.forEach((v)=>{
              sum += v.count * v.goodsInfo[0].goodsPrice
          })
          return sum;
      }
};
const actions = {
  //获取所有店铺类型
  getShopType(){
    axios.get("/getShopType").then(data=>{
        if(data.ok === 1){
            state.sum = data.sum;
            var arr = [];
            state.shopTypeList = data.shopTypeList;
            for(var i = 1;i <= state.sum;i ++){
              arr.push(state.shopTypeList.slice((i-1)*10,i*10));
            }
            state.shopTypeList = arr;
        }
    })
  },
  //获取店铺
getShop({state},{pageIndex,success}){
    console.log(state.keyWord);
    axios.get("/getShopList?pageIndex="+pageIndex + "&keyWord="+state.keyWord).then(data=>{
        setTimeout(()=>{
            if(pageIndex == 1){
                state.shopList = data.shopList;
            }else{
                state.shopList = state.shopList.concat(data.shopList);
            }
            state.activityList = data.activityList;
            state.isLoading = true;
        },1000)
    })
},
  //获得购物车列表
  getcarList({state,commit}){
    axios.get("/getCarList",{
        params : {
            userId : localStorage.userId
        }
    }).then(data=>{
        if(data.ok === 1){
            state.count = 0;
            state.carList = data.carList;
            data.carList.forEach((v)=>{
                state.count += v.count;
            })
        }else{
            alert(data.msg);
        }
    })
  },
//   getCarCount(state,id){
//     axios.get("/getCarCount",{
//         params : {
//             goodsId : id,
//             userId : localStorage.userId
//         }
//     }).then(data=>{
//       console.log(data);
//         if(data.ok === 1)
//           state.goodscount = data.count
//     })
//   }
  //获取店铺中的商品
  getShopGoods({state},{shopId}){
    axios.get("/getShopDetail",{
        params :　{
            shopId
        }
    }).then(data=>{
        if(data.ok === 1){
            state.shopDetailInfo = data.shopDetail[0];
        }else{
            alert(data.msg)
        }
    })
  },
  //获取店铺中指定商品类型的商品
  getGoodsTypeGoods({state},{goodsTypeId}){
      axios.get("/getGoodsTypeGoods?goodsTypeId="+goodsTypeId).then(data=>{
        state.shopDetailInfo.goodsList = data.goodsList;
      })
  },
  //获取订单列表
  getOrderList({state}){
    axios.get("/getOrderList",{
        params : {
            userId : localStorage.userId
        }
    }).then(data=>{
        if(data.ok === 1){
            state.orderList = data.orderList
        }else{
            alert(data.msg)
        }
    })
}
};
const modules = {

};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})

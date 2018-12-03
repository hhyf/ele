import axios from 'axios'
import Vue from "vue"
var vue = new Vue()

export default {
    state : {},
    mutations : {},
    actions : {
        addShopType(state,{formdata,success}){
            console.log(formdata);
            axios.post("/addShopType",formdata).then(data=>{
                console.log(data);
            })
        }
    },
    methods : {},

}

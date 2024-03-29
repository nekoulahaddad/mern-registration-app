import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING,ADD_COMMENT } from '../actions/types';

const initialState = {
items: [],
loading: false,
comment:''
}


export default function(state = initialState, action) {
switch (action.type) {
case GET_ITEMS:
return {
...state,
items:action.payload,
loading:false
};
case DELETE_ITEM:
return {
...state,
items:state.items.filter(item => item._id !== action.payload)
};
case ADD_ITEM:
return {
	...state,
	items: [action.payload,...state.items]
};
case ADD_COMMENT:
return {
	...state,
	comment:action.payload
};

case ITEMS_LOADING:
return{
	...state,
	loading:true
};
default :
return state;






}





}
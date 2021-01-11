// [1,2,3,4,5].reduce( (sum, next, index) => {
//     console.log(sum,next, index)
//     return sum += next
// } ,0);

inc = (payload=1) => ({type:'INC', payload}); 
dec =  (payload=1) => ({type:'DEC', payload});
updateUser = (payload) => ({type:'UPDATE_USER', payload});


counterReducer = (state = 0, action) => {
     switch(action.type){
        case 'INC': return  state + action.payload  
        case 'DEC': return  state - action.payload     
        default:
            return state 
    }

}

reducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_USER':
            return {...state, user: action.payload }
        default:
            return {
                ...state,
                counter: counterReducer(state.counter,action)
            } 
    }
}

init = {
    user:null,
    counter:0
}
state = reducer(init,inc())
state = reducer(state,updateUser({name:'palcki'}))
state = reducer(state,inc())
state;


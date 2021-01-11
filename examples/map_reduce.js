[1,2,3].map( x => x * 3 )
// (3) [3, 6, 9]
[1,2,3].filter( x => x % 2 )
// (2) [1, 3]
[1,2,3].reduce( (sum, x) => sum + x ,0)
// 6
[1,2,3].reduce( (sum, x) => { console.log(sum,x); return sum + x },0)
// VM630:1 0 1
// VM630:1 1 2
// VM630:1 3 3
// 6

[1,2,3].reduce( (sum, x) => [...sum,x] ,[])
// (3) [1, 2, 3]

[1,2,3].reduce( (sum, x) => [...sum,x * 2] ,[])
// (3) [2, 4, 6]

[1,2,3].reduce( (state,x)=>{
  state.counter += x;
  return state;
},{
  counter:0, todos:[], time: Date.now() 
})
// {counter: 6, todos: Array(0), time: 1608715428479}


inc = (s) => s + 1;
dec = (s) => s - 1;


[inc,inc,inc,dec].reduce( (state,fn)=>{
    state.counter = fn(state.counter);
    return state;
},{
    counter:0, todos:[], time: Date.now() 
})
// {counter: 2, todos: Array(0), time: 1608715563328}



inc = (payload=1) => ({type:'INC', payload});
dec = (payload=1) => ({type:'DEC', payload});
addTodo = (payload) => ({type:'TODO', payload});

reducer = (state, action)=>{
    console.log(action)
    switch(action.type){
        case 'INC': return {...state, counter: state.counter + action.payload};
        case 'DEC': return {...state, counter: state.counter - action.payload};
        case 'TODO': return {...state, todos: [...state.todos, action.payload] };
        default:
            return state;
    }
}

state = [inc(),inc(),inc(3),dec(2), addTodo('kup mleko') ].reduce( reducer,{
    counter:0, todos:[], time: Date.now() 
})

state = reducer(state, addTodo('Learn redux'))
state = reducer(state, addTodo('Profit!'))

// VM1397:6 {type: "INC", payload: 1}
// VM1397:6 {type: "INC", payload: 1}
// VM1397:6 {type: "INC", payload: 3}
// VM1397:6 {type: "DEC", payload: 2}
// VM1397:6 {type: "TODO", payload: "kup mleko"}
// VM1397:6 {type: "TODO", payload: "Learn redux"}
// VM1397:6 {type: "TODO", payload: "Profit!"}
// {counter: 3, todos: Array(3), time: 1608715971302}

// ================
inc = (payload=1) => ({type:'INC', payload});
dec = (payload=1) => ({type:'DEC', payload});
addTodo = (payload) => ({type:'TODO', payload});

counterSliceReducer =  (state = 0, action)=> {
     switch(action.type){
        case 'INC': return state + action.payload;
        case 'DEC': return state - action.payload;
      default:
        return state;
    }
}

todosSliceReducer =  (state = [], action)=>{
     switch(action.type){
        case 'TODO': return [...state, action.payload]
      default:
        return state;
    }
}

reducer = (state, action)=>{
    console.log(action)
    switch(action.type){
      default:
        return {
            ...state, 
            todos: todosSliceReducer(state.todos,action),
            counter: counterSliceReducer(state.counter,action)
        };
    }
}


state = [inc(),inc(),inc(3),dec(2), addTodo('kup mleko') ].reduce( reducer,{
    counter:0, todos:[], time: Date.now() 
})

state = reducer(state, addTodo('Learn redux'))
state = reducer(state, addTodo('Profit!'))


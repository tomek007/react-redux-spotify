console.log(1)

setTimeout(()=>console.log(2),0);

Promise.resolve(3).then(console.log);

now = Date.now()
while((now + 5000) > Date.now()) {}

console.log(4)

// ================

function echo(msg){
    setTimeout(()=>{    
        return  ('Echo '+msg)
    },2000)
}
p = echo('ala ma kota')

// ================

function echo(msg,callback){
    setTimeout(()=>{    
        callback(' '+msg)
    },2000)
}

echo('ala', res => {
    echo(res + ' ma ',res =>{
        echo(res + 'kota',res => {
            console.log(res) 
        })
    })
})

// ================

function echo(msg,callback){
  return new Promise((resolve, reject )=>{
      setTimeout(()=>{    
          resolve(' '+msg)
      },2000)
  }) 
}

p = echo('Ala ')
p2 = p.then( res => res + ' ma ')
p3 = p2.then( res => res + ' kota')

p3.then(console.log)
p3.then( res => res + ' i placki ').then(console.log)
p3.then(console.log)
setTimeout(()=>  p3.then(console.log), 3000)

// ================

p = echo('Ala ')
p2 = p.then( res => echo(res + ' ma ') )
p3 = p2.then( res => echo(res + ' kota') )

p3.then(console.log)

// ================

function echo(msg, error){
  return new Promise((resolve, reject )=>{
      setTimeout(()=>{    
        error? reject(error) :  resolve(' '+msg)
      },2000)
  }) 
}

echo('Ala ', 'ups...')
.then( res => echo(res + ' ma '), err => echo('Anonym nie ma '))
.then( res => echo(res + ' kota'/*, 'ups2'*/) )
.then(console.log)
.catch(console.log)

// ================

async function load(){
  try{
      res = await echo('Ala')
      res2 = await echo(res+ ' ma ')
      res3 = await echo(res2+ ' kota ')
  }catch(error){
      res3 = await echo('NIe ma kota!')
  }
  return res3;
}
load().then(console.log)

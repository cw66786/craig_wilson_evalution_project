// {/* <div id="card" class="card">
//                 <div id="img-container">
//                     <img id="personpic">
//                     </div>
//                     <div id="about">
//                         <button id="dob-btn"></button>
//                     </div>

//             </div> */}

const Api = (() => {
  const baseUrl = "https://randomuser.me/api";
  
let people = [];

async function getPerson() {
  let obj;

  const res = await fetch(baseUrl)

  obj = await res.json().then(data => data.results[0]);


  for(let i = 0;i<20;i++){
    people.push(await obj);
  }
 

};



  getPerson();


  return {getPerson,people};
})();


const Model = ((api) => {
  
  

return {}
})(Api);

console.log(Api.people)


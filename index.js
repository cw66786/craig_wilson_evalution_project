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
  
let people;
  const getPerson = () => {
    

    fetch(baseUrl)
        .then((response) => response.json())
        .then(JsonData => {
    
         people =  JsonData
    
        }).catch(error => console.error)
  };

  getPerson();


  return {getPerson,people};
})();

console.log(Api.people)

const Model = ((api) => {
  


})(Api);



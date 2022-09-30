// {/* <div id="card" class="card">
//                 <div id="img-container">
//                     <img id="personpic">
//                     </div>
//                     <div id="about">
//                         <button id="dob-btn"></button>
//                     </div>
                   
//             </div> */}


 const Api = (() => {
	
  const baseUrl = 'https://randomuser.me/api';
  let person;

	
       

    fetch(baseUrl)
    .then(res => res.json())
    .then(data => person = data.results[0]);

       
          
         
          
         
  
   

	
 console.log(person)
	
	return {};
 })();
 


 const Model = (()=>{

 })(Api)
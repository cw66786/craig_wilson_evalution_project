

const Api = (() => {
  const baseUrl = "https://randomuser.me/api";
  
const people =[];

async function getPerson() {
  let obj;

  for(let i = 0;i<20;i++){
    const res = await fetch(baseUrl)

  obj = await res.json().then(data => data.results);


  
    people.push({id: (i),name: ( obj[0].name.first+" "+obj[0].name.last),phone: obj[0].phone,email: obj[0].email,dob: obj[0].dob.date,img: obj[0].picture.thumbnail});

  }
};
  getPerson();
  
 





  


  return {getPerson,people};
})();




const View = (() => {
	const domstr = {
		leftCon: "#left-card-container",
    rightCon: "#right-card-container",
    reloadBtn: "#reload-btn",
    dobBtn: "#dob-btn"
	};
	const render = (el, tmp) => {
		el.innerHTML += tmp;
	};
	const createTmp = (arr) => {
		let tmp = "";
		arr.forEach((el) => {
     
			tmp += `
      <div id="${el.indexOf()}" class="card">
          <div id="img-container" >
          <img id="personpic" src=${el.img} alt="profile pic">
          </div>
          <div id="about">
              <span>Name: ${el.name}</span>
              <span>Email: ${el.email}</span>
              <span>Phone: ${el.phone}</span>
              <span>dob: ${el.dob}</span>
              <button id="dob-btn">D.O.B.</button>
          </div>

  </div>
  `;
		});
		return tmp;
	};

	return { render, createTmp, domstr };
})();

const Model = ((api) => {
  


return {}
})(Api);


const Controller = ((view,api)=>{
let left = document.querySelector(view.domstr.leftCon);
let right = document.querySelector(view.domstr.rightCon);
let people = api.people;

console.log(people)
  const bootstrap = ()=>{
    
    view.render(left,view.createTmp(people));
    
  };


  return {bootstrap}
})(View,Api);

Controller.bootstrap();



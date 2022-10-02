


const Api = (() => {
  const baseUrl = "https://randomuser.me/api/?results=20";
  


const getPeople = ()=> {
 return fetch(baseUrl)
  .then((r) => r.json())
  .then(data => data = data.results);

}

        
          

  


    
  
  


  return {getPeople};
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
      <div id="${el.id}" class="card">
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

const Model = ((api,view) => {
  const { getPeople } = api;

  class Person {
    constructor(id,picture, title, first, last, email, phone, dob) {
        this.id = id
        this.picture = picture
        this.title = title
        this.first = first
        this.last = last
        this.email = email
        this.phone = phone
        this.dob = dob
    }
  };

  class State {
    #peopleList = [];

    get PeopleList() {
      return this.#peopleList;
    }
    set PeopleList(newpeoplelist) {
      this.#peopleList = newpeoplelist;

      const left = document.querySelector(view.domstr.leftCon);
      const right = document.querySelector(view.domstr.rightCon);
      const tmp = view.createTmp(this.#peopleList);
      view.render(left, tmp.slice(0,tmp));
      view.render(right, tmp.slice(tmp.length/2,tmp.length));
    }
  }

  return { getPeople, State,Person};


})(Api,View);




const Controller = ((model,view)=>{



 
    const state = new model.State();

    const init = () => {

      state.peopleList = [];

     
        
          model.getPeople().then((data) => {

            data.forEach(el =>{
              let newPerson = new model.Person(
                    Math.floor(Math.random()*21),
                    el.picture.thumbnail,
                    el.name.title,
                    el.name.first,
                    el.name.last,
                    el.email,
                    el.phone,
                    el.dob.date
                    );
              
              state.peopleList = [...state.peopleList, newPerson];

            })
          })
         
      
  };
 
    
  

  const bootstrap = ()=>{
    let left = document.querySelector(view.domstr.leftCon);

    init();
   view.render(left,view.createTmp(state.PeopleList));
  };

  return {bootstrap}
})(Model,View);

Controller.bootstrap();






const Api = (() => {
  const baseUrl = "https://randomuser.me/api";
  


const getPeople = ()=> 

        
          
fetchJsonp(baseUrl)
.then((r) => r.json());

  


    
  
  


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

const Model = ((api,view) => {
  const { getPeople } = api;

  class Person {
    constructor(picture, title, first, last, email, phone, dob) {
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
    set Peoplelist(newpeoplelist) {
      this.#peopleList = newpeoplelist;

      const left = document.querySelector(view.domstr.leftCon);
      const right = document.querySelector(view.domstr.rightCon);
      const tmp = view.createTmp(this.#peopleList);
      view.render(left, tmp.slice(0,tmp.length/2));
      view.render(right, tmp.slice(tmp.length/2,temp.length));
    }
  }

  return { getPeople, State,Person};


})(Api,View);




const Controller = ((model)=>{



 
    const state = new model.State();

    const init = () => {

      state.peopleList = [];

      for (let i = 0; i < 20; i++) {
          let newPeople = {}
          model.getPeople().then((person) => {
              newPeople = {
                  'id': Math.floor(Math.random()*21),
                  'picture': person.results[0].picture.large,
                  'title': person.results[0].name.title,
                  'first': person.results[0].name.first,
                  'last': person.results[0].name.last,
                  'email': person.results[0].email,
                  'phone': person.results[0].phone,
                  'dob': person.results[0].dob.date
              }
              state.peopleList = [...state.peopleList, newPeople];
          });
      }
  };
 
    
  

  const bootstrap = ()=>{
    init();
  };

  return {bootstrap}
})(Model);

Controller.bootstrap();






const Api = (() => {
  const baseUrl = "https://randomuser.me/api/?results=20";
  


const getPeople = async ()=> {
 const r = await fetch(baseUrl);
  const data = await r.json().then(data => data = data.results);
                      
  return  data;

}

        
          

  


    
  
  


  return {getPeople};
})();




const View = (() => {
	const domstr = {
		leftCon: "#left-card-container",
    rightCon: "#right-card-container",
    reloadBtn: "#reload-btn",
   
	};
	const render = (el, tmp) => {
		el.innerHTML = tmp;
	};
	const createTmp = (arr) => {
		let tmp = "";
		arr.forEach((el) => {
    
			tmp += `
      <div id="${el.id}" class="card">
          <div id="img-container" >
          <img  class="person-pic" src=${el.img} alt="profile pic"/>
          </div>
          <div class="about">
              <span>Name: ${el.name}</span>
              <span>Email: ${el.email}</span>
              <span>Phone: ${el.phone}</span>
              <span id="${el.id}-text" class="dob-text" style="display:none">Dob: ${el.dob}</span>
              <button id="${el.id}-btn" class="dob-btn" style="display:block">D.O.B.</button>
          </div>

  </div>`;
		});
		return tmp;
	};

	return { render, createTmp, domstr };
})();

const Model = ((api,view) => {
  const { getPeople } = api;

  class Person {
    constructor(id,img, name, email, phone, dob) {
        this.id = id
        this.img = img
        this.name = name
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
      const tmpLeft = view.createTmp(this.#peopleList.slice(0,this.#peopleList.length/2));
      const tmpRight = view.createTmp(this.#peopleList.slice(this.#peopleList.length/2,this.#peopleList.length));
      view.render(left, tmpLeft);
     view.render(right, tmpRight);
    }
  }

  return { getPeople, State,Person};


})(Api,View);




const Controller = ((model,view)=>{

  const generateRandomId = () => {
    const resouse =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    const length = 12;
    let id = "";
    for (let i = 0; i <= length; i++) {
    const index = Math.floor(Math.random() * resouse.length);
    id += resouse[index];
    }
    return id;
    }



 
    const state = new model.State();

    const init = async () => {

      state.peopleList = [];

     
        
          let data = await model.getPeople();
           
            data.forEach(el =>{
        
              let newPerson = new model.Person(
                    generateRandomId(),
                    el.picture.medium,
                    (el.name.title+" "+el.name.first+" "+el.name.last),
                    el.email,
                    el.phone,
                    el.dob.date
                    );
              
              state.PeopleList = [...state.PeopleList, newPerson];
           
            })
          
         
         
  };
 
    const reload = ()=>{
      let reloadBtn = document.querySelector(view.domstr.reloadBtn);

      reloadBtn.addEventListener("click",()=>{
        location.reload();
      })
    };


    const dobSwitcher = ()=>{
      


      document.addEventListener("click",(event)=>{
        
        
       

        if(event.target.className === "dob-btn"){
            
          let btn = document.getElementById(event.target.id);

          let textId = event.target.id.split("-");
            textId = textId[0]+"-text";
          
          let text = document.getElementById(textId);
          btn.style.display = "none";
          text.style.display = "block";
        }else  if(event.target.className === "dob-text"){
            
          let text = document.getElementById(event.target.id);

          let btnId = event.target.id.split("-");
            btnId = btnId[0]+"-btn";
          
          let btn = document.getElementById(btnId);
          btn.style.display = "block";
          text.style.display = "none";
        }

       
        
      })
    
    
    


  };


  const bootstrap = ()=>{
    
    init();
    
    reload();
    dobSwitcher();
   
  };

  return {bootstrap}
})(Model,View);

Controller.bootstrap();



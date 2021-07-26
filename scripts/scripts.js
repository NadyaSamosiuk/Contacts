class User{
    
    constructor(data){
        this.data = data
    }

    edit(data){

        for (let key in data){
            if (this.data[key] !=undefined) this.data[key] = data[key]
        }
    }
   
    get(){
        return this.data;
    }

}

class Contacts{

    constructor(){
        this.data = [];
    }
    
    add(data){
        if (data.id == undefined) data.id = 0;

        let user = new User(data),           
            maxId = 0;

        this.data.forEach(user => {
            if (user.data.id != undefined) {
                if (maxId == undefined) maxId = +user.data.id;
                else if (maxId < +user.data.id) maxId = +user.data.id;
            }
        });

        maxId++;
        user.edit({id: maxId});
        this.data.push(user);
    }
    
    edit(id, data){
        let user = this.data.filter(user => {
            return +user.data.id == +id;
        });
 
        if (user.length == 0) return;
       
        user = user[0];
        user.edit(data);
    }
    
    remove(id){
        
        this.data = this.data.filter(user => {
            return +user.data.id != +id;
        }); 
    }

    get(){
        return this.data;
    }
}

class ContactsApp extends Contacts{

    constructor(){
        super();

        this.init();
    }

    init(){
        const contactsApp = document.createElement('div');
        contactsApp.classList.add('contacts');
        document.body.appendChild(contactsApp)

        const contactsForm = document.createElement('div');
        contactsForm.classList.add('contacts__form');
        contactsApp.appendChild(contactsForm)

        this.contactsList = document.createElement('div');
        this.contactsList.classList.add('contacts__list');
        contactsApp.appendChild(this.contactsList)

       const contactsNameTitle = document.createElement('p');
       contactsNameTitle.classList.add('name__title')
       contactsForm.appendChild(contactsNameTitle);
       contactsNameTitle.innerHTML='Имя'

       this.contactsNameInput = document.createElement('input');
       this.contactsNameInput.classList.add('name__input')
       this.contactsNameInput.setAttribute('placeholder', 'Иван');
       contactsForm.appendChild(this.contactsNameInput);
       
       const contactsEmailTitle = document.createElement('p');
       contactsEmailTitle.classList.add('email__title')
       contactsForm.appendChild(contactsEmailTitle);
       contactsEmailTitle.innerHTML='Электронная почта'

       this.contactsEmailInput = document.createElement('input');
       this.contactsEmailInput.classList.add('email__input')
       this.contactsEmailInput.setAttribute('placeholder', 'Ivan@gmail.com');
       contactsForm.appendChild(this.contactsEmailInput);

       const contactsAdresTitle = document.createElement('p');
       contactsAdresTitle.classList.add('adres__title')
       contactsForm.appendChild(contactsAdresTitle);
       contactsAdresTitle.innerHTML='Адрес'

       this.contactsAdresInput = document.createElement('input');
       this.contactsAdresInput.classList.add('adres__input')
       this.contactsAdresInput.setAttribute('placeholder', 'г.Минск ул.Могилевская, д.5');
       contactsForm.appendChild(this.contactsAdresInput);

       const contactsPhoneTitle = document.createElement('p');
       contactsPhoneTitle.classList.add('phone__title')
       contactsForm.appendChild(contactsPhoneTitle); 
       contactsPhoneTitle.innerHTML='Номер телефона'

       this.contactsPhoneInput = document.createElement('input');
       this.contactsPhoneInput.classList.add('phone__input')
       this.contactsPhoneInput.setAttribute('placeholder', '+375 29 455 32 43')
       contactsForm.appendChild(this.contactsPhoneInput);
    
       const contactsBtn = document.createElement('button');
       contactsBtn.classList.add('btn')
       contactsForm.appendChild(contactsBtn);
       contactsBtn.innerHTML=""

       const btnClik = document.querySelector('.btn')
     
       btnClik.addEventListener('click', event =>{        
            this.onAdd(event);
        });
    }

    updateList(){
        
        this.contactsList.innerHTML = '';
          
        this.data.forEach(user =>{

            this.contactsElem = document.createElement('div');
            this.contactsElem.classList.add('contacts__item');
            this.contactsList.appendChild(this.contactsElem)
            

            const ul = document.createElement('ul');
            ul.classList.add('list');
            this.contactsElem.appendChild(ul);

            const img = document.createElement('div');
            img.classList.add('img');
            ul.appendChild(img);

            const buttonEdit = document.createElement('button')
            buttonEdit.classList.add('btn_edit')
            buttonEdit.innerHTML=' ';
            this.contactsElem.appendChild(buttonEdit)
                       
            buttonEdit.setAttribute('id', user.data.id)

            const btnEdit = document.querySelector(`.btn_edit[id="${user.data.id}"]`)
                    
            btnEdit.addEventListener('click', event =>{ 
                let id = event.target.id;

                if (!id) return;

                this.onEdit(id);     
            });
           

            const buttonRemove = document.createElement('button')
            buttonRemove.classList.add('btn_remove')
            this.contactsElem.appendChild(buttonRemove)
            buttonRemove.innerHTML=' ';
 
            buttonRemove.setAttribute('id', user.data.id)

            const btnRemove = document.querySelector(`.btn_remove[id="${user.data.id}"]`)
            
            btnRemove.addEventListener('click', event =>{ 
                let id = event.target.id;

                if (!id) return;

                this.onRemove(id);
            })    
          
            const li1 = document.createElement('li')
            li1.classList.add('list__item');
            

           const li2 = document.createElement('li')
            li2.classList.add('list__item');

            const li3 = document.createElement('li')
            li3.classList.add('list__item');

            const li4 = document.createElement('li')
            li4.classList.add('list__item');
                    
            li1.innerHTML = user.data.name;
            li2.innerHTML = user.data.email;
            li3.innerHTML = user.data.adres;
            li4.innerHTML = user.data.phone;

            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);
            ul.appendChild(li4);
        })  
    }

    setStorage(){
        localStorage.setItem('this.data', JSON.stringify(this.data));

        this.getStorage()
    }

   getStorage(){

        let localData = localStorage.getItem('this.data');
        
        if (localData.length > 0) this.data = JSON.parse(localData)
        console.log(this.data)    
    }

    onAdd(event){           
        let name = document.querySelector('.name__input'),
            email = document.querySelector('.email__input'),
            adres = document.querySelector('.adres__input'),
            phone = document.querySelector('.phone__input');

        if (this.contactsNameInput.value.length == 0) return;
        if (this.contactsEmailInput.value.length == 0) return;
        if (this.contactsPhoneInput.value.length == 0) return; 
            
        const data = {
            name: name.value,
            email: email.value,
            adres: adres.value,
            phone: phone.value,
        };
                         
        if(!this.contactsNameInput.dataset.action || ! this.contactsNameInput.dataset.id){
          this.add(data)
        }else{
            this.edit(this.contactsNameInput.dataset.id, data);
            this.contactsNameInput.dataset.action='';
            this.contactsNameInput.dataset.id='';
        }

       // this.setStorage();

       name.value = "";
       email.value="";
       adres.value="";
       phone.value="";

       this.updateList();
    }

    onRemove(id){
        this.remove(id) 
            
        this.updateList()
    }

    onEdit(id){
        //создаем переменную и ищем тот обьект this.data который соответствует нашему Id
        const user = this.data.find(user =>{
            return user.data.id == id;
        });

        this.contactsNameInput.value = user.data.name;
        this.contactsEmailInput.value = user.data.email;
        this.contactsAdresInput.value = user.data.adres;
        this.contactsPhoneInput.value = user.data.phone;

        this.contactsNameInput.dataset.action = 'edit';
        this.contactsNameInput.dataset.id = id;
        
        this.updateList()
    }
}

new ContactsApp()


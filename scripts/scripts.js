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
    
    edit(id,data){
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

       const contactsNameInput = document.createElement('input');
       contactsNameInput.classList.add('name__input')
       contactsForm.appendChild(contactsNameInput);
       
       const contactsEmailTitle = document.createElement('p');
       contactsEmailTitle.classList.add('email__title')
       contactsForm.appendChild(contactsEmailTitle);
       contactsEmailTitle.innerHTML='Электронная почта'

       const contactsEmailInput = document.createElement('input');
       contactsEmailInput.classList.add('email__input')
       contactsForm.appendChild(contactsEmailInput);

       const contactsAdresTitle = document.createElement('p');
       contactsAdresTitle.classList.add('adres__title')
       contactsForm.appendChild(contactsAdresTitle);
       contactsAdresTitle.innerHTML='Адрес'

       const contactsAdresInput = document.createElement('input');
       contactsAdresInput.classList.add('adres__input')
       contactsForm.appendChild(contactsAdresInput);

       const contactsPhoneTitle = document.createElement('p');
       contactsPhoneTitle.classList.add('phone__title')
       contactsForm.appendChild(contactsPhoneTitle);
       contactsPhoneTitle.innerHTML='Номер телефона'

       const contactsPhoneInput = document.createElement('input');
       contactsPhoneInput.classList.add('phone__input')
       contactsForm.appendChild(contactsPhoneInput);
    
       const contactsBtn = document.createElement('button');
       contactsBtn.classList.add('btn')
       contactsForm.appendChild(contactsBtn);
       contactsBtn.innerHTML="Создать"

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

            const buttonEdit = document.createElement('button')
            buttonEdit.classList.add('btn_edit')
            this.contactsElem.appendChild(buttonEdit)
            buttonEdit.innerHTML='Изменить'
            
            buttonEdit.setAttribute('id', user.data.id)

            const btnEdit = document.querySelector(`.btn_edit[id="${user.data.id}"]`)

            btnEdit.addEventListener('click', event =>{ 
                let id = event.target.id;
                this.onEdit(id);     
            });
           

            const buttonRemove = document.createElement('button')
            buttonRemove.classList.add('btn_remove')
            this.contactsElem.appendChild(buttonRemove)
            buttonRemove.innerHTML='Удалить'
 
            buttonRemove.setAttribute('id', user.data.id)

            const btnRemove = document.querySelector(`.btn_remove[id="${user.data.id}"]`)
            
            btnRemove.addEventListener('click', event =>{ 
                let id = event.target.id;
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

    onAdd(event){           
        let name = document.querySelector('.name__input'),
            email = document.querySelector('.email__input'),
            adres = document.querySelector('.adres__input'),
            phone = document.querySelector('.phone__input');
               
        this.add({
            name: name.value,
            email: email.value,
            adres: adres.value,
            phone: phone.value,
        });

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
        this.edit(id,{
            name: prompt('Введите новое имя'),
            email:prompt('Введите новый email'),
            adres: prompt('Введите новый адрес'),
            phone: prompt('Введите новый номер телефона'),
        });
        
        this.updateList()
    }
}

new ContactsApp()


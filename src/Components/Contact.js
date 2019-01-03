import React,{Component} from "react";

class Contact extends Component{
    constructor(props){
        super(props);
        this.form=null;

    }
     validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
      }
    
       validateHuman(honeypot) {
        if (honeypot) {  //if hidden form filled up
          console.log("Robot Detected!");
          return true;
        } else {
          console.log("Welcome Human!");
        }
      }
    
      // get all data in form and return object
       getFormData=(form)=> {
        var elements = form.elements;
    
        var fields = Object.keys(elements).filter(function(k) {
              return (elements[k].name !== "honeypot");
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          // special case for Edge's html collection
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });
    
        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];
          
          // singular form elements just have one value
          formData[name] = element.value;
    
          // when our element has multiple items, get their values
          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });
    
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    
        console.log(formData);
        return formData;
      }
    
       handleFormSubmit=(event)=> {  // handles form submit without any jquery
        event.preventDefault();          // we are submitting via xhr below
        console.log(this.form);
        var form = this.form;
        var data = this.getFormData(form);         // get the values submitted in the form
    
         
        if (this.validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
          return false;
        }
        
    
        if( data.email && !this.validEmail(data.email) ) {   // if email is not valid show error
          var invalidEmail = form.querySelector(".email-invalid");
          if (invalidEmail) {
            invalidEmail.style.display = "block";
            return false;
          }
        } else {
          this.disableAllButtons(form);
          var url = form.action;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', url);
          // xhr.withCredentials = true;
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.onreadystatechange = function() {
              console.log(xhr.status, xhr.statusText);
              console.log(xhr.responseText);
              var formElements = form.querySelector(".form-elements")
              if (formElements) {
                formElements.style.display = "none"; // hide form
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                thankYouMessage.style.display = "block";
              }
              return;
          };
          // url encode form data for sending as post data
          var encoded = Object.keys(data).map(function(k) {
              return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
          }).join('&');
          xhr.send(encoded);
        }
      }
        
   loaded() {
    console.log("Contact form submission handler loaded successfully.");
    // bind to the submit event of our form
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", this.handleFormSubmit, false);
    }
  };
 

   disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
}

    componentDidMount(){
        document.addEventListener("DOMContentLoaded", this.loaded, false);
        this.form=document.querySelector("form");
        console.log(this.form);
        
    }
    componentWillUnmount(){
        document.removeEventListener("DOMContentLoaded", this.loaded, false);
   
    }
      
    
    
    
    
    render(){
    return <div>
   
  
  
    <form className="gform" method="POST" data-email="example@email.net" style={{margin:"10px"}}
    action="https://script.google.com/macros/s/AKfycbwX2Bnt3X1li81hY-ffUQtW04WeuVt7KSXpqpc6/exec">
 
  
      <div className="form-elements">
        <fieldset>
          <label htmlFor="name">Name: </label>
          <input id="name" name="name" placeholder="What should I call you?" />
        </fieldset>
  
        <fieldset >
          <label htmlFor="message">Message: </label>
          <textarea id="message" name="message" rows="10" style={{width:"100%"}}
          placeholder="Why are you contacting me?"></textarea>
        </fieldset>
  
        <fieldset >
          <label htmlFor="email"><em>Your</em> Email Address:</label>
          <input id="email" name="email" type="email"
          required placeholder="adresss@email.com"/>
          <span className="email-invalid" >
            Must be a valid email address</span>
        </fieldset>
  
  
        <button className="button-xlarge" onClick={this.handleFormSubmit}>
          Send</button>
      </div>
  
  
      <div className="thankyou_message" style={{display:"none"}}>
        <h2><em>Thanks</em> for contacting me!
          I will get back to you soon!</h2>
      </div>
  
    </form>
  
   
    <script data-cfasync="false" type="text/javascript"
    src="form-submission-handler.js"></script>

</div>;
    }
}

export default Contact;
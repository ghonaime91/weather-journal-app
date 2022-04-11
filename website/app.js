
/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=e0774274bc36aa98e91dcd8f7fddfc15&units=metric";
const btn = document.getElementById("generate");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

//function to send data to my server
const postData = async(url="",dataObject={})=>{
    
    const request = await fetch(url,{
        method:"POST",
        mode:"cors",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(dataObject)
    });
}

//function to get data from the open weather map api first then from  my server
const getData = async(url="")=>{
    const response = await fetch(url); 
    try{
        const data = await response.json();
        //showing an error message to the user 
        if(data.cod != 200){
            document.querySelector("#date").innerHTML = ``;
            document.querySelector("#city").innerHTML = ``;
            document.querySelector("#temp").innerHTML = ``;
            document.querySelector("#content").innerHTML = ``; 
            document.getElementById("error").style.display="block";
            document.getElementById("error").innerHTML = `${data.message}`;

        } else {
            document.getElementById("error").style.display="none";
            return data;
        }
    }catch(e){
       console.log("Error: "+e);
    }
}

//function to update the UI
const updateUi = async ()=>{
    const res = await fetch("/all");

    try{
            
        const allData = await res.json();    
        document.querySelector("#date").innerHTML = `Date: ${allData.date}`;
        document.querySelector("#city").innerHTML = `City: ${allData.name}`;
        document.querySelector("#temp").innerHTML = `Temp: ${allData.temp} °C`;
        document.querySelector("#content").innerHTML = `Feeling: ${allData.feel}`;   
        
    }catch(e){
        console.log("Error "+e);
    }
    
}
//event if the generate button clicked

btn.addEventListener("click",(e)=>{

    const zip = document.getElementById("zip").value;
    const feeling = document.getElementById('feelings').value;
    //full url of the api
    const URL = `${baseURL}${zip}${apiKey}`;

    getData(URL).then(data=>{
        const temp = data.main.temp;
        const name = data.name;
        const dataObject = {
            date:newDate,
            feel:feeling,
            name:name,
            temp:Math.round(temp)
        }
        postData("/add",dataObject)
        updateUi();
    });
    
})

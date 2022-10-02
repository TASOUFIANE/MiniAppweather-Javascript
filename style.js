const wrapper =document.querySelector(".wrapper");
const inputPart=document.querySelector(".input-part");
const infoText=document.querySelector(".info-text");
let inputField=document.querySelector("input");
locationBtn=inputPart.querySelector("button");
arrowback= wrapper.querySelector("header i");
let api;
const icon=document.querySelector("img");
inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click",()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
      } else {
        alert("Geolocation is not supported by this browser");
      }
});
function onSuccess(position){
  api=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e70742e69ef2d55e82f6f8910737e092`;
 fetchData();    
}

function onError(error){
    infoText.innerText=error.message;
    infoText.classList.add("error");
}

function requestApi(city){
     api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e70742e69ef2d55e82f6f8910737e092`;
    fetchData();
}

function fetchData(){
    infoText.innerHTML='Getting weather details ...';
    infoText.classList.add("pending");
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}

function weatherDetails(info){
    if(info.cod =="404"){      
        infoText.classList.replace("pending","error");
        infoText.innerText="City Not Found";
    }else{
        const city= info.name;
        const country= info.sys.country;
        const desc = info.weather[0].description;
        const id = info.weather[0].id;
        const{feels_like,humidity,temp}=info.main;
        const tocelcius=273;
        if(id == 800){
            icon.src="img/clear.svg";
        }else if(id<=804 && id>=801)
        {
            icon.src="img/cloud.svg";
        }else if(id >= 701 && id)
        {
            icon.src="img/haze.svg";
        }else if(id<=622 && id>=600)
        {
            icon.src="img/snow.svg";
        }else if((id<=531 && id>=500) || (id<=300 && id >=321))
        {
            icon.src="img/rain.svg";
        }else if(id>= 200 && id <= 232)
        {
            icon.src="img/storm.svg";
        }

        wrapper.querySelector(".weather-part .temp .numb").innerText=(temp-tocelcius).toFixed(0);
        wrapper.querySelector(".weather-part .weather").innerText=desc;
        wrapper.querySelector(".weather-part .location span").innerText=city+","+country;
        wrapper.querySelector(".weather-part .details .temp .numb").innerText=(feels_like-tocelcius).toFixed(0);
        wrapper.querySelector(".weather-part .column-humidity .details  .numb").innerText=humidity+"%";

        infoText.classList.remove("pending","error");
        wrapper.classList.add("active");
    }  
}

arrowback.addEventListener("click",()=>{
    wrapper.classList.remove("active");

})
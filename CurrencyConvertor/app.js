const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn= document.querySelector("#ex-btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="GBP"){
            newOption.selected =true;
        }
        else if(select.name ==="to" && currCode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);   
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
    let currCode= element.value;
    // console.log(currCode); //just for understanding.
    let countryCode=countryList[currCode]; // Code for Currency
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

// will Fetch data from api for exchange rate from updateExchageRate func which is async itself so we do not need to async this func (evt)
btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate= async ()=>{
    let amt=document.querySelector(".amount input");
    let amtval=amt.value;
    // console.log(amtval);
    if(amtval==="" || amtval<1){
        amtval=1;
        amt.value=1;
    }
    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}.json`; // url for fetching
    let response= await fetch(URL);
    let data= await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(rate);
    let finalamt=rate * amtval;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
}

window.addEventListener("load", ()=>{
    updateExchangeRate();
})
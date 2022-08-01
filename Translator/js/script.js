const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelectorAll(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for(const country_code in countries){
        // selecting english as default language to transform from and arabic to transform to
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        } else if(id == 1 && country_code == "ar-SA"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option); //adding options tag inside select tag
    }
});

function SwitchLGS(){
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
}

translateBtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=myEmail`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation");
});
});

icons.forEach(icon => {
    icon.addEventListener("click",({target}) =>{
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            } 
            else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } 
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})
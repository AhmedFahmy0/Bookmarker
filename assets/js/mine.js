var input1 = document.getElementById("siteName");
var input2 = document.getElementById("siteUrl");

var siteList = [];

if ( localStorage.getItem("ourSite") == null ) {
    siteList = [] ;
} else {
    siteList = JSON.parse(localStorage.getItem("ourSite")) ;
    displaySite()
}

function submit() {

    if (validateUrl(input2) == true && validateName(input1) == true) {
        
    var site = {
        sName: input1.value,
        sUrl: input2.value
    }

    siteList.push(site);
    localStorage.setItem("ourSite" , JSON.stringify(siteList));

    displaySite() ;

    clearInputs();

    urlError.style.display = 'none';
    nameError.style.display = 'none';

    }
    else{
        if (validateName(input1) == false) {
            showNameError("Name is required");
        }
        if (validateUrl(input2) == false) {
            showUrlError("Url Field is required");
        }
    }


}

function validateName(input1) {

    var regex = /[a-z][0-9]?/ig;

    if (regex.test(input1.value) == true) {
        return true;
    } else {
        return false;
    }

}

function validateUrl(input2) {

    var regex = /^(https:\/\/www\.|http:\/\/www\.)[a-z0-9]+\.[a-z]{2,5}/ig;

    if (regex.test(input2.value) == true) {
        return true;
    } else {
        return false;
    }

}

function displaySite() {
    var haslah = `` ;

    for (var i = 0 ; i < siteList.length; i++){

        haslah += `                
        <div class="my-2"><tr>
    <td>
        <h3>${siteList[i].sName}</h3>
        <p>${siteList[i].sUrl}</p>
    </td>
    <td>
        <a class="my-3 btn btn-primary mx-3 " href="${siteList[i].sUrl}"  target="_blank" >Visit</a>
        <button onclick="deleteProduct(${i})" class="my-3 btn btn-outline-danger mx-3">Delete</button>
    </td>
</tr> </div>` ;
    }
    document.getElementById("tBody").innerHTML = haslah ;
}

function clearInputs(){
    input1.value = "";
    input2.value = "" ;
}

function deleteProduct(sIndex){

siteList.splice(sIndex , 1);
localStorage.setItem("ourSite" , JSON.stringify(siteList));
displaySite() 

}

function showUrlError(msg) {
    var urlError = document.getElementById('urlError');
    urlError.innerHTML = msg;
    urlError.style.display = 'block';

}

function showNameError(msg) {
        var nameError = document.getElementById('nameError');
        nameError.innerHTML = msg;
        nameError.style.display = 'block';
}


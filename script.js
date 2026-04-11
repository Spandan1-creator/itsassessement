function validateForm() {
    let n=document.getElementById("name").value;
    let e=document.getElementById("email").value;
    if (n==""||e=="")
    {alert("Fill all fields");
        return false;
    }
        return true;
    }
    
let imgs=["banner1.jpg", "banner2.jpg", "banner3.jpg"];
let i=0;
function slideShow(){
    document.getElementById("slide").src=imgs[i];
    i=(i+1)%imgs.length;
    setTimeout(slideShow,2000);
}
window.onload=slideShow
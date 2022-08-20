const fileInput = document.querySelector(".file-input");
const previewImg=document.querySelector(".preview-img img");
const filterOptions=document.querySelectorAll(".filter button");
const rotateOptions=document.querySelectorAll(".rotate button");
const filterName=document.querySelector(".filter-info .name");
const filterValue=document.querySelector(".filter-info .value");
const chooseImgBtn=document.querySelector(".choose-img");
const saveImgBtn=document.querySelector(".save-img");
const filterSlider=document.querySelector(".slider input");
const resetBtn=document.querySelector(".controls .reset-filter");


let brightness=100,saturation=100,inversion=0,grayscale=0;
let rotate=0,flipHorizontal=1,flipVertical=1;

const applyFilters=()=>{
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal}) scale(${flipVertical})`;
    previewImg.style.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage=()=>{
    let file=fileInput.files[0];
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load",()=>{
        document.querySelector(".container").classList.remove("disable")
    })
}
filterOptions.forEach(option=>{
    option.addEventListener("click",() =>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText=option.innerText;
     
        if (option.id==="Brightness"){
            filterSlider.max="200";
            filterSlider.value=brightness;
            filterValue.innerText=`${brightness}%`;
            
        }else if(option.id==="Saturation"){ 
            filterSlider.max="200";
            filterSlider.value=saturation;
            filterValue.innerText=`${saturation}%`;
        }else if(option.id==="Inversion"){
            filterSlider.max="100";  
            filterSlider.value=inversion;
            filterValue.innerText=`${inversion}%`;
        }
        else {
            filterSlider.max="100";
            
            filterSlider.value=grayscale;
            filterValue.innerText=`${grayscale}%`;
        }
    });
});
const updateValue=()=>{
    filterValue.innerText=` ${filterSlider.value}% `;
    const selectedFilter=document.querySelector(".filter .active");
    if(selectedFilter.id === "Brightness"){
        brightness=filterSlider.value;
        
    }
    else if(selectedFilter.id==="Saturation"){
        saturation=filterSlider.value;
    }

    else if(selectedFilter.id==="Inversion"){
        inversion=filterSlider.value;
    }  
    else {
        grayscale=filterSlider.value;
    }
    applyFilters(); 
}
rotateOptions.forEach(option=>{
option.addEventListener("click",()=>{
if(option.id==="left"){
    rotate-=90;
}

else if(option.id==="right"){
    rotate+=90;
}

else if(option.id==="up"){
    
    flipVertical=flipVertical===1?-1:1;
}

else {
    flipHorizontal=flipHorizontal===1?-1:1;
}

applyFilters();
})

});
const saveImg=()=>{
const canvas=document.createElement("canvas");
const ctx=canvas.getContext("2d");
canvas.width=previewImg.naturalWidth;
canvas.height=previewImg.naturalHeight;
ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
ctx.scale(flipHorizontal,flipVertical); 
ctx.translate(-canvas.width/2,-canvas.height/2);
if(rotate!=0){
    ctx.rotate(rotate*Math.PI/180);
}
ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
// document.body.appendChild(canvas);
const link = document.createElement("a");
link.download="image/jpg";
link.href=canvas.toDataURL();
link.click();
}

saveImgBtn.addEventListener("click",saveImg)
fileInput.addEventListener("change",loadImage);



chooseImgBtn.addEventListener("click",()=>{
    fileInput.click();
});


const resetFilter=()=>{
 brightness=100;saturation=100;inversion=0;grayscale=0;rotate=0;flipHorizontal=1;flipVertical=1;
 filterOptions[0].click();// matlab agar me reset btn click kru to brightness by default select ho jjye or uski value default wli hogi
 applyFilters();
}
filterSlider.addEventListener("input",updateValue);
resetBtn.addEventListener("click",resetFilter);

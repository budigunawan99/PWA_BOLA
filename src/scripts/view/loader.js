
const loader = (state) => {
      const loader = document.getElementById("overlay");
      if (state === true){
            loader.style.display = "block";
            document.body.style.overflow = "hidden";
      }else{
            loader.style.display = "none";
            document.body.style.overflow = "unset";
      }
}

export default loader;
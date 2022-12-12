const t=document.querySelector(".js-theme");"dark"==localStorage.getItem("theme")&&document.body.classList.add("shown"),t.addEventListener("click",(function(){document.body.classList.toggle("shown");let t="light";document.body.classList.contains("shown")&&(t="dark");localStorage.setItem("theme",t)}));
//# sourceMappingURL=index.3ac8dd27.js.map

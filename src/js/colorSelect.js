
function colorSelect(){
  const colors = [["#000000", "#444444", "#888888", "#bbbbbb", "#ffffff"],
                  ["#000000", "#444444", "#888888", "#bbbbbb", "#ffffff"],
                  ["#000000", "#444444", "#888888", "#bbbbbb", "#ffffff"],
                  ["#000000", "#444444", "#888888", "#bbbbbb", "#ffffff"],
                  ["#000000", "#444444", "#888888", "#bbbbbb", "#ffffff"]];
  const select = document.querySelector(".color__select .select__wrapper")
  for(let colorSet of colors){
    const fragment = new DocumentFragment();
    for(let color of colorSet){
      const li = document.createElement('li');
      li.style.backgroundColor = color;
      if(color === "#000000") li.classList.add('selected');
      fragment.append(li);
    }
    select.append(fragment);
  }

}

colorSelect()
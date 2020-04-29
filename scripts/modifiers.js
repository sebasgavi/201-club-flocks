function setModifiers() {
  const followMouse = document.querySelector('.modifiers__followmouse');
  const mouseMag = document.querySelector('.modifiers__mousemag');
  function update (){
    Bird.followMouse = followMouse.checked;
    Bird.mouseMag = parseFloat(mouseMag.value);
    
    // ocultar slider de mouseMag si no está siguiendo el mouse
    mouseMag.parentElement.style.display = followMouse.checked ? 'block' : 'none';
  }
  followMouse.addEventListener('input', update);
  mouseMag.addEventListener('input', update);
  update();
}
function setModifiers() {
  const followMouse = document.querySelector('.modifiers__followmouse');
  followMouse.addEventListener('input', function(ev){
    Bird.followMouse = followMouse.checked;
  });
}
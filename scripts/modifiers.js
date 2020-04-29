function setModifiers() {
  const inputs = document.querySelectorAll('.modifiers input');

  function update (){
    inputs.forEach(elem => {
      const prop = elem.getAttribute('data-prop');
      const val = elem.type === 'checkbox' ? elem.checked : parseFloat(elem.value);
      Bird[prop] = val;

      if(prop === 'mouseMag'){
        // ocultar slider de mouseMag si no está siguiendo el mouse
        elem.parentElement.style.display = Bird.followMouse ? 'block' : 'none';
      }
    });
  }
  inputs.forEach((elem) => elem.addEventListener('input', update));
  update();
}
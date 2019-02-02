const setCssClassToElement = (element, className) => element.className = className;

const setElementDisplayProperty = (element, display) => element.style.display = display;

const setElementValue = (element, value) => element.value = value;

const setElementInnerHTML = (element, text) => element.innerHTML = text;

const getNumber = value => value.replace(/\D/g, EMPTY_STRING);

const appendChildren = (parent, children) =>
  children.forEach(child => parent.appendChild(child));

const createView = (document, value, cssClass = EMPTY_STRING) => {
  const view = document.createElement('div');
  setElementInnerHTML(view, value);
  setCssClassToElement(view, cssClass);
  return view;
};
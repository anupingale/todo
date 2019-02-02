const setCssClassToElement = (element, className) => element.className = className;

const setElementDisplayProperty = (element, display) => element.style.display = display;

const setElementValue = (element, value) => element.value = value;

const setElementInnerHTML = (element, text) => element.innerHTML = text;

const getNumber = value => value.replace(/\D/g, EMPTY_STRING);

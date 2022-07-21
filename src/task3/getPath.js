export const getPath = (element) => {
  if (!element) {
    return;
  }
  const path = [];
  while (element.nodeType === 1/*Node.ELEMENT_NODE*/) {
    let selector = element.nodeName.toLowerCase();
    if(selector === 'html') {
      break;
    }
    if (element.id) {
      selector += `#${element.id}`;
      path.unshift(selector);
      break;
    } else if(element.className) {
      selector += `.${element.className}`;
    } else {
      let sib = element, nth = 1;
      while (sib = sib.previousElementSibling) {
        if (sib.nodeName.toLowerCase() == selector)
          nth++;
      }
      if (nth != 1)
        selector += ":nth-of-type("+nth+")";
    }
    path.unshift(selector);
    element = element.parentNode;
  }
  return path.join(" ");
};

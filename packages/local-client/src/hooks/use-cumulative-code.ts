import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (element) => {
        const root = document.querySelector("#root");
        if (typeof element === 'object') {
          if (element.$$typeof && element.props){
            _ReactDOM.render(element, root);
          } else {
            root.innerHTML = JSON.stringify(element);
          }
        } else {
          root.innerHTML = element;
        }
      }

      `;
    const showFuncNoop = "var show = () => {}";
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode.join("\n");
  });
};

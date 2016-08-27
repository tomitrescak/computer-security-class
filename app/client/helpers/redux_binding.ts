import update from 'react-addons-update';

function createSelector(mainSelectorText: string, selectorText: string) {
  // construct selector
  const selector = {};
  let selectorPart = selector;
  if (mainSelectorText) {
    mainSelectorText.split('.').forEach(elem => {
      let newPart = {};
      selectorPart[elem] = newPart;
      selectorPart = newPart;
    });
  }
  selectorText.split('.').forEach(elem => {
    let newPart = {};
    selectorPart[elem] = newPart;
    selectorPart = newPart;
  });

  return function (act: string, value: any) {
    selectorPart[act] = value;
    return selector;
  };
}

let timeout: number;
let lastSelector: string;

export function createBinder(store: Cs.IStore) {
  return function initBinder(actionName: string, mainSelectorText: string = null) {
    return function bind(selectorText: string, updateAction = 'set') {

      const selector = createSelector(mainSelectorText, selectorText);
      const currentSelector = JSON.stringify(selector);

      return function changed(e: any) {
        // we dispatch only if user finished typing
        if (timeout && currentSelector === lastSelector) {
          clearTimeout(timeout);
        }

        let value = e.currentTarget ? e.currentTarget['value'] : e;

        //timeout = setTimeout(() => {
          store.dispatch({
            type: actionName,
            selector,
            action: updateAction,
            value
          });
        //}, 300);
        lastSelector = currentSelector;
      };
    };
  };
}

export function bindingReducer<T>(actionName: string) {
  return function (state: T, action: any): T {
    if (action.type === actionName) {
      const act = '$' + (action.action ? action.action : 'set');
      const updateSelector = action.selector(act, action.value);

      return <T>update(state, updateSelector);
    }
    return null;
  };
}

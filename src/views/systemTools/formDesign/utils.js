export function traverseAllWidgets(widgetList, handler) {
  if (!widgetList) {
    return
  }

  widgetList.map(w => {
    handler(w)

    if (w.type === 'grid') {
      w.cols.map(col => {
        handler(col)
        traverseAllWidgets(col.widgetList, handler)
      })
    } else if (w.type === 'table') {
      w.rows.map(row => {
        row.cols.map(cell => {
          handler(cell)
          traverseAllWidgets(cell.widgetList, handler)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map(tab => {
        traverseAllWidgets(tab.widgetList, handler)
      })
    } else if (w.type === 'sub-form') {
      traverseAllWidgets(w.widgetList, handler)
    } else if (w.category === 'container') {  //自定义容器
      traverseAllWidgets(w.widgetList, handler)
    }
  })
}
export function traverseFieldWidgets(widgetList, handler, parent = null) {
  if (!widgetList) {
    return
  }

  widgetList.map(w => {
    if (w.formItemFlag) {
      handler(w, parent)
    } else if (w.type === 'grid') {
      w.cols.map(col => {
        traverseFieldWidgets(col.widgetList, handler, w)
      })
    } else if (w.type === 'table') {
      w.rows.map(row => {
        row.cols.map(cell => {
          traverseFieldWidgets(cell.widgetList, handler, w)
        })
      })
    } else if (w.type === 'tab') {
      w.tabs.map(tab => {
        traverseFieldWidgets(tab.widgetList, handler, w)
      })
    } else if (w.type === 'sub-form') {
      traverseFieldWidgets(w.widgetList, handler, w)
    } else if (w.category === 'container') {  //自定义容器
      traverseFieldWidgets(w.widgetList, handler, w)
    }
  })
}
export function getAllFieldWidgets(widgetList) {
  if (!widgetList) {
    return []
  }

  let result = []
  let handlerFn = (w) => {
    result.push({
      type: w.type,
      name: w.options.name,
      field: w
    })
  }
  traverseFieldWidgets(widgetList, handlerFn)

  return result
}

export function getQueryParam(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&")
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=")
    if (pair[0] == variable) {
      return pair[1]
    }
  }

  return undefined;
}

export const evalFn = function(fn, DSV = null, VFR = null) {
  let f = new Function('DSV', 'VFR', 'return ' + fn);
  return f(DSV, VFR);
};
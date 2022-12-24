export function getData(storageName){
    return JSON.parse(localStorage.getItem(storageName))
}

export function setData(storageName, item){
    localStorage.setItem(storageName, JSON.stringify(item));
}
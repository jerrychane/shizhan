// 添加 localStorage
window.localStorage.setItem('name','Rosen');
window.localStorage.setItem('aaa',JSON.stringify({name:"Rosen"}))
// 查看 localStorage
window.localStorage.getItem('name');
// 删除 localStorage
window.localStorage.removeItem('name')


// 添加 sessionStorage
window.sessionStorage.setItem('name','Rosen');
window.sessionStorage.setItem('aaa',JSON.stringify({name:"Rosen"}))
// 查看 sessionStorage
window.sessionStorage.getItem('name');
// 删除 sessionStorage
window.sessionStorage.removeItem('name')
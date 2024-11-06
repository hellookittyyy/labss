function myFunction(cat_name) {
  window.location.href = "index.html?cats=" + cat_name;
}

window.onload = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('cats')
  console.log(id);
  document.getElementById(id).style.display = 'flex';
  document.getElementById('main').style.display = 'none';
}


function openDir(el) {
  console.log(el);
  let parent = el.parentElement;
  let parentImage = parent.children[0];
  let childFolder = parent.children[2];
  if (childFolder.classList.contains("open")) {
    childFolder.classList.remove("open");

    parentImage.src = "images/folder.png";
  } else {
    childFolder.classList.add("open");
    parentImage.src = "images/folder-open.png";
  }
}

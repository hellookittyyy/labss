let appliedFilters = [];

function toggleFilter(elem, filter) {
  if (appliedFilters.includes(filter)) {
    appliedFilters = appliedFilters.filter((f) => f !== filter);
  } else {
    appliedFilters.push(filter);
  }

  elem.classList.toggle("active");

  console.log(appliedFilters);

  updateView();
}

function updateView() {
  const cats = document.querySelectorAll(".cat_card");
  cats.forEach((cat) => {
    const tags = cat.querySelectorAll("#cat_tags li");
    cat.style.display = "flex";

    if (appliedFilters.length > 0) {
      if (appliedFilters.length > tags.length) {
        cat.style.display = "none";
      } else {
        let allTagsExist = true;
        appliedFilters.forEach((filter) => {
          let tagExists = false;
          tags.forEach((tag) => {
            if (tag.id === filter) {
              tagExists = true;
            }
          });

          if (!tagExists) {
            allTagsExist = false;
          }
        });

        if (!allTagsExist) {
          cat.style.display = "none";
        }
      }
    }
  });
}

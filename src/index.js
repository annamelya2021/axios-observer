console.log("hello");
import axios from "axios";
console.log(axios);

const catsList = document.querySelector(".cat-render");
// const loadMoreBtn = document.querySelector(".load-more");
const guard = document.querySelector(".guard-js");

let ObserverOptions = {
  root: null,
  rootMargin: "300px",
  threshold: 1.0,
};

let observer = new IntersectionObserver(observerFunction, ObserverOptions);

// loadMoreBtn.addEventListener("click", onLoadMore);

let page = 0;

const options = {
  headers: {
    "x-api-key":
      "live_hkYgfmNgMkVmHUnMlbV5phJMNi7SqRgbE2DrcIRCaYlrfECmIXgyAvuCm7SPkvML",
  },
};
// fetch("https://api.thecatapi.com/v1/images/search?limit=10", options)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Not OK");
//     }
//     return response.json();
//   })
//   .then((data) => console.log(data));s
async function getImages(page = 0) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=10&order=Asc&page=${page}`,
      options
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
// loadMoreBtn.removeAttribute("hidden");
// loadMoreBtn.removeAttribute("hidden");
getImages().then((response) =>
  catRender(
    response.data,
    observer.observe(guard)
    // loadMoreBtn.removeAttribute("hidden")
  )
);

function catRender(catArray) {
  const catMarkup = catArray
    .map(
      (cat) => `<li>
       <img src="${cat.url}" alt="${cat.categories.name}" width='300px'>
      </li>`
    )
    .join("");
  catsList.insertAdjacentHTML("beforeend", catMarkup);
}

// function onLoadMore() {
//   page += 1;
//   getImages(page).then((response) => {
//     catRender(response.data);
//     const pages = countPages(
//       Number(response.headers["pagination-count"]),
//       Number(response.headers["pagination-limit"])
//     );

//     // console.log(typeof response.headers.pagination - page);
//     if (Number(pages=== page)) {
//       loadMoreBtn.hidden = true;
//       // console.log(object);
//     }
//   });
// }

function countPages(total, limit) {
  return Math.ceil(total / limit);
}
function observerFunction(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      page += 1;
      getImages(page).then((response) => {
        catRender(response.data);
        const pages = countPages(
          Number(response.headers["pagination-count"]),
          Number(response.headers["pagination-limit"])
        );

        if (Number(pages === page)) {
          observer.unobserve(guard);
        }
      });
    }
  });
}

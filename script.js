const products = [
  {
    name: "Carved French Provincial Table",
    category: "Furniture",
    price: 1850,
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=900&q=80",
    desc: "A beautifully carved French Provincial table with a warm aged patina. An elegant statement piece for a dining room or entry."
  },

  {
    name: "19th Century Landscape",
    category: "Art",
    price: 2400,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
    desc: "Atmospheric landscape painting presented in a period-style frame."
  },

  {
    name: "Art Deco Gold Bracelet",
    category: "Jewelry",
    price: 3200,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    desc: "Elegant Art Deco-inspired gold bracelet with timeless geometric detailing."
  },

  {
    name: "Hand-Painted Porcelain Vase",
    category: "Ceramics",
    price: 875,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
    desc: "Decorative porcelain vase with hand-painted botanical details."
  },

  {
    name: "French Mantel Clock",
    category: "Clocks",
    price: 1450,
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=80",
    desc: "Classic mantel clock with a beautifully aged case and traditional dial."
  },

  {
    name: "Bronze Equestrian Figure",
    category: "Collectibles",
    price: 2100,
    image: "https://images.unsplash.com/photo-1561214115-7c1d8d5c1f7b?auto=format&fit=crop&w=900&q=80",
    desc: "Decorative bronze equestrian figure with rich surface detail."
  },

  {
    name: "Walnut Writing Desk",
    category: "Furniture",
    price: 2750,
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
    desc: "Characterful walnut writing desk with a classic silhouette."
  },

  {
    name: "Vintage Botanical Print",
    category: "Art",
    price: 650,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=80",
    desc: "Delicate botanical study with a softly aged presentation."
  }
];


let favorites =
  JSON.parse(localStorage.getItem("favorites") || "[]");


const grid = document.getElementById("productGrid");

const filter =
  document.getElementById("categoryFilter");

const sort =
  document.getElementById("sort");



/* =========================
   FORMAT MONEY
========================= */

function money(number) {

  return "$" + number.toLocaleString("en-US");

}



/* =========================
   DISPLAY PRODUCTS
========================= */

function render() {

  let arr = products.filter(product => {

    return (
      filter.value === "All" ||
      product.category === filter.value
    );

  });


  if (sort.value === "low") {

    arr.sort((a, b) => {
      return a.price - b.price;
    });

  }


  if (sort.value === "high") {

    arr.sort((a, b) => {
      return b.price - a.price;
    });

  }


  grid.innerHTML = arr.map(product => {

    const index =
      products.indexOf(product);

    const isFavorite =
      favorites.includes(index);


    return `

      <article
        class="product-card"
        data-index="${index}"
      >

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

          <button
            class="heart"
            data-fav="${index}"
          >
            ${isFavorite ? "♥" : "♡"}
          </button>

        </div>


        <div class="product-info">

          <div class="category">
            ${product.category}
          </div>

          <h3>
            ${product.name}
          </h3>

          <div class="price">
            ${money(product.price)}
          </div>

        </div>

      </article>

    `;

  }).join("");


  /* PRODUCT CLICK */

  document
    .querySelectorAll(".product-card")
    .forEach(card => {

      card.addEventListener("click", event => {

        if (
          event.target.closest(".heart")
        ) {
          return;
        }


        const product =
          products[card.dataset.index];


        openProduct(product);

      });

    });



  /* FAVORITE BUTTONS */

  document
    .querySelectorAll("[data-fav]")
    .forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();

          toggleFav(
            Number(button.dataset.fav)
          );

        }
      );

    });


  document.getElementById("favCount")
    .textContent = favorites.length;

}



/* =========================
   FAVORITES
========================= */

function toggleFav(index) {

  if (favorites.includes(index)) {

    favorites =
      favorites.filter(
        item => item !== index
      );

    toast(
      "Removed from favorites"
    );

  } else {

    favorites.push(index);

    toast(
      "Saved to favorites ❤️"
    );

  }


  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );


  render();

}



/* =========================
   PRODUCT DETAILS
========================= */

function openProduct(product) {

  const modal =
    document.getElementById("modal");


  modal.classList.remove("hidden");


  document.getElementById(
    "modalContent"
  ).innerHTML = `

    <img
      src="${product.image}"
      style="
        width:100%;
        max-height:390px;
        object-fit:cover;
      "
    >


    <p
      class="eyebrow"
      style="margin-top:25px"
    >
      ${product.category}
    </p>


    <h2>
      ${product.name}
    </h2>


    <h3
      style="font:16px Arial"
    >
      ${money(product.price)}
    </h3>


    <p>
      ${product.desc}
    </p>


    <button
      class="btn"
      onclick="inquire('${product.name.replace(/'/g, "\\'")}')"
    >
      Contact Dealer
    </button>

  `;

}



/* =========================
   DEALER INQUIRY
========================= */

function inquire(name) {

  document.getElementById(
    "modalContent"
  ).innerHTML = `

    <p class="eyebrow">
      INQUIRY
    </p>


    <h2>
      Ask about this object
    </h2>


    <p>
      Send a message to the dealer about
      <b>${name}</b>.
    </p>


    <input
      id="inqName"
      placeholder="Your name"
    >


    <input
      id="inqEmail"
      type="email"
      placeholder="Email address"
    >


    <textarea
      id="inqMsg"
      rows="5"
      placeholder="Your message"
    ></textarea>


    <button
      class="btn"
      onclick="sendInquiry()"
    >
      Send Inquiry
    </button>

  `;

}



/* =========================
   SEND INQUIRY
========================= */

function sendInquiry() {

  document
    .getElementById("modal")
    .classList.add("hidden");


  toast(
    "Your inquiry has been prepared."
  );

}



/* =========================
   TOAST MESSAGE
========================= */

function toast(message) {

  const toastBox =
    document.getElementById("toast");


  toastBox.textContent =
    message;


  toastBox.classList.add("show");


  setTimeout(() => {

    toastBox.classList.remove(
      "show"
    );

  }, 2200);

}



/* =========================
   CATEGORY FILTER
========================= */

filter.addEventListener(
  "change",
  render
);



/* =========================
   SORTING
========================= */

sort.addEventListener(
  "change",
  render
);



/* =========================
   CATEGORY BUTTONS
========================= */

document
  .querySelectorAll(
    ".category-grid button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filter.value =
          button.dataset.category;


        document
          .getElementById("shop")
          .scrollIntoView();


        render();

      }
    );

  });



/* =========================
   CLOSE MODAL
========================= */

document
  .getElementById("closeModal")
  .onclick = () => {

    document
      .getElementById("modal")
      .classList.add("hidden");

  };



/* =========================
   SEARCH
========================= */

document
  .getElementById("searchBtn")
  .onclick = () => {

    const query =
      prompt(
        "What are you looking for?"
      );


    if (!query) {
      return;
    }


    const found =
      products.filter(product => {

        const text =
          (
            product.name +
            " " +
            product.category +
            " " +
            product.desc
          ).toLowerCase();


        return text.includes(
          query.toLowerCase()
        );

      });


    if (!found.length) {

      grid.innerHTML = `
        <p>
          No objects found for
          “${query}”.
        </p>
      `;

    } else {

      grid.innerHTML =
        found.map(product => {

          return `

            <article
              class="product-card"
              onclick='openProduct(
                ${JSON.stringify(product)}
              )'
            >

              <div class="product-image">

                <img
                  src="${product.image}"
                  alt="${product.name}"
                >

              </div>


              <div class="product-info">

                <div class="category">
                  ${product.category}
                </div>

                <h3>
                  ${product.name}
                </h3>

                <div class="price">
                  ${money(product.price)}
                </div>

              </div>

            </article>

          `;

        }).join("");

    }


    document
      .getElementById("shop")
      .scrollIntoView();

  };



/* =========================
   FAVORITES PAGE
========================= */

document
  .getElementById("favoritesBtn")
  .onclick = () => {

    const favoriteProducts =
      products.filter(
        (_, index) =>
          favorites.includes(index)
      );


    if (!favoriteProducts.length) {

      toast(
        "Your favorites are empty"
      );

      return;

    }


    grid.innerHTML =
      favoriteProducts.map(
        product => {

          return `

            <article
              class="product-card"
              onclick='openProduct(
                ${JSON.stringify(product)}
              )'
            >

              <div class="product-image">

                <img
                  src="${product.image}"
                  alt="${product.name}"
                >

              </div>


              <div class="product-info">

                <div class="category">
                  ${product.category}
                </div>

                <h3>
                  ${product.name}
                </h3>

                <div class="price">
                  ${money(product.price)}
                </div>

              </div>

            </article>

          `;

        }
      ).join("");


    document
      .getElementById("shop")
      .scrollIntoView();

  };



/* =========================
   ACCOUNT
========================= */

document
  .getElementById("accountBtn")
  .onclick = () => {

    const modal =
      document.getElementById("modal");


    modal.classList.remove(
      "hidden"
    );


    document.getElementById(
      "modalContent"
    ).innerHTML = `

      <p class="eyebrow">
        YOUR ACCOUNT
      </p>


      <h2>
        Sign in
      </h2>


      <p>
        This area will connect to
        Firebase Authentication.
      </p>


      <input
        placeholder="Email address"
      >


      <input
        type="password"
        placeholder="Password"
      >


      <button
        class="btn"
        onclick="toast(
          'Firebase Authentication will handle sign-in here.'
        )"
      >
        Sign In
      </button>

    `;

  };



/* =========================
   DEALER REGISTRATION
========================= */

document
  .getElementById("dealerBtn")
  .onclick = () => {

    const modal =
      document.getElementById("modal");


    modal.classList.remove(
      "hidden"
    );


    document.getElementById(
      "modalContent"
    ).innerHTML = `

      <p class="eyebrow">
        JOIN THE MARKETPLACE
      </p>


      <h2>
        Become a Dealer
      </h2>


      <p>
        Create a dealer profile and
        list your antiques for collectors
        to discover.
      </p>


      <input
        placeholder="Business / dealer name"
      >


      <input
        placeholder="Email address"
      >


      <textarea
        rows="4"
        placeholder="Tell us about your collection"
      ></textarea>


      <button
        class="btn"
        onclick="sendInquiry()"
      >
        Apply to become a dealer
      </button>

    `;

  };



/* =========================
   NEWSLETTER
========================= */

document
  .getElementById("newsletter")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      toast(
        "Thank you for joining our newsletter."
      );


      event.target.reset();

    }
  );



/* =========================
   START WEBSITE
========================= */

render();

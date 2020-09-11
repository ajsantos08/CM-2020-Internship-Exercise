import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;

/*
- In `index.js`, loop over `menuItems` and categorize them into sections based on each items assigned `type`
- Sort the items in each category by their `menuOrder`
*/

const categorizedItems = menuItems.reduce((categorized, currentItem) => {
  //check if there is an array present for current menu item type, else create an empty array for current menu item type
  categorized[currentItem.type] = categorized[currentItem.type] || [];
  //push current menu item into array
  categorized[currentItem.type].push(currentItem);
  //return current result
  return categorized;
}, {}); //empty initial object

//sort items in each category by menuOrder
Object.values(categorizedItems).forEach((category) =>
  category.sort((a, b) => a.menuOrder - b.menuOrder)
);

/*
- Render the sorted results into the appropriate container with `index.html`
- Format any prices. For example, 8.5 becomes \$8.50
- Render the "spicy" icon next to any menu items where `spicy` is `true`
*/

//create menu item element

const createMenuItemElement = ({ name, price, description, spicy }) => {
  //create div for item
  const menuItem = document.createElement("div");
  menuItem.setAttribute("id", name);

  //create all DOM nodes
  const itemName = document.createElement("h4");
  const menuItemName = document.createTextNode(name);
  const itemPrice = document.createElement("h4");
  const menuItemPrice = document.createTextNode("$" + price.toFixed(2)); //format to 2 decimal points  8.0 -> 8.00
  const itemDescription = document.createElement("h5");
  const descriptionText = document.createTextNode(description);

  //add spicy class if menu item is spicy
  if (spicy) {
    menuItem.classList.add("disclaimer", "spicy");
  }
  //add classes
  itemName.classList.add("item-name");
  itemPrice.classList.add("item-price");
  itemDescription.classList.add("item-description");
  menuItem.classList.add("menu-item");

  //append all DOM nodes
  itemName.appendChild(menuItemName);
  menuItem.appendChild(itemName);
  itemPrice.appendChild(menuItemPrice);
  menuItem.appendChild(itemPrice);
  itemDescription.appendChild(descriptionText);
  menuItem.appendChild(itemDescription);

  return menuItem;
};

//Go through each category
Object.keys(categorizedItems).forEach((category) =>
  //Go through each item in category
  categorizedItems[category].forEach((item) =>
    //render formatted item in DOM
    document.getElementById(category).appendChild(createMenuItemElement(item))
  )
);

//filter spicy menu items from rendering
const filterMenuItems = (e) => {
  const spicyItems = Array.from(
    document.getElementsByClassName("spicy menu-item")
  );

  //toggle visibility of items
  spicyItems.forEach((item) => {
    if (item.style.display === "none") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

//add eventlistener to checkbox
const spicyCheckbox = document.getElementById("spicy-checkbox");
spicyCheckbox.addEventListener("change", filterMenuItems);

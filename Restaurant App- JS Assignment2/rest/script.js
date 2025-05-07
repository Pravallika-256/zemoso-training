function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

const menu = [
    { name: 'Chicken Biryani',       course: 'Main Course', price: 200 },
    { name: 'Veg Biryani',           course: 'Main Course', price: 180 },
    { name: 'Mutton Biryani',        course: 'Main Course', price: 250 },
    { name: 'Paneer Butter Masala',  course: 'Main Course', price: 150 },
    { name: 'Gulab Jamun',           course: 'Dessert', price: 60 },
    { name: 'Rasgulla',              course: 'Dessert', price: 55 },
    { name: 'Cheesecake',            course: 'Dessert', price: 120 },
    { name: 'Paneer Tikka',          course: 'Entree', price: 150 },
    { name: 'Chicken Tikka',         course: 'Entree', price: 170 },
    { name: 'Veg Spring Roll',       course: 'Appetizer', price: 90 },
    { name: 'Chicken Wings',         course: 'Appetizer', price: 130 },
    { name: 'French Fries',          course: 'Side', price: 70 },
    { name: 'Coke',                  course: 'Beverage', price: 40 },
    { name: 'Cold Coffee',           course: 'Beverage', price: 60 },
    { name: 'Lassi',                 course: 'Beverage', price: 50 }
  ];

  const tables = [
    { id: 'Table 1', orders: {} },
    { id: 'Table 2', orders: {} },
    { id: 'Table 3', orders: {} }
  ];
  
  let currentTableIndex = null;

  function renderTables() {
    const tableSearchVal = document.getElementById("tableSearch").value.toLowerCase();
    const tableList = document.getElementById("tableList");
    tableList.innerHTML = "";
  
    tables
      .filter(table => table.id.toLowerCase().includes(tableSearchVal))
      .forEach((table, i) => {
        const div = document.createElement("div");
        div.className = "table-card";
    
        const itemCount = Object.values(table.orders).reduce((acc, item) => acc + item.qty, 0);
        const totalCost = Object.values(table.orders).reduce((acc, item) => acc + (item.qty * item.price), 0);
  
        div.innerHTML = `
          <strong>${table.id}</strong><br/>
          Items: ${itemCount}, Total: ₹${totalCost}
        `;
        div.ondragover = e => e.preventDefault();
        div.ondrop = e => handleDrop(e, i);
        
        div.onclick = () => openModal(i);
  
        tableList.appendChild(div);
      });
  }
  
  function renderMenu() {
    const menuSearchVal = document.getElementById("menuSearchInput").value.toLowerCase();
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";
  
    menu
      .filter(item => {
        const nameMatch = item.name.toLowerCase().includes(menuSearchVal);
        const courseMatch = item.course.toLowerCase().includes(menuSearchVal);
        return nameMatch || courseMatch;
      })
      .forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "menu-item";
        div.textContent = `${item.name} - ₹${item.price}`;
        div.draggable = true;
        div.ondragstart = e => {
          e.dataTransfer.setData("text/plain", index);
        };
        menuList.appendChild(div);
      });
  }
  
  function handleDrop(e, tableIndex) {
    e.preventDefault();
    const menuIndex = e.dataTransfer.getData("text/plain");
    const item = menu[menuIndex];
    const orders = tables[tableIndex].orders;
  
    if (!orders[item.name]) {
      orders[item.name] = { qty: 1, price: item.price };
    } else {
      orders[item.name].qty += 1;
    }
  
    renderTables();
  }
  
  function openModal(tableIndex) {
    currentTableIndex = tableIndex;
    document.getElementById("orderModal").style.display = "block";
  
    document.getElementById("modalTableTitle").textContent =
      `${tables[tableIndex].id} Order Details`;
  
    renderOrderDetails();
  }
  
  function closeModal() {
    document.getElementById("orderModal").style.display = "none";
  }
  
  function renderOrderDetails() {
    const orderTable = document.getElementById("orderDetails");
    const orderTotal = document.getElementById("orderTotal");
    const orders = tables[currentTableIndex].orders;
  
    let total = 0;
    orderTable.innerHTML = `
      <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Servings</th>
        <th>Subtotal</th>
        <th>Action</th>
      </tr>
    `;
    
    for (const itemName in orders) {
      const { qty, price } = orders[itemName];
      const subTotal = qty * price;
      total += subTotal;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${itemName}</td>
        <td>₹${price}</td>
        <td>
          <input
            type="number"
            class="number-input"
            min="1"
            value="${qty}"
            onchange="updateQty('${itemName}', this.value)"
          />
        </td>
        <td>₹${subTotal}</td>
        <td>
        <i class="fas fa-trash delete-icon" onclick="removeItem('${itemName}')"></i>
         </td>

       
      `;
      orderTable.appendChild(row);
    }
  
    orderTotal.textContent = `Total: ₹${total}`;
  }
  
  /* Update Quantity for an Item in the Table's Orders */
  function updateQty(itemName, value) {
    tables[currentTableIndex].orders[itemName].qty = parseInt(value);
    renderOrderDetails();
    renderTables();
  }
  
  /* Remove an Item from the Table's Orders */
  function removeItem(itemName) {
    delete tables[currentTableIndex].orders[itemName];
    renderOrderDetails();
    renderTables();
  }
  
  /* Generate Bill: Show breakdown in an alert, then clear the table */
  function generateBill() {
    const orders = tables[currentTableIndex].orders;
    if (Object.keys(orders).length === 0) {
      alert("No items in this order.");
      return;
    }
  
    let billMsg = `${tables[currentTableIndex].id} Final Bill:\n\n`;
    let total = 0;
  
    for (const itemName in orders) {
      const { qty, price } = orders[itemName];
      const cost = qty * price;
      total += cost;
      billMsg += `${itemName} x ${qty} = ₹${cost}\n`;
    }
  
    billMsg += `\nTotal: ₹${total}`;
    alert(billMsg);
  
    // Clear the orders after user sees the bill
    tables[currentTableIndex].orders = {};
    renderTables();
    closeModal();
  }

  const debouncedRenderTables = debounce(renderTables, 300);
const debouncedRenderMenu = debounce(renderMenu, 300);
  
  /* Clear the Table's Order (Close Session) */
  function clearOrder() {
    tables[currentTableIndex].orders = {};
    renderTables();
    closeModal();
  }
  
  /* Initial Setup */
  document.getElementById("tableSearch").oninput = renderTables;
  document.getElementById("menuSearchInput").oninput = renderMenu;

  
  /* Render on Page Load */
  renderTables();
  renderMenu();
  
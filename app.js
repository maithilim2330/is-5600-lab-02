document.addEventListener('DOMContentLoaded', () => {
    // Parse the JSON data
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Initialize the dashboard
    generateUserList(userData, stocksData);
  
    // Register event listeners for Save and Delete buttons
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
  
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
  
      // Update user data based on form values
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          userData[i].user.firstname = document.querySelector('#firstname').value;
          userData[i].user.lastname = document.querySelector('#lastname').value;
          userData[i].user.address = document.querySelector('#address').value;
          userData[i].user.city = document.querySelector('#city').value;
          userData[i].user.email = document.querySelector('#email').value;
  
          // Rerender user list
          generateUserList(userData, stocksData);
          break;
        }
      }
    });
  
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
  
      // Find and remove the user from the data
      const userIndex = userData.findIndex(user => user.id == userId);
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
  
        // Rerender user list
        generateUserList(userData, stocksData);
  
        // Clear form and portfolio
        clearForm();
        clearPortfolio();
      }
    });
  });
  
  /**
   * Generates the list of users and sets up event listeners for user selection
   * @param {Array} users - The array of user objects
   * @param {Array} stocks - The array of stock objects
   */
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear previous list
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Attach click event listener to the user list
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  /**
   * Handles user list item click and updates the form and portfolio
   * @param {Event} event - The click event
   * @param {Array} users - The array of user objects
   * @param {Array} stocks - The array of stock objects
   */
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
  
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  }
  
  /**
   * Populates the user form with data
   * @param {Object} data - The user data object
   */
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  /**
   * Renders the portfolio items for a user
   * @param {Object} user - The user data object
   * @param {Array} stocks - The array of stock objects
   */
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous portfolio
  
    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
  
      symbolEl.innerText = `Stock: ${symbol}`;
      sharesEl.innerText = `Shares Owned: ${owned}`;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Attach click event listener to the portfolio list
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  /**
   * Displays stock details when a stock is selected
   * @param {String} symbol - The stock symbol
   * @param {Array} stocks - The array of stock objects
   */
  function viewStock(symbol, stocks) {
    const stock = stocks.find(stock => stock.symbol == symbol);
    const stockArea = document.querySelector('.stock-form');
  
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
  
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
      stockArea.style.display = 'block'; // Make the stock area visible
    }
  }
  
  /**
   * Clears the user form
   */
  function clearForm() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
  }
  
  /**
   * Clears the portfolio list
   */
  function clearPortfolio() {
    document.querySelector('.portfolio-list').innerHTML = '';
  }
  
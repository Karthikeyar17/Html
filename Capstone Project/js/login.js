const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  fetch('../js/users.json')
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        // Store the user data in session storage
        sessionStorage.setItem('user', JSON.stringify(user));
        
        // Redirect the user to the home page
        window.location.href = './home2.html';
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => {
      console.error('Error fetching user data', error);
      alert('An error occurred while fetching user data');
    });
});

// Update navigation bar based on user role
const updateNavBar = (user) => {
  const navBar = document.querySelector('header nav');
  
  if (user.role === 'admin') {
    navBar.innerHTML = `
      <a href="./home.html">Home</a> |
      <a href="#">Reports</a> |
      <a href="#" id="logout">Logout | </a>
      <a href="mailto:contact@automob.co.in">contact@automob.co.in &#9993;</a> |
      <a>999-999-9999 &#9743;</a>
    `;
  } else {
    navBar.innerHTML = `
      <a href="./home.html">Home</a> |
      <a href="./services.html">Services</a> |
      <a href="./booking.html">Booking</a> |
      <a href="#" id="logout">Logout | </a>
      <a href="mailto:contact@automob.co.in">contact@automob.co.in &#9993;</a> |
      <a>999-999-9999 &#9743;</a>
    `;
  }
  
};

// Check if user is logged in and update navigation bar
const user = JSON.parse(sessionStorage.getItem('user'));

if (user) {
  updateNavBar(user);
}

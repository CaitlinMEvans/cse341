document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  
    // Add confirmation for delete actions
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
          e.preventDefault();
        }
      });
    });
  
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
      setTimeout(() => {
        const closeButton = alert.querySelector('.btn-close');
        if (closeButton) {
          closeButton.click();
        }
      }, 5000);
    });
  
    // Check authentication status for dashboard page
    const dashboardContainer = document.getElementById('dashboard-container');
    if (dashboardContainer) {
      loadDashboardData();
    }
  
    // Load pet list for dashboard
    const petsList = document.getElementById('pets-list');
    if (petsList) {
      loadPetsList();
    }
  });
  
  // Function to load dashboard data
  function loadDashboardData() {
    fetch('/auth/user')
      .then(response => {
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          displayUserInfo(data.user);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        window.location.href = '/login.html';
      });
  }
  
  // Function to display user info in the dashboard
  function displayUserInfo(user) {
    const userInfoContainer = document.getElementById('user-info');
    if (userInfoContainer) {
      userInfoContainer.innerHTML = `
        <h4>Welcome, ${user.name}!</h4>
        <p class="mb-0"><strong>Email:</strong> ${user.email}</p>
        <p class="mb-0"><strong>User ID:</strong> ${user.id}</p>
        <p class="mb-0"><strong>Account Type:</strong> ${user.role === 'superuser' ? 'Administrator' : 'User'}</p>
        <p class="mb-0 mt-2 small">Use your User ID when authorizing API calls in Swagger UI</p>
      `;
    }
  }
  
  // Function to load pets list
  function loadPetsList() {
    fetch('/api/pets')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          displayPetsList(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
        document.getElementById('pets-list').innerHTML = `
          <div class="alert alert-danger">Failed to load pets information.</div>
        `;
      });
  }
  
  // Function to display pets list
  function displayPetsList(pets) {
    const petsListContainer = document.getElementById('pets-list');
    
    if (!petsListContainer) return;
    
    if (pets.length === 0) {
      petsListContainer.innerHTML = `
        <div class="alert alert-info">You don't have any pets yet.</div>
        <p>Use the Pet Management API to add your first pet!</p>
      `;
      return;
    }
  
    let petsHtml = '<div class="row">';
    
    pets.forEach(pet => {
      // Format birth date if available
      const birthDate = pet.birthDate ? new Date(pet.birthDate).toLocaleDateString() : 'Unknown';
      
      petsHtml += `
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${pet.name}</h5>
              <p class="card-text">
                <strong>Species:</strong> ${pet.species}<br>
                <strong>Breed:</strong> ${pet.breed || 'Unknown'}<br>
                <strong>Birth Date:</strong> ${birthDate}<br>
              </p>
              <p class="card-text text-muted small">${pet.notes || ''}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <a href="/api-docs/#/Pets/get_api_pets__id_" class="btn btn-sm btn-outline-primary" target="_blank">View Details</a>
            </div>
          </div>
        </div>
      `;
    });
    
    petsHtml += '</div>';
    petsListContainer.innerHTML = petsHtml;
  }
  
  // Function to handle logout
  function handleLogout() {
    window.location.href = '/auth/logout';
  }
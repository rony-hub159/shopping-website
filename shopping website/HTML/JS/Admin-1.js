document.addEventListener('DOMContentLoaded', function() {
    // Update time for "Recent Activity"
    function updateTimes() {
        const now = new Date();
        const activities = document.querySelectorAll('.dashboard-card li');
        activities.forEach(activity => {
            // Add timestamp data attribute to each activity in your HTML
            const timestamp = activity.getAttribute('data-timestamp');
            if (timestamp) {
                const activityTime = new Date(timestamp);
                const timeDiff = now - activityTime;
                const minutes = Math.floor(timeDiff / 60000);
                const hours = Math.floor(minutes / 60);

                if (minutes < 60) {
                    activity.textContent = activity.textContent.replace(/- .*$/, `- ${minutes} minutes ago`);
                } else {
                    activity.textContent = activity.textContent.replace(/- .*$/, `- ${hours} hours ago`);
                }
            }
        });
    }

    // Update active users count randomly
    function updateActiveUsers() {
        const activeUsers = Math.floor(Math.random() * 100) + 30;
        document.getElementById('active-sessions').textContent = `Active Sessions: ${activeUsers}`;
    }

    // Add logout functionality
    document.querySelector('a[href="#logout"]').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Add your logout logic here
            window.location.href = 'login.html';
        }
    });

    // Add navigation handling
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            console.log(`Navigating to ${section}`);
            // Add your navigation logic here
        });
    });

    // Initialize
    updateTimes();
    updateActiveUsers();

    // Update active users every 30 seconds
    setInterval(updateActiveUsers, 30000);
    // Update times every minute
    setInterval(updateTimes, 60000);
});

// Add system status monitoring
function updateSystemStatus() {
    const statuses = {
        server: Math.random() > 0.1,
        database: Math.random() > 0.1
    };

    const serverStatus = document.getElementById('server-status');
    const dbStatus = document.getElementById('db-status');

    serverStatus.innerHTML = `Server Status: ${statuses.server ? '<span class="status-indicator status-online"></span>Online' : '<span class="status-indicator status-offline"></span>Offline'}`;
    dbStatus.innerHTML = `Database Status: ${statuses.database ? '<span class="status-indicator status-online"></span>Connected' : '<span class="status-indicator status-offline"></span>Disconnected'}`;
}
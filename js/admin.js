/**
 * IRONFORGE FITNESS - Admin Dashboard JavaScript (Step 2)
 * Live SQLite Database Integration & Real-time SaaS Management
 */

// Global state cache for client-side search & filtering
const adminState = {
  currentView: 'dashboard',
  stats: null,
  leads: [],
  memberships: [],
  messages: [],
  recentActivity: []
};

document.addEventListener('DOMContentLoaded', async () => {
  // Step 3: Verify Admin Session first
  const isAuthenticated = await checkAdminSession();
  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return;
  }

  initAdminSidebar();
  initAdminNavigation();
  initSearchFilters();
  initRefreshButton();
  
  // Load initial live data
  loadAllAdminData();
});

/**
 * Step 3: Session Check
 */
async function checkAdminSession() {
  try {
    const res = await fetch('/api/admin/session');
    if (!res.ok) return false;
    const data = await res.json();
    if (data.success && data.authenticated) {
      if (data.admin && data.admin.email) {
        const nameEl = document.querySelector('.admin-user-name');
        const avatarEl = document.querySelector('.admin-avatar');
        if (nameEl) nameEl.textContent = data.admin.email;
        if (avatarEl) avatarEl.textContent = data.admin.email.charAt(0).toUpperCase();
      }
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

/**
 * Utility: HTML Escape helper
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Utility: Date Formatter
 */
function formatDate(isoStr) {
  if (!isoStr) return '--';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return escapeHtml(isoStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return escapeHtml(isoStr);
  }
}

/**
 * 1. Mobile Sidebar & Backdrop Toggle
 */
function initAdminSidebar() {
  const toggleBtn = document.getElementById('admin-mobile-toggle-btn');
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('admin-backdrop');

  if (!toggleBtn || !sidebar || !backdrop) return;

  const openSidebar = () => {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  backdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sidebar.classList.contains('is-open')) {
      closeSidebar();
    }
  }, { passive: true });
}

/**
 * 2. Navigation Switcher
 */
function initAdminNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  const logoutBtn = document.getElementById('admin-logout-btn');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetView = item.getAttribute('data-view');
      if (!targetView) return;

      switchView(targetView);

      // Close mobile drawer if open
      const sidebar = document.getElementById('admin-sidebar');
      const backdrop = document.getElementById('admin-backdrop');
      if (sidebar && sidebar.classList.contains('is-open')) {
        sidebar.classList.remove('is-open');
        backdrop.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm('Are you sure you want to log out of IRONFORGE Admin?')) {
        try {
          await fetch('/api/admin/logout', { method: 'POST' });
        } catch (e) {}
        window.location.href = '/admin/login';
      }
    });
  }
}

function switchView(viewName) {
  adminState.currentView = viewName;

  // Update Nav Items
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    if (btn.getAttribute('data-view') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update View Panels
  document.querySelectorAll('.admin-view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const activePanel = document.getElementById(`view-${viewName}`);
  if (activePanel) {
    activePanel.classList.add('active');
  }

  // Update Header Titles
  const titleMap = {
    dashboard: { title: 'Dashboard', sub: 'IRONFORGE FITNESS Management' },
    leads: { title: 'Free Trial Leads', sub: 'Active 7-Day Pass Registrations' },
    memberships: { title: 'Membership Enrollments', sub: 'Live Membership Applications' },
    messages: { title: 'Contact Messages', sub: 'Inbound Customer Inquiries' },
    settings: { title: 'Settings', sub: 'System & Gym Configuration' }
  };

  const header = titleMap[viewName] || titleMap.dashboard;
  const titleEl = document.getElementById('page-header-title');
  const subEl = document.getElementById('page-header-sub');
  if (titleEl) titleEl.textContent = header.title;
  if (subEl) subEl.textContent = header.sub;
}

/**
 * 3. Search & Filter Handlers
 */
function initSearchFilters() {
  const searchLeads = document.getElementById('search-leads');
  if (searchLeads) {
    searchLeads.addEventListener('input', (e) => {
      renderLeadsTable(e.target.value.toLowerCase().trim());
    });
  }

  const searchMemberships = document.getElementById('search-memberships');
  if (searchMemberships) {
    searchMemberships.addEventListener('input', (e) => {
      renderMembershipsTable(e.target.value.toLowerCase().trim());
    });
  }

  const searchMessages = document.getElementById('search-messages');
  if (searchMessages) {
    searchMessages.addEventListener('input', (e) => {
      renderMessagesTable(e.target.value.toLowerCase().trim());
    });
  }
}

/**
 * 4. Refresh Button
 */
function initRefreshButton() {
  const refreshBtn = document.getElementById('admin-refresh-btn');
  if (!refreshBtn) return;

  refreshBtn.addEventListener('click', async () => {
    const originalText = refreshBtn.innerHTML;
    refreshBtn.disabled = true;
    refreshBtn.innerHTML = `<span>Updating...</span>`;
    await loadAllAdminData();
    refreshBtn.disabled = false;
    refreshBtn.innerHTML = originalText;
  });
}

/**
 * 5. Data Fetching API Orchestrator
 */
async function loadAllAdminData() {
  await Promise.all([
    fetchStats(),
    fetchRecentActivity(),
    fetchLeads(),
    fetchMemberships(),
    fetchMessages()
  ]);
}

/**
 * Utility: Centralized Authenticated Fetch Wrapper
 */
async function adminFetch(url, options = {}) {
  const res = await fetch(url, options);
  if (res.status === 401) {
    window.location.href = '/admin/login';
    throw new Error('Authentication required');
  }
  return res;
}

/**
 * Fetch Stats
 */
async function fetchStats() {
  try {
    const res = await adminFetch('/api/admin/stats');
    const json = await res.json();
    if (json.success && json.data) {
      adminState.stats = json.data;
      document.getElementById('metric-free-trials').textContent = json.data.totalFreeTrials || 0;
      document.getElementById('metric-memberships').textContent = json.data.totalMemberships || 0;
      document.getElementById('metric-messages').textContent = json.data.totalContactMessages || 0;
      document.getElementById('metric-new-leads').textContent = json.data.newLeads || 0;
    }
  } catch (err) {
    console.error('Error fetching admin stats:', err);
  }
}

/**
 * Fetch Recent Activity
 */
async function fetchRecentActivity() {
  const container = document.getElementById('recent-activity-container');
  if (!container) return;

  try {
    const res = await adminFetch('/api/admin/recent-activity');
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      adminState.recentActivity = json.data;
      renderRecentActivity(json.data);
    } else {
      container.innerHTML = `
        <div class="admin-empty-state">
          <div class="admin-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p class="admin-empty-text">No activity to display yet.</p>
          <p class="admin-empty-sub">Recent trial requests, membership enrollments, and messages will appear here.</p>
        </div>
      `;
    }
  } catch (err) {
    container.innerHTML = `<div class="admin-empty-state"><p class="admin-empty-text" style="color:#DC2626;">Unable to load recent activity.</p></div>`;
  }
}

function renderRecentActivity(activities) {
  const container = document.getElementById('recent-activity-container');
  if (!container) return;

  const html = `
    <ul class="admin-activity-list">
      ${activities.map(act => {
        let pillClass = 'admin-pill-red';
        if (act.type === 'Membership') pillClass = 'admin-pill-green';
        if (act.type === 'Contact Inquiry') pillClass = 'admin-pill-blue';

        return `
          <li class="admin-activity-item">
            <div class="admin-activity-left">
              <span class="admin-pill ${pillClass}">${escapeHtml(act.type)}</span>
              <div>
                <div class="admin-activity-name">${escapeHtml(act.name)}</div>
                <div class="admin-activity-detail">${escapeHtml(act.detail || 'Inquiry received')}</div>
              </div>
            </div>
            <div class="admin-activity-time">${formatDate(act.created_at)}</div>
          </li>
        `;
      }).join('')}
    </ul>
  `;

  container.innerHTML = html;
}

/**
 * Fetch Free Trial Leads
 */
async function fetchLeads() {
  try {
    const res = await adminFetch('/api/admin/free-trials');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      adminState.leads = json.data;
      renderLeadsTable();
    }
  } catch (err) {
    const tbody = document.getElementById('tbody-leads');
    if (tbody) tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color:#DC2626; padding: 2rem;">Error loading leads.</td></tr>`;
  }
}

function renderLeadsTable(query = '') {
  const tbody = document.getElementById('tbody-leads');
  if (!tbody) return;

  let list = adminState.leads || [];
  if (query) {
    list = list.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.phone && item.phone.toLowerCase().includes(query)) ||
      (item.goal && item.goal.toLowerCase().includes(query))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2.5rem; color: #64748B;">No free trial leads found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="font-weight: 700; color: #64748B;">#${item.id}</td>
      <td style="font-weight: 700; color: #0F172A;">${escapeHtml(item.name)}</td>
      <td><a href="tel:${escapeHtml(item.phone)}" style="color:#0F172A; text-decoration:none; font-weight:600;">${escapeHtml(item.phone)}</a></td>
      <td><a href="mailto:${escapeHtml(item.email)}" style="color:#64748B; text-decoration:none;">${escapeHtml(item.email)}</a></td>
      <td><span class="admin-pill admin-pill-red">${escapeHtml(item.goal || 'General Fitness')}</span></td>
      <td>${escapeHtml(item.preferred_time || 'Anytime')}</td>
      <td>${escapeHtml(item.experience || 'Beginner')}</td>
      <td>
        ${item.whatsapp_opt_in ? '<span class="admin-pill admin-pill-green">Yes</span>' : '<span class="admin-pill admin-pill-gray">No</span>'}
      </td>
      <td style="color: #64748B; font-size: 0.78rem;">${formatDate(item.created_at)}</td>
    </tr>
  `).join('');
}

/**
 * Fetch Memberships
 */
async function fetchMemberships() {
  try {
    const res = await adminFetch('/api/admin/memberships');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      adminState.memberships = json.data;
      renderMembershipsTable();
    }
  } catch (err) {
    const tbody = document.getElementById('tbody-memberships');
    if (tbody) tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color:#DC2626; padding: 2rem;">Error loading memberships.</td></tr>`;
  }
}

function renderMembershipsTable(query = '') {
  const tbody = document.getElementById('tbody-memberships');
  if (!tbody) return;

  let list = adminState.memberships || [];
  if (query) {
    list = list.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.phone && item.phone.toLowerCase().includes(query)) ||
      (item.plan_tier && item.plan_tier.toLowerCase().includes(query))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 2.5rem; color: #64748B;">No membership enrollments found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="font-weight: 700; color: #64748B;">#${item.id}</td>
      <td style="font-weight: 700; color: #0F172A;">${escapeHtml(item.name)}</td>
      <td><a href="tel:${escapeHtml(item.phone)}" style="color:#0F172A; text-decoration:none; font-weight:600;">${escapeHtml(item.phone)}</a></td>
      <td><a href="mailto:${escapeHtml(item.email)}" style="color:#64748B; text-decoration:none;">${escapeHtml(item.email)}</a></td>
      <td><span class="admin-pill admin-pill-red">${escapeHtml(item.plan_tier)}</span></td>
      <td><span class="admin-pill admin-pill-gray">${escapeHtml(item.billing_cycle)}</span></td>
      <td style="font-weight: 800; color: #0F172A;">₹${Number(item.price || 0).toLocaleString('en-IN')}</td>
      <td>${escapeHtml(item.start_date || 'Immediate')}</td>
      <td><span class="admin-pill admin-pill-green">${escapeHtml(item.status || 'PENDING')}</span></td>
      <td style="color: #64748B; font-size: 0.78rem;">${formatDate(item.created_at)}</td>
    </tr>
  `).join('');
}

/**
 * Fetch Contact Messages
 */
async function fetchMessages() {
  try {
    const res = await adminFetch('/api/admin/contact-messages');
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      adminState.messages = json.data;
      renderMessagesTable();
    }
  } catch (err) {
    const tbody = document.getElementById('tbody-messages');
    if (tbody) tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color:#DC2626; padding: 2rem;">Error loading messages.</td></tr>`;
  }
}

function renderMessagesTable(query = '') {
  const tbody = document.getElementById('tbody-messages');
  if (!tbody) return;

  let list = adminState.messages || [];
  if (query) {
    list = list.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.phone && item.phone.toLowerCase().includes(query)) ||
      (item.subject && item.subject.toLowerCase().includes(query)) ||
      (item.message && item.message.toLowerCase().includes(query))
    );
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2.5rem; color: #64748B;">No contact messages found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td style="font-weight: 700; color: #64748B;">#${item.id}</td>
      <td style="font-weight: 700; color: #0F172A;">${escapeHtml(item.name)}</td>
      <td><a href="mailto:${escapeHtml(item.email)}" style="color:#64748B; text-decoration:none;">${escapeHtml(item.email)}</a></td>
      <td><a href="tel:${escapeHtml(item.phone)}" style="color:#0F172A; text-decoration:none; font-weight:600;">${escapeHtml(item.phone)}</a></td>
      <td><span class="admin-pill admin-pill-blue">${escapeHtml(item.subject || 'Inquiry')}</span></td>
      <td style="max-width: 280px; white-space: normal; line-height: 1.4; color: #4B5563;">${escapeHtml(item.message)}</td>
      <td><span class="admin-pill admin-pill-gray">${escapeHtml(item.status || 'UNREAD')}</span></td>
      <td style="color: #64748B; font-size: 0.78rem;">${formatDate(item.created_at)}</td>
    </tr>
  `).join('');
}

// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'https://yxoitfojpefbxqlfjcyu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b2l0Zm9qcGVmYnhxbGZqY3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0Mzc0ODAsImV4cCI6MjA2ODAxMzQ4MH0.PSYZ9mDj8D9tqR40gZN__Jexe_qA68uTksnRHdQwGqI';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const listDiv = document.getElementById('schemesList');
const form = document.getElementById('addSchemeForm');

async function fetchSchemes() {
  const { data, error } = await supabase.from('schemes').select('*').order('id', { ascending: false });
  if (error) {
    listDiv.innerHTML = `<p style="color:red;">Error loading schemes.</p>`;
    return;
  }

  if (data.length === 0) {
    listDiv.innerHTML = `<p>No schemes found.</p>`;
    return;
  }

  listDiv.innerHTML = '';
  data.forEach((scheme) => {
    const schemeEl = document.createElement('div');
    schemeEl.className = 'scheme-card';
    schemeEl.innerHTML = `
      <h4>${scheme.title}</h4>
      <p>${scheme.description}</p>
      <button onclick="deleteScheme(${scheme.id})">🗑️ Delete</button>
    `;
    listDiv.appendChild(schemeEl);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const { data, error } = await supabase.from('schemes').insert([{ title, description }]);
  if (error) {
    alert("Failed to add scheme.");
    return;
  }

  form.reset();
  fetchSchemes();
});

async function deleteScheme(id) {
  if (!confirm("Are you sure you want to delete this scheme?")) return;
  const { error } = await supabase.from('schemes').delete().eq('id', id);
  if (error) {
    alert("Error deleting scheme.");
    return;
  }
  fetchSchemes();
}

// Load on page load
fetchSchemes();

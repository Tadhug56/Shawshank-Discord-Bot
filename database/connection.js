const { createClient } = require('@supabase/supabase-js');

// Load environment variables
const { SUPABASE_URL, SUPABASE_ANON_KEY } = require('../config.json');

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;
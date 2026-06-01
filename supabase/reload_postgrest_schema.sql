-- Run after adding/changing columns so the REST API sees them immediately.
notify pgrst, 'reload schema';

export default {
  user: {},
  adminManagement: {
    users: [],
    allUsersDocuments: [],
    selectedUsers: [],
  },
  auth: {
    user: {},
    isAuthenticated: false,
    error: {},
  },
  pageControls: {
    searchSource: 'document',
    isSearching: false,
    searchQuery: '',
    searchCount: 0,
    totalDocument: 0,
  },
  isAuthenticated: false,
  manageDocument: {
    loaded: false,
    alldocuments: [],
    archived: {},
    selectedDocument: {},
  },
};

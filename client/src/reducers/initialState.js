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
    allDocuments: [],
    archived: {},
    selectedDocument: {},
  },
};

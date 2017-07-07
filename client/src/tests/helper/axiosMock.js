import axios from 'axios';

const mockcall = jest.fn((url) => {
  if (url.includes('/api/documents')) {
    return Promise.resolve({ data: {
      id: 2,
      OwnerId: 1,
      permission: 'public',
      title: 'The book of mistery',
      content: 'The content of mistery',
    } });
  } else if (url.includes('/api/users')) {
    return Promise.resolve({ data: { token: 'seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsIlJvbGVJZCI6MSwiZnVsbE5hbWVzIjoiRXRhbnV3b21hIEpvaG4iLCJlbWFpbCI6IndhcGp1ZGVAZ21haWwuY29tIiwiaWF0IjoxNDk5Mzc2NTY0LCJleHAiOjE0OTk2MzU3NjR9.uDJkOKBFleoDsZRJZOe4bOcdMVYLP83cCiznucHCc7Q' } });
  }
  return Promise.resolve({ });
});
axios.post = mockcall;
axios.put = mockcall;
axios.delete = mockcall;

axios.get = jest.fn((url) => {
  if (url.includes('/api/users/1/documents') || url.includes('/api/documents') || url.includes('/api/users/undefined/documents')) {
    return Promise.resolve({ data: [{
      id: 2,
      OwnerId: 1,
      permission: 'public',
      title: 'The book of mistery',
      content: 'The content of mistery',
    },
    {
      id: 3,
      OwnerId: 1,
      permission: 'public',
      title: 'The book of mistery 2',
      content: 'The content of mistery',
    },
    ],
      count: 2 });
  } else if (url.includes('/api/search/document')) {
    return Promise.resolve({ data: { rows: [{
      id: 2,
      OwnerId: 1,
      permission: 'public',
      title: 'The book of mistery',
      content: 'The content of mistery',
    },
    ],
      count: 1 } });
  } else {
    return Promise.resolve({ data: [{}] });
  }
});

export default axios;

export const authorize = () => {
  window.location.pathname = '/auth/github';
};

export const deauthorize = () => {
  window.location.pathname = '/auth/out';
};

import React from 'react';

const AdminLoading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.loadingText}>Loading...</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: background overlay
    zIndex: 1000
  },
  loadingText: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333'
  }
};

export default AdminLoading;

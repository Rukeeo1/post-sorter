<template>
    <div class="skeleton-loader">
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
    </div>
  </template>
  
  <style scoped>
  .skeleton-loader {
    display: inline-block;
    width: 100%;
  }
  
  .skeleton-line {
    margin-bottom: 12px;
    height: 10px;
    background-color: #f0f0f0; /* Set the background color to your design */
    border-radius: 4px;
    animation: skeletonFade 1s infinite alternate; /* Animation definition */
  }
  
  @keyframes skeletonFade {
    from {
      opacity: 0.6;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  
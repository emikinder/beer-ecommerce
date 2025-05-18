export const formatImageURL = (url) => {
  return url.replace(/\.(jpe?g)$/i, '.png');
};

export const formatPrice = (price) => {
  return `$${(price / 100).toFixed(2)}`;
};

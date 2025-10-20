export const formatPrice = (price) => {
  let priceNumber = typeof price === 'string' 
        ? parseFloat(price.replace(/\./g, '').replace(/,/g, ''))
        : price;

    if (typeof priceNumber !== 'number' || isNaN(priceNumber)) {
        return 'N/A';
    }
    const formatted = priceNumber.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formatted} VND`;
};
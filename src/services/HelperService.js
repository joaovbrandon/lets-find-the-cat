const HelperService = {};

const currencyFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
});

HelperService.currencyFormat = value => currencyFormatter.format(value);

HelperService.phoneFormat = phone => phone.toString().replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '($1) $2-$3-$4');

HelperService.lockScroll = (lock = true) => {
  if (lock) {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.height = '';
    document.body.style.overflow = '';
  }
};

HelperService.mockId = () => (Math.random() * 9999999999).toFixed();

HelperService.scrollToTop = (smooth = true) => window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });

HelperService.paginate = (array, pageSize, currentPage) => {
  const pageNumber = currentPage - 1;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};

export default HelperService;

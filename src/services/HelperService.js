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

export default HelperService;

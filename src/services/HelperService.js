const HelperService = {};

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

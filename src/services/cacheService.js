import { CACHE } from '../configs';

const isValid = (obj) => {
  if (obj.duration === 'forever') return true;
  return ((new Date().getTime() - obj.time) < obj.duration);
};

const cacheService = {};

cacheService.set = (name, content, duration = CACHE.DEFAULT_DURATION) => {
  if (!name || !content) {
    throw new Error("You should pass 'name' and 'content' to cacheService.set(name, content, duration)");
  }

  const value = JSON.stringify({
    content,
    duration,
    time: new Date().getTime(),
  });

  const response = localStorage.setItem(`${CACHE.PREFIX}${name}`, value);

  return response;
};

cacheService.get = (name) => {
  if (!name) throw new Error("You should pass 'name' to cacheService.get(name)");

  const response = localStorage.getItem(`${CACHE.PREFIX}${name}`);

  if (!response) return null;

  const obj = JSON.parse(response);

  if (isValid(obj)) return obj.content;

  cacheService.remove(name);

  return null;
};

cacheService.remove = (name) => {
  if (!name) throw new Error("You should pass 'name' to cacheService.remove(name)");

  const response = localStorage.removeItem(`${CACHE.PREFIX}${name}`);

  return response;
};

cacheService.clear = () => {
  const response = localStorage.clear();
  return response;
};

export default cacheService;

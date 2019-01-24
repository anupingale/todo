const isMatching = (request, route) => {
  if (route.method && request.method != route.method) return false;
  if (route.url && request.url != route.url) return false;
  return true;
};

class Express {
  constructor() {
    this.routes = [];
  }

  use(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ url, handler, method: 'GET' });
  }

  post(url, handler) {
    this.routes.push({ url, handler, method: 'POST' });
  }

  requestListener(request, response) {
    let matchingRoutes = this.routes.filter(route =>isMatching(request, route));
    let remaining = [...matchingRoutes];
    let next = () => {
      let current = remaining[0];
      if (!current) return;
      remaining = remaining.slice(1);
      current.handler(request, response, next);
    };
    next();
  }
}

module.exports = Express;

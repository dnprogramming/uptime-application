const ProxyHost =
  (process.env.REACT_APP_PROXY_HOST as string) ?? 'http://localhost:8080';

export {ProxyHost};

export default ProxyHost;

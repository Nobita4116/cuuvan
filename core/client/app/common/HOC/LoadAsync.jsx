import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

export default function LoadAsync(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 200,
    timeout: 10,
  }, opts));
};
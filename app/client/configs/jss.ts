import configjss from 'jss';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';

export default function () {
  const jss = configjss;
  jss.use(nested());
  jss.use(vendorPrefixer());
}
export default function(path, lowPath) {
  path = path.substr(-1) === '/' ? path : path + '/';
  return path + lowPath;
}

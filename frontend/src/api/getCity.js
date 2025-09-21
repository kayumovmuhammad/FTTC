export default function getCity(address) {
  let ans = '';
  for (let index = 0; index < address.length; index++) {
    if (address[index] == ',') {
      break;
    }
    if (index == 17) {
      ans += '...';
      break;
    }
    ans += address[index];
  }
  return ans;
}

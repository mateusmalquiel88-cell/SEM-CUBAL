function add(a, b) {
  return a + b;
}

if (require.main === module) {
  console.log('add(1,2)=', add(1, 2));
}

module.exports = { add };

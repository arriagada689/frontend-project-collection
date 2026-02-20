function getRandomUniqueArray(n) {
  
  const numbers = Array.from({ length: n }, (_, i) => i + 1);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, n);
}

export default getRandomUniqueArray
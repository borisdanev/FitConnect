const useRatingStars = (rating: number) => {
  const floor = Math.floor(rating);
  const decimal = Math.ceil((rating % 1) * 10);
  const arr = Array(5)
    .fill("empty")
    .map((item, i) => {
      const current = i + 1;
      if (current <= floor || (current - floor === 1 && decimal > 5))
        return "full";
      if (current - floor === 1 && decimal > 0 && decimal < 6) return "half";
      return item;
    });
  return arr;
};
export default useRatingStars;

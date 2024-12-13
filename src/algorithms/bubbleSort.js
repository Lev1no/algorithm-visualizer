export const bubbleSort = (array) => {
  const animations = [];
  const arr = [...array]; // Clone the array to avoid mutating the original

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Highlight bars being compared
      animations.push({
        type: "compare",
        indices: [j, j + 1],
      });

      if (arr[j] > arr[j + 1]) {
        // Mark bars for swapping
        animations.push({
          type: "swap",
          indices: [j, j + 1],
          heights: [arr[j + 1], arr[j]],
        });

        // Perform the swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      // Restore comparison colors after check
      animations.push({
        type: "restore",
        indices: [j, j + 1],
      });
    }

    // Mark the current largest element as sorted
    animations.push({
      type: "sorted",
      index: arr.length - i - 1,
    });
  }

  // Mark the first element as sorted (last step)
  animations.push({
    type: "sorted",
    index: 0,
  });

  return animations;
};

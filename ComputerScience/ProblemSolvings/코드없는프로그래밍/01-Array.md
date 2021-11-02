# Array

Sort

- stable sort: merge sort
- unstable sort: quick sort

## Quick Sort

Key Words

- Pivot
- Partitioning

Process

1. 중앙값을 Pivot으로 정하고
2. Pivot과 배열 마지막 값을 swap
3. Pivot을 제외한 양 끝에서 two pointer
   - 왼쪽 pointer는 Pivot 보다 값이 작은지 비교, 크면 오른쪽 pointer의 값과 swap
   - 오른쪽 pointer는 Pivot 보다 값이 큰지 비교, 작으면 왼쪽 pointer의 값과 swap
   - 왼쪽 pointer가 오른쪽 pointer 보다 오른쪽으로 가게 되면, 그 위치의 값을 pivot과 swap
   - Pivot 왼쪽에는 Pivot 보다 작은 수들만, 오른쪽에는 Pivot 보다 큰 수들만 있게 됨
4. Pivot의 왼쪽 배열, 오른쪽 배열 각각에 대해 1.~3. 반복

Time Complexity

- Best: O(nlogn)
- Worst: O(n^2)

## Binary Search

배열이 정렬되어 있는 경우 빠른 탐색

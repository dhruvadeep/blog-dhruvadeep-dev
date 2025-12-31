import { incrementViews } from "./db/queries";

const VIEW_UPDATE_INTERVAL = 5000; // 5 seconds
const MAX_QUEUE_SIZE = 100;

let queue: number[] = [];
let timer: NodeJS.Timeout | null = null;

function flushQueue() {
  if (queue.length === 0) return;

  const currentQueue = [...queue];
  queue = [];

  // Process in batch or individually.
  // Postgres handles concurrency well.

  // Simple aggregation to reduce DB writes
  const counts: Record<number, number> = {};
  currentQueue.forEach((id) => {
    counts[id] = (counts[id] || 0) + 1;
  });

  Object.entries(counts).forEach(([postId, count]) => {
    incrementViews(parseInt(postId), count);
  });

  console.log(
    `Flushed analytics queue: ${currentQueue.length} views processed.`
  );
}

export function queueView(postId: number) {
  queue.push(postId);

  if (queue.length >= MAX_QUEUE_SIZE) {
    if (timer) clearTimeout(timer);
    flushQueue();
  } else if (!timer) {
    timer = setTimeout(() => {
      flushQueue();
      timer = null;
    }, VIEW_UPDATE_INTERVAL);
  }
}

// 8.Class/04-3.initialization.ts

class ActivitiesQueue {
  pending!: string[];

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activitites = new ActivitiesQueue();

activitites.initialize(["wake up", "eat", "sleep"]);
activitites.next();

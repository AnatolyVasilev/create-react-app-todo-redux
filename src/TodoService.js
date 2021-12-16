class TodoService {

    constructor() {
        this.data = [
            {id: 1, name:  "Keep calm & code", active: true},
            {id: 2, name:  "Go shop and buy something", active: true}
        ]
        this.id = 2;
        this.subscriptions = [];
    }

    addTask(name) {
        this.data.push({id: ++this.id, name, active: true});
        this.subscriptions.forEach(subscription => subscription())
    }

    setActive(id, active) {
        const task = this.data.find(datum => datum.id === id);
        if (task) {
            task.active = active;
            this.subscriptions.forEach(subscription => subscription())
        }
    }

    removeTask(id) {
        const idx = this.data.findIndex(datum => datum.id === id);
        if (idx !== -1) {
            this.data.splice(idx, 1);
            this.subscriptions.forEach(subscription => subscription())
        }
    }

    getData() {
        return this.data;
    }

    subscribe(subscription) {
        this.subscriptions.push(subscription);
        return () => {
            const idx = this.subscriptions.indexOf(subscription);
            this.subscriptions.splice(idx, 1);
        };
    }

}

const service = new TodoService();
export default service;
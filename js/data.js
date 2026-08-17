const CatalystData = {
    storageKey: "catalystData",

    defaultData: {
        user: {
            name: "Student"
        },

        xp: 2480,

        tasks: [
            {
                id: 1,
                title: "Complete mathematics revision",
                subject: "Mathematics",
                duration: 45,
                priority: "high",
                completed: true,
                date: "2026-08-16"
            },
            {
                id: 2,
                title: "Read physics chapter 4",
                subject: "Physics",
                duration: 30,
                priority: "medium",
                completed: true,
                date: "2026-08-16"
            },
            {
                id: 3,
                title: "Finish Catalyst UI work",
                subject: "Personal",
                duration: 60,
                priority: "high",
                completed: false,
                date: "2026-08-16"
            },
            {
                id: 4,
                title: "Review chemistry notes",
                subject: "Chemistry",
                duration: 25,
                priority: "low",
                completed: false,
                date: "2026-08-16"
            }
        ],

        focus: {
            totalMinutes: 204,
            totalSessions: 4,
            todayMinutes: 204,
            todaySessions: 4
        },

        streak: {
            current: 12,
            best: 18,
            lastActiveDate: "2026-08-16"
        },

        exams: [
            {
                id: 1,
                subject: "Mathematics",
                topic: "Algebra & Trigonometry",
                date: "2026-08-24"
            },
            {
                id: 2,
                subject: "Physics",
                topic: "Mechanics & Motion",
                date: "2026-08-29"
            },
            {
                id: 3,
                subject: "Chemistry",
                topic: "Atoms & Chemical Bonding",
                date: "2026-09-03"
            }
        ]
    },

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            this.save(this.defaultData);
        }
    },

    get() {
        this.init();

        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (error) {
            this.save(this.defaultData);
            return JSON.parse(JSON.stringify(this.defaultData));
        }
    },

    save(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    },

    reset() {
        localStorage.removeItem(this.storageKey);
        this.init();
        return this.get();
    },

    getTodayDate() {
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    },

    getTasks(date = this.getTodayDate()) {
        const data = this.get();

        return data.tasks.filter(task => task.date === date);
    },

    getCompletedTasks(date = this.getTodayDate()) {
        return this.getTasks(date).filter(task => task.completed);
    },

    getRemainingTasks(date = this.getTodayDate()) {
        return this.getTasks(date).filter(task => !task.completed);
    },

    getDailyProgress(date = this.getTodayDate()) {
        const tasks = this.getTasks(date);

        if (tasks.length === 0) {
            return 0;
        }

        const completed = tasks.filter(task => task.completed).length;

        return Math.round((completed / tasks.length) * 100);
    },

    getLevel() {
        const data = this.get();

        return Math.floor(data.xp / 500) + 1;
    },

    getCurrentLevelXP() {
        const data = this.get();
        const level = this.getLevel();

        return data.xp - ((level - 1) * 500);
    },

    getXPRequiredForLevel() {
        return 500;
    },

    getXPUntilNextLevel() {
        const currentXP = this.getCurrentLevelXP();

        return 500 - currentXP;
    },

    completeTask(taskId) {
        const data = this.get();

        const task = data.tasks.find(task => task.id === taskId);

        if (!task || task.completed) {
            return data;
        }

        task.completed = true;

        data.xp += 25;

        this.updateStreak();

        this.save(data);

        return data;
    },

    uncompleteTask(taskId) {
        const data = this.get();

        const task = data.tasks.find(task => task.id === taskId);

        if (!task || !task.completed) {
            return data;
        }

        task.completed = false;

        data.xp = Math.max(0, data.xp - 25);

        this.save(data);

        return data;
    },

    addTask(task) {
        const data = this.get();

        const newTask = {
            id: Date.now(),
            title: task.title || "New task",
            subject: task.subject || "General",
            duration: task.duration || 0,
            priority: task.priority || "medium",
            completed: false,
            date: task.date || this.getTodayDate()
        };

        data.tasks.push(newTask);

        this.save(data);

        return newTask;
    },

    deleteTask(taskId) {
        const data = this.get();

        data.tasks = data.tasks.filter(task => task.id !== taskId);

        this.save(data);

        return data;
    },

    addFocusSession(minutes) {
        const data = this.get();

        const sessionMinutes = Math.max(0, Number(minutes) || 0);

        data.focus.totalMinutes += sessionMinutes;
        data.focus.todayMinutes += sessionMinutes;

        data.focus.totalSessions += 1;
        data.focus.todaySessions += 1;

        data.xp += Math.floor(sessionMinutes / 5) * 2;

        this.updateStreak();

        this.save(data);

        return data;
    },

    resetTodayFocus() {
        const data = this.get();

        data.focus.todayMinutes = 0;
        data.focus.todaySessions = 0;

        this.save(data);

        return data;
    },

    updateStreak() {
        const data = this.get();
        const today = this.getTodayDate();
        const lastActive = data.streak.lastActiveDate;

        if (lastActive === today) {
            return data;
        }

        if (!lastActive) {
            data.streak.current = 1;
        } else {
            const lastDate = new Date(`${lastActive}T00:00:00`);
            const currentDate = new Date(`${today}T00:00:00`);

            const difference =
                Math.round(
                    (currentDate - lastDate) / (1000 * 60 * 60 * 24)
                );

            if (difference === 1) {
                data.streak.current += 1;
            } else if (difference > 1) {
                data.streak.current = 1;
            }
        }

        data.streak.best = Math.max(
            data.streak.best,
            data.streak.current
        );

        data.streak.lastActiveDate = today;

        this.save(data);

        return data;
    },

    getStats() {
        const data = this.get();
        const todayTasks = this.getTasks();

        return {
            xp: data.xp,
            level: this.getLevel(),
            currentLevelXP: this.getCurrentLevelXP(),
            xpRequiredForLevel: this.getXPRequiredForLevel(),
            xpUntilNextLevel: this.getXPUntilNextLevel(),

            streak: data.streak.current,
            bestStreak: data.streak.best,

            focusMinutes: data.focus.todayMinutes,
            focusSessions: data.focus.todaySessions,
            totalFocusMinutes: data.focus.totalMinutes,
            totalFocusSessions: data.focus.totalSessions,

            totalTasks: todayTasks.length,
            completedTasks: todayTasks.filter(task => task.completed).length,
            remainingTasks: todayTasks.filter(task => !task.completed).length,
            dailyProgress: this.getDailyProgress()
        };
    }
};

CatalystData.init();
const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) {
            filter.status = status;
        }
        let tasks;
        if(req.user.role === "admin") {
            tasks = await Task.find(filter)
                .populate("assignedTo", "name email profileImageURL");
        }else {
            tasks = await Task.find({...filter, assignedTo: req.user._id})
                .populate("assignedTo", "name email profileImageURL");
        }

        // Add Completed todoChecklist counts to tasks
        tasks = await Promise.all(tasks.map(async (task) => {
            const completedCount = task.todeChecklist.filter(item => item.completed).length;
            return {...task._doc, completedTodoCount: completedCount };
        }));

        // Status counts
        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" ? {} : { assignedTo: req.user._id }),
        });

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role !== "admin" ? {} : { assignedTo: req.user._id }),
        });

        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" ? {} : { assignedTo: req.user._id }),
        });

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageURL");
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            status,
            todeChecklist
        } = req.body;

        if(!Array.isArray(assignedTo)) {
            return res.status(400).json({message: 'assignedTo must be an array of user IDs'});
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createBy: req.user._id,
            attachments,
            status,
            todeChecklist
        });

        res.status(201).json({message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.attachments = req.body.attachments || task.attachments;
        task.todeChecklist = req.body.todeChecklist || task.todeChecklist;

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)) {
                return res.status(400).json({message: 'AssignedTo must be an array of user IDs'});
            }
            task.assignedTo = req.body.assignedTo;
        }

        const updatedTask = await task.save();
        res.json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        console.log('updateTaskStatus called with id:', req.params.id);
        console.log('req.body:', req.body);
        if (req.body.status) {
            if (req.body.status === "InProgress") req.body.status = "In Progress";
            if (req.body.status === "In progress") req.body.status = "In Progress";
        }
        const task = await Task.findById(req.params.id);
        console.log('task found:', task);

        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ message: 'Task not found' });
        }

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user._id.toString()
        );
        console.log('isAssigned:', isAssigned, 'user role:', req.user.role);

        if (!isAssigned && req.user.role !== "admin") {
            console.log('Not authorized');
            return res.status(403).json({ message: "Not authorized" });
        }

        console.log('Setting status to:', req.body.status);
        task.status = req.body.status || task.status;
        console.log('Task status set to:', task.status);

        if(task.status === "Completed") {
            console.log('Marking checklist as completed');
            task.todeChecklist.forEach((item) => (item.completed = true));
            task.progress = 100;
        }

        console.log('Saving task');
        await task.save();
        console.log('Task saved successfully');
        res.json({ message: 'Task status updated successfully', updatedTask });
    } catch (error) {
        console.log('Error in updateTaskStatus:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTaskChecklist = async (req, res) => {
    try {
        console.log('updateTaskChecklist called with id:', req.params.id);
        console.log('req.body:', req.body);
        const task = await Task.findById(req.params.id);
        console.log('task found:', task);

        if (!task) {
            console.log('Task not found');
            return res.status(404).json({ message: 'Task not found' });
        }

        if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
            console.log('Not authorized');
            return res.status(403).json({ message: "Not authorized to update checklist" });
        }

        console.log('Setting todeChecklist to:', req.body.todeChecklist);
        task.todeChecklist = req.body.todeChecklist;
        console.log('todeChecklist set');

        // Calculate progress
        console.log('Calculating progress');
        const completedCount = task.todeChecklist.filter((item) => item.completed).length;
        const totalItems = task.todeChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
        console.log('Progress:', task.progress);

        // Auto Mark as completed if all items are completed
        if (task.progress === 100 ) {
            console.log('Setting status to Completed');
            task.status = "Completed";
        }else if(task.status === "Completed")  {
            console.log('Setting status to In Progress');
            task.status = "In Progress";
        }else {
            console.log('Setting status to Pending');
            task.status = "Pending";
        }

        console.log('Saving task');
        await task.save();
        console.log('Task saved');
        const updatedTask = await Task.findById(req.params.id)
            .populate("assignedTo", "name email profileImageURL");

        res.json({ message: 'Task checklist updated successfully', task: updatedTask });
    } catch (error) {
        console.log('Error in updateTaskChecklist:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getDashboardData = async (req, res) => {
    try {
      const totalTasks = await Task.countDocuments({});
      const pendingTasks = await Task.countDocuments({ status: 'Pending' });
      const completedTasks = await Task.countDocuments({ status: 'Completed' });
      const overdueTasks = await Task.countDocuments(
          {
              status: {$ne: "Completed"},
              dueDate: {$lt: new Date()}
          });
      const taskStatuses = ["Pending", "In Progress", "Completed"];
      const taskDistributionRaw = await Task.aggregate([
          {
              $group:{
                  _id: "$status",
                  count: {$sum: 1}
              },
          },
      ]);

      const taskDistribution = taskStatuses.reduce((acc, status) => {
          acc[status] = taskDistributionRaw.find((item) => item._id === status)?.count || 0;
          return acc;
      }, {});

      taskDistribution["All"] = totalTasks;

      const taskPriorities = ["High", "Medium", "Low"];
      const taskPriorityLevelRaw = await Task.aggregate([
          {
              $group:{
                  _id: "$priority",
                  count: {$sum: 1}
              },
          },
      ]);

      const taskPriorityLevel = taskPriorities.reduce((acc, priority) => {
          acc[priority] = taskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
          return acc;
      }, {});

      // Fetch recent 10 tasks
      const recentTasks = await Task.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("title status priority dueDate createdAt");

      res.status(200).json({
          statistics: {
              totalTasks,
              pendingTasks,
              completedTasks,
              overdueTasks
          },
          charts: {
              taskDistribution,
              taskPriorityLevel,
          }, recentTasks,
      });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getUserData = async (req, res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "Pending" });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "Completed" });
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: {$ne: "Completed"},
            dueDate: {$lt: new Date()}
        });

        // Task distribution by status
        const taskStatuses = ["Pending", "In Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $match: { assignedTo: userId },
                $group:{
                    _id: "$status",
                    count: {$sum: 1}
                },
            },
        ]);

        const taskDistribution = taskStatuses.reduce((acc, status) => {
            acc[status] = taskDistributionRaw.find((item) => item._id === status)?.count || 0;
            return acc;
        }, {});
        taskDistribution["All"] = totalTasks;

        const taskPriorities = ["High", "Medium", "Low"];
        const taskPriorityLevelRaw = await Task.aggregate([
            {
                $match: { assignedTo: userId },
                $group:{
                    _id: "$priority",
                    count: {$sum: 1}
                },
            },
        ]);

        const taskPriorityLevel = taskPriorities.reduce((acc, priority) => {
            acc[priority] = taskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        }, {});

        const recentTasks = await Task.find({ assignedTo: userId })
           .sort({ createdAt: -1 })
           .limit(10)
        .select("title status priority dueDate createdAt");

        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks
            },
            charts: {
                taskDistribution,
                taskPriorityLevel
            }, recentTasks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserData
};
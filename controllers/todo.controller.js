import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";


export const createTodo = async (req, res) => {
    try {
        const { title, description, status, dueDate, assignedTo } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todo = new Todo({
            title,
            description,
            status,
            dueDate,
            createdBy: req.user._id,
            assignedTo: assignedTo || null
        });
        
        await todo.save();

        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);
            if (assignedUser) {
                console.log(`Notification: ${assignedUser.email} has been assigned Todo: "${title}" by ${req.user.email}`);
            }
        }

        res.status(201).json(todo);
    } catch (error) {
        res.json({ message: 'Server error', error: error.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page || 1));
        const limit = Math.max(1, parseInt(req.query.limit || 10));
        const skip = (page - 1) * limit;

        const filter = {
            $or: [
                { createdBy: req.user._id },
                { assignedTo: req.user._id }
            ]
        };

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.search) {
            filter.$and = filter.$and || [];
            filter.$and.push({
                $or: [
                    { title: new RegExp(req.query.search, 'i') },
                    { description: new RegExp(req.query.search, 'i') }
                ]
            });
        }

        const total = await Todo.countDocuments(filter);
        const todos = await Todo.find(filter)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({ total, page, limit, todos });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email');
        
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check if user has access to this todo
        const isCreator = todo.createdBy._id.toString() === req.user._id.toString();
        const isAssigned = todo.assignedTo && todo.assignedTo._id.toString() === req.user._id.toString();
        
        if (!isCreator && !isAssigned) {
            return res.json({ message: 'Access denied' });
        }

        res.json(todo);
    } catch (error) {
        res.json({ message: 'Server error', error: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Only creator can edit the todo
        if (todo.createdBy.toString() !== req.user._id.toString()) {
            return res.json({ message: 'Only creator can edit this todo' });
        }

        const { title, description, status, dueDate, assignedTo } = req.body;
        
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (status !== undefined) todo.status = status;
        if (dueDate !== undefined) todo.dueDate = dueDate;
        if (assignedTo !== undefined) {
            todo.assignedTo = assignedTo;
            if (assignedTo) {
                const assignedUser = await User.findById(assignedTo);
                if (assignedUser) {
                    console.log(`Notification: ${assignedUser.email} was assigned Todo: "${todo.title}" by ${req.user.email}`);
                }
            }
        }
        
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.json({ message: 'Server error', error: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Only creator can delete the todo
        if (todo.createdBy.toString() !== req.user._id.toString()) {
            return res.json({ message: 'Only creator can delete this todo' });
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.json({ message: 'Server error', error: error.message });
    }
};

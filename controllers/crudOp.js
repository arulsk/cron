const userAuth = require('../models/userModel');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const users = await userAuth.userAuth.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userAuth.userAuth.findOne({
            where: {
                userId: id
            }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userName, userEmail, userPassword, role } = req.body;
        const id = req.params.id;
        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const update = await userAuth.userAuth.update(
            { userName, userEmail, userPassword: hashedPassword, role },
            {
                where: {
                    userId: id
                }
            }
        );
        res.status(200).json(update);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await userAuth.userAuth.destroy({
            where: {
                userId: id
            }
        });
        if (deleteUser) {
            res.status(200).json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getUsers, getUserById, deleteUser, updateUser };

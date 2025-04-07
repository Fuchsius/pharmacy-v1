const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require('node:fs')

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "K.3y$3cr3t";


// Add New User

const addNewUser = async (req, res) => {
    let {
        fullName,
        firstName,
        lastName,
        username,
        phone,
        email,
        dateOfBirth,
        gender,
        role,
        password,
        status
    } = req.body;

    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Email is already in use" });
        }
        // Check if the role exists
        role = parseInt(role);
        const roleExists = await prisma.role.findUnique({
            where: { id: role },
        });
        if (!roleExists) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Role does not exist" });
        }
        if (!firstName) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "First name is required" });
        }
        if (!lastName) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Last name is required" });
        }
        if (!email) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Email is required" });
        }
        if (!password) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Password is required" });
        }

        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Invalid email format" });
        }
        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!passwordRegex.test(password)) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let [day, month, year] = dateOfBirth.split("/");
        dateOfBirth = new Date(`${year}-${month}-${day}`);

        if (isNaN(dateOfBirth.getTime())) {
            fs.unlinkSync(imagePath)
            return res.status(400).json({ error: "Invalid date of birth" });
        }

        const newUser = await prisma.user.create({
            data: {
                fullName,
                firstName,
                lastName,
                username,
                phone,
                email,
                dateOfBirth,
                gender,
                role,
                password: hashedPassword,
                profilePic: imagePath,
                status,
            },
        });

        res.json(newUser);

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
    }
};

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                address: true,
            },
        });
        if (!users || users.length == 0) return res.status(404).json({ error: "Users not found" });
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Error fetching users" });
    }
};

// get user by id
const getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                address: true,
            },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
};

// get user by email
const getUserByEmail = async (req, res) => {
    const email = req.params.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                address: true,
            },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Error fetching user" });
    }
};

// update user
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    // Check if the userId is valid
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    let {
        fullName,
        firstName,
        lastName,
        username,
        phone,
        email,
        dateOfBirth,
        gender,
    } = req.body;

    console.log(req.body);

    if (!firstName) {
        return res.status(400).json({ error: "First name is required" });
    }
    if (!lastName) {
        return res.status(400).json({ error: "Last name is required" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (dateOfBirth) {
        let [day, month, year] = dateOfBirth.split("/");
        dateOfBirth = new Date(`${year}-${month}-${day}`);

        if (isNaN(dateOfBirth.getTime())) {
            return res.status(400).json({ error: "Invalid date of birth" });
        }
    }

    try {
        // First, check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Proceed to update if the user exists
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                fullName,
                firstName,
                lastName,
                username,
                phone,
                email,
                dateOfBirth,
                gender,
            },
        });

        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
};

// update user status
const updateUserStatus = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { status },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
    }
};

// update user password
const updateUserPassword = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    try {

        // Check if the password is valid
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error updating user password:", error);
        res.status(500).json({ error: "Error updating user password" });
    }
};

// update profile image 
const updateProfile = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    if (imagePath) {
        // Delete the old image if it exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            fs.unlinkSync(imagePath);
            return res.status(404).json({ error: "User not found" })
        };

        if (user && user.profilePic) {
            const oldImagePath = user.profilePic;
            fs.unlinkSync(oldImagePath);
        }
    }

    if (!imagePath) {
        return res.status(400).json({ error: 'Image is required' });
    }
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { profilePic: imagePath },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({ error: "Error updating profile image" });
    }

}

// update user role
const updateUserRole = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    const { role } = req.body;
    if (!role) {
        return res.status(400).json({ error: 'Role is required' });
    }
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        console.error("Error updating user role:", error);
        res.status(500).json({ error: "Error updating user role" });
    }
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.status) return res.status(403).json({ error: "User is not active" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user" });
    }
};

// delete user
const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {


        const userProfile = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userProfile) return res.status(404).json({ error: "User not found" });

        if (userProfile && userProfile.profilePic) {
            const oldImagePath = userProfile.profilePic;
            fs.unlinkSync(oldImagePath);
        }

        const user = await prisma.user.delete({
            where: { id: userId },
            include: {
                address: true,
                orders: true,
                cart: true,
                reviews: true,
            },
        });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
};

// delete profile image
const deleteProfileImage = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.profilePic) {

            console.log(user.profilePic)

            if (user.profilePic == null) {
                return res.status(400).json({ error: "No profile image found" });
            }

            fs.unlinkSync(user.profilePic);

            await prisma.user.update({
                where: { id: userId },
                data: {
                    profilePic: null
                },
            });
            res.json({ message: "Profile image deleted successfully" });
        } else {
            return res.status(400).json({ error: "No profile image found" });
        }
    } catch (error) {
        console.error("Error deleting profile image:", error);
        res.status(500).json({ error: "Error deleting profile image" });
    }
}

module.exports = {
    addNewUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    updateUserStatus,
    updateUserPassword,
    updateProfile,
    updateUserRole,
    loginUser,
    deleteUser,
    deleteProfileImage,
};

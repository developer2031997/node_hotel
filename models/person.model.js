const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

personSchema.pre('save', async function(next) {
    try {
        const person = this;

        // Hash the password only if it's modified or new
        if (!person.isModified('password')) return next();

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);

        // Update the password with the hashed value
        person.password = hashPassword;

        next();
    } catch (error) {
        next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Compare candidate password with the stored hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Invalid password comparison');
    }
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: [true, 'Name cannot be blank'],
        minLength: [3, 'Name must have more than three(2) characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Entera valid email format'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be more than five (5) characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // Only works on save and create
            validator: function(el) {
                return this.password === el;
            },
            message: 'Passwords don\'t match'
        }
    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        required : [true, 'A user must have phone number'],
        maxlength: [14, 'Enter a valid phone number'],
        minlength: [7, 'Enter a valid number'],
        validate: {
            validator: function (el) {
                const values = ['+', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                const elements = el.split('');
                elements.forEach(element => {
                    if (!values.includes(element)) return false;
                });
            },
            message: 'Enter a valid phone number'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.virtual("vehicles", {
  ref: "Vehicle",
  foreignField: "user",
  localField: "_id",
});



userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    if(!this.isModified('password')) return next();
    //Hash password
    this.password = await bcrypt.hash(this.password, 12)
    // delete passwordConfirm
    this.passwordConfirm = undefined;
    next();
});



userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        // console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    // False means not changed
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // console.log({resetToken}, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema);


module.exports = User;
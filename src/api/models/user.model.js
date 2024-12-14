const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true }, 
    email: {type: String, required: true, unique: true, match: [/.+\@.+\..+/, "El formato del email no es válido"]},
    password: { type: String, required: true },
    rol: { type: String, required: true }
},{
    collection: 'user',
    timestamps: true // createdAt, updateAt
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
    
});

// Método para comparar la contraseña durante el login
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("user", userSchema);

//Exportamos el módulo
module.exports = User; 
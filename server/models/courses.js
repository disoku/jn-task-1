import mongoose from 'mongoose';

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;


const StudentSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    discount: Number,
    status: {
        type: String,
        enum: ['paid', 'not paid'],
        required: true,
        default: 'not paid'
    }
});

const ModuleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    students: [StudentSchema],
    subscribed_students: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    modules: [ModuleSchema],
    // subscribed_students: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    updated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Course', courseSchema);
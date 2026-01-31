import mongoose from 'mongoose';

const memorialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: [true, 'Please add first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please add last name'],
        trim: true
    },
    birthDate: {
        type: Date,
        required: [true, 'Please add birth date']
    },
    deathDate: {
        type: Date,
        required: [true, 'Please add death date']
    },
    profilePicture: {
        type: String,
        default: ''
    },
    coverPicture: {
        type: String,
        default: ''
    },
    biography: {
        type: String,
        default: ''
    },
    lifeSummary: {
        type: String,
        default: ''
    },
    achievements: {
        type: String,
        default: ''
    },
    profession: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    youtubeVideos: [{
        title: String,
        url: String,
        description: String
    }],
    galleryPhotos: [{
        url: String,
        description: String
    }],
    familyMembers: [{
        relationship: String,
        name: String,
        dates: String
    }],
    lifeEvents: [{
        title: String,
        date: Date,
        description: String
    }],
    guestBookEntries: [{
        name: String,
        email: String,
        message: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    paymentId: {
        type: String,
        default: null
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', null],
        default: null
    },
    paymentAmount: {
        type: Number,
        default: null
    },
    paidAt: {
        type: Date,
        default: null
    },
    qrGenerated: {
        type: Boolean,
        default: false
    },
    hugCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
memorialSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Memorial || mongoose.model('Memorial', memorialSchema);

import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Memorial from '@/models/Memorial';

// POST - Add guest book entry
export async function POST(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Please provide name, email, and message' },
                { status: 400 }
            );
        }

        const memorial = await Memorial.findById(id);

        if (!memorial) {
            return NextResponse.json(
                { success: false, message: 'Memorial not found' },
                { status: 404 }
            );
        }

        // Only allow guestbook entries on published memorials
        if (memorial.status !== 'published') {
            return NextResponse.json(
                { success: false, message: 'Cannot add guestbook entries to draft memorials' },
                { status: 400 }
            );
        }

        const updated = await Memorial.findByIdAndUpdate(
            id,
            {
                $push: {
                    guestBookEntries: {
                        name,
                        email,
                        message,
                        date: new Date()
                    }
                }
            },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            data: updated.guestBookEntries
        }, { status: 201 });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

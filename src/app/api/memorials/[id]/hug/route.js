import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Memorial from '@/models/Memorial';

// POST - Add hug to memorial
export async function POST(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const memorial = await Memorial.findById(id);

        if (!memorial) {
            return NextResponse.json(
                { success: false, message: 'Memorial not found' },
                { status: 404 }
            );
        }

        // Only allow hugs on published memorials
        if (memorial.status !== 'published') {
            return NextResponse.json(
                { success: false, message: 'Cannot add hugs to draft memorials' },
                { status: 400 }
            );
        }

        const updated = await Memorial.findByIdAndUpdate(
            id,
            { $inc: { hugCount: 1 } },
            { new: true }
        );

        return NextResponse.json({
            success: true,
            hugCount: updated.hugCount
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}

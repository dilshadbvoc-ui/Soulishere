import Link from 'next/link';
import Image from 'next/image';

export default function MemorialCard({ memorial, showActions = true }) {
    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="memorial-card">
            <div className="memorial-image">
                <Image
                    src={memorial.profilePicture || '/images/default_profile.png'}
                    alt={`${memorial.firstName} ${memorial.lastName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="memorial-content">
                <h3>{memorial.firstName} {memorial.lastName}</h3>
                <p className="memorial-dates">
                    {formatDate(memorial.birthDate)} - {formatDate(memorial.deathDate)}
                </p>
                {memorial.status === 'draft' && (
                    <span className="status-badge draft">Draft</span>
                )}
                {showActions && (
                    <div className="memorial-actions">
                        <Link href={`/memorial/${memorial._id}`} className="btn btn-primary btn-small">
                            View
                        </Link>
                        {memorial.status === 'draft' && (
                            <Link href={`/edit-memorial/${memorial._id}`} className="btn btn-secondary btn-small">
                                Edit
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

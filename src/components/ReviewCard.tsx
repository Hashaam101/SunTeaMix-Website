import React from 'react';
import Image from 'next/image';


interface ReviewCardProps {
  starCount: number;
  reviewText: string;
  reviewerName: string;
  redirect?: string;
  profileImage: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  starCount,
  reviewText,
  reviewerName,
  profileImage,
  redirect
}) => {
  // Ensure star count is between 0 and 5
  const stars = Math.min(Math.max(0, starCount), 5);
  
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white p-[20px_30px] shadow-[0px_0px_18px_0px_rgba(0,0,0,0.12)]">
      {/* Star Rating */}
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-2xl text-primary-dark">
            {index < stars ? "★" : ""}
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-normal3 text-gray-800 sm:text-normal1">
        {reviewText}
      </p>

      {/* Reviewer Info */}
      <div className="mt-auto flex w-full items-center gap-2">
        {profileImage && (
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image 
              src={profileImage}
              alt={`${reviewerName}'s profile`}
              width={32}
              height={32}
              className="h-full w-full object-cover"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        )}
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-grey">{reviewerName}</span>
          {redirect && (
            <a
              className="cursor-pointer text-grey/50 hover:text-grey"
              href={redirect}
              target="_blank"
              rel="noopener noreferrer"
            >
              Review Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
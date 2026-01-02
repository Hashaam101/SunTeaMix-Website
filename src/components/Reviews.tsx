import Image from 'next/image';
import ReviewCard from './ReviewCard';
// For BG Pattern
// import pattern from "@/../public/Svgs/BG Pattern.svg";
import ThemeButton from './ThemeBtn';

const Reviews = () => {
    return (
        <div className="relative"
            style={{
                overflow: "hidden",
                minHeight: '644px',
                alignSelf: "stretch",
                borderRadius: "36px",
                background: "var(--primary-dark)",
            }}
        >
            <div className="absolute h-full w-full bg-primary-dark -z-20">
                {/* <Image
            src={pattern}
            alt="bg pattern"
            fill
            className="object-cover -z-20 opacity-50"
        /> */}
            </div>

            <div className='py-[46px] px-[15px] sm:py-[76px] sm:px-[52px]'
                style={{
                    display: 'flex',
                    width: '',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '42px',
                }}
            >

                <div>
                    <div className="
            text-center text-h2 sm:text-h3 md:text-h2 text-white w-full">
                        What our Customers are Saying
                    </div>

                    <div
                        className="sm:text-normal1 md:text-h5 w-full text-center font-medium mt-[20px]"
                        style={{ color: 'color-mix(in oklab, var(--color-white) 50%, transparent)' }}
                    >
                        Check out our most recent reviews!
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewCard
                        starCount={5}
                        reviewText="Decent soufflé pancakes! The portion size is perfect for a snack (two pancakes stacked on top of each other). The batter was a tad bit dense to my liking, but still tasted pretty good!"
                        reviewerName="Annabelle"
                        redirect="https://share.google/YdqJhukpUi5VXdjk6"
                        profileImage="Images/reviews/review-1.png"
                    />

                    <ReviewCard
                        starCount={5}
                        reviewText="Cute place that we happened to stop by on a Monday afternoon around 4:30 pm. They have a nice dining area with games, plenty of outlets, and wifi. The tea came out quickly..."
                        reviewerName="David Yoshihara"
                        redirect='https://share.google/w5GAVS5ef4PdGoGpK'
                        profileImage="Images/reviews/review-2.png"
                    />

                    <ReviewCard
                        starCount={5}
                        reviewText="Best place in Honolulu to have a cup of tea. The interior is really aesthetic and calm. The place is really suitable if you want to work/study as it remains quite mostly..."
                        reviewerName="SK. Fazlee Rabby"
                        redirect='https://share.google/2NkwLo0iD89kijQDY'
                        profileImage="Images/reviews/review-3.png"
                    />
                </div>

                <div className='z-10'>
                    <ThemeButton
                        text="Give Us a Review"
                        textClassname="pr-[8px] pl-[14px]"
                        textColor="text-grey"
                        className="bg-white border-2 hover:border-2 hover:bg-white"
                        iconBgColor="bg-black/5"
                        iconBgHoverColor="bg-primary-dark/10"
                        iconColor="text-primary"
                        iconHoverColor="text-primary-dark"
                        href="https://search.google.com/local/writereview?placeid=ChIJLQAAcsZvAHwR5iFKGJjPSmk"
                    />
                </div>

            </div>
        </div>
    );
};

export default Reviews;
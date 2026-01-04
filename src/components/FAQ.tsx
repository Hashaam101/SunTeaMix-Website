"use client";
import React, { JSX, useState } from 'react';

// Interface for FAQ item
interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

// Interface for the FAQ Section props
interface FAQSectionProps {
  title?: string;
  faqItems: FAQItem[];
}

const FAQ: React.FC<FAQSectionProps> = ({
  title = "Frequently Asked Questions",
  faqItems
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full px-[20px] py-8 md:px-[70px] ">
      <h2 className="mb-[32px] text-center text-h4 font-medium sm:text-left sm:text-h2 sm:font-normal">{title}</h2>
      
      <div className="space-y-[10px]">
        {faqItems.map((item, index) => (
          <div key={index} className="border-b border-grey/50"
          >
            <button
              className="flex w-full items-center justify-between py-4 text-left"
              onClick={() => toggleQuestion(index)}
            >
              <span className="text-normal2 font-medium sm:text-h5">{item.question}</span>
              <svg
                className={`h-5 w-5 transition-transform ${openIndex === index ? 'rotate-180 transform' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300  ${
                openIndex === index ? 'max-h-96 border-t border-grey/50 bg-grey/5 py-[20px]' : 'max-h-0'
              }`}
            >
              <p className="pl-[10px] text-normal3 text-grey">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
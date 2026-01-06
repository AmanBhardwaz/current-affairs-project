
import React from 'react';
import { Category } from '../types';

interface NewsViewProps {
  news: string[];
  category: Category;
}

const NewsView: React.FC<NewsViewProps> = ({ news, category }) => {
  const titles: Record<Category, string> = {
    bihar: "Bihar State Updates",
    india: "National Events",
    international: "Global Affairs"
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-800">{titles[category]}</h2>
      </div>
      <div className="grid gap-4">
        {news.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start gap-4"
          >
            <div className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-lg text-sm mt-0.5">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed font-medium">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsView;

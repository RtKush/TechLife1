"use client";

export default function SigninFormSkelton() {
  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-4">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-12 flex-1 bg-gray-200 rounded"></div>
          <div className="h-12 flex-1 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

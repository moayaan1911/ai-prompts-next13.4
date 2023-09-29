/** @format */

export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500'></div>
    </div>
  );
}

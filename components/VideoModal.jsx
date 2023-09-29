/** @format */

export default function VideoModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-4 rounded-xl'>
        <iframe
          width='500'
          height='350'
          src='https://www.youtube.com/embed/lbQdt8Mfkv8'
          title='AI Prompts Next.js Project | defiPrompts | Next.js 13.4+ MongoDB Tailwind Vercel Project Tutorial'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen></iframe>

        <button
          onClick={onClose}
          className='text-black font-bold mt-2 border-8 border-red-600 px-1 rounded-lg text-2xl'>
          Close
        </button>
      </div>
    </div>
  );
}

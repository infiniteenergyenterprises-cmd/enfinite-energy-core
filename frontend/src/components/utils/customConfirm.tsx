import toast from 'react-hot-toast';

export const customConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    toast((t) => (
      <div className="flex flex-col gap-3 min-w-[250px]">
        <p className="text-sm font-semibold text-white">{message}</p>
        <div className="flex gap-2 justify-end mt-2">
          <button 
            onClick={() => { toast.dismiss(t.id); resolve(false); }}
            className="px-4 py-1.5 text-xs font-bold text-gray-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
          >
            Cancel
          </button>
          <button 
            onClick={() => { toast.dismiss(t.id); resolve(true); }}
            className="px-4 py-1.5 text-xs font-bold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg shadow-red-500/20"
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: { background: '#0F172A', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }
    });
  });
};

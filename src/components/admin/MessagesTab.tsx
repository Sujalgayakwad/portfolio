import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Message } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Check, Trash2, Reply, Clock, RefreshCw, Inbox } from 'lucide-react';

export const MessagesTab: React.FC = () => {
  const { showToast } = usePortfolio();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await api.getMessages();
      setMessages(data);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string) => {
    try {
      const updated = await api.toggleMessageRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
      showToast(`Marked transmission as ${updated.read ? 'read' : 'unread'}`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to update message', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this transmission?')) return;
    try {
      await api.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast('Transmission purged from inbox', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete transmission', 'error');
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (filter === 'unread') return !m.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-white flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span>Inquiries & Message Inbox ({messages.length})</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
            Real transmissions received directly through your encrypted contact channel.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          title="Refresh inbox"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
            filter === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          All Transmissions ({messages.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
            filter === 'unread'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <span>Unread</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-cyan-400 text-slate-950 font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Messages Feed */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-20 bg-[#081024]/50 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
          <div className="text-sm font-mono text-slate-400">
            {filter === 'unread' ? 'No unread transmissions!' : 'Your inbox is currently empty.'}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                !msg.read
                  ? 'bg-[#091533] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-[#081024]/80 border-slate-800'
              }`}
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm font-sans">{msg.name}</span>
                    <span className="text-xs font-mono text-cyan-400">({msg.email})</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cyan-500 text-slate-950 font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    Subject: <span className="text-white font-medium">{msg.subject || 'Portfolio Direct Transmission'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Body */}
              <p className="py-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>

              {/* Message Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleRead(msg.id)}
                    className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                      msg.read
                        ? 'text-slate-400 border-slate-800 hover:text-white'
                        : 'text-cyan-300 border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{msg.read ? 'Mark as Unread' : 'Mark as Read'}</span>
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

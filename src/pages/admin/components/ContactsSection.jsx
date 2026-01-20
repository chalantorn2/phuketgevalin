import { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/api';

const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'https://www.phuketgevalin.com/api'
  : '/api';

export default function ContactsSection() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await adminAPI.getContacts();
      if (data.success) {
        setContacts(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/contact?id=${id}`, {
        method: 'PUT',
        credentials: 'include'
      });
      fetchContacts();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Contact Messages</h3>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
          </div>
        ) : contacts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <div key={contact.id} className={`p-6 ${contact.status === 'unread' ? 'bg-sky-50' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-500">{contact.email} | {contact.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'unread' ? 'bg-red-100 text-red-700' :
                      contact.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status}
                    </span>
                    {contact.status === 'unread' && (
                      <button
                        onClick={() => markAsRead(contact.id)}
                        className="text-sm text-sky-600 hover:text-sky-800"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{contact.subject}</p>
                <p className="text-gray-700">{contact.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(contact.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">No messages found</div>
        )}
      </div>
    </div>
  );
}

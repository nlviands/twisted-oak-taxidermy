import React, { useState, type FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  species: string;
  mountType: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    species: '',
    mountType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', phone: '', species: '', mountType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-['Oswald'] text-xl font-semibold text-[#2C2C2C] mb-2">Message Sent!</h3>
        <p className="text-[#6B5A42]">
          We'll get back to you soon. If you need an immediate answer, call{' '}
          <a href="tel:+13366486996" className="text-[#A8893F] hover:text-[#C4A265] underline">
            (336) 648-6996
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors"
          placeholder="(336) 555-1234"
        />
      </div>

      {/* Species */}
      <div>
        <label htmlFor="species" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Species
        </label>
        <input
          type="text"
          id="species"
          name="species"
          value={formData.species}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors"
          placeholder="e.g., Whitetail deer, mallard duck, largemouth bass"
        />
      </div>

      {/* Mount Type */}
      <div>
        <label htmlFor="mountType" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Mount Type
        </label>
        <select
          id="mountType"
          name="mountType"
          value={formData.mountType}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors bg-white"
        >
          <option value="">Select a mount type</option>
          <option value="shoulder">Shoulder Mount</option>
          <option value="european">European Skull</option>
          <option value="full-body">Full Body Mount</option>
          <option value="bird">Bird / Waterfowl</option>
          <option value="fish-skin">Fish (Skin Mount)</option>
          <option value="fish-repro">Fish (Reproduction)</option>
          <option value="rug">Rug Mount</option>
          <option value="antler-plaque">Antler Plaque</option>
          <option value="turkey-fan">Turkey Fan & Beard</option>
          <option value="custom">Custom / Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C4A265] focus:border-[#C4A265] outline-none transition-colors resize-y"
          placeholder="Tell us about your project — details help us give you an accurate quote."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#C4A265] hover:bg-[#D4B87A] text-[#2C2C2C] px-6 py-3 rounded-lg font-['Oswald'] font-semibold text-lg tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending...' : 'Send Quote Request'}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Something went wrong. Please try again or call us at{' '}
          <a href="tel:+13366486996" className="underline">(336) 648-6996</a>.
        </p>
      )}
    </form>
  );
}

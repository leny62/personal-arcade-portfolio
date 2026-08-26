'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getAnonymousId, trackConversion } from '@/lib/analytics';
import { accent, type NeonColor } from '@/lib/arcade';
import { SITE } from '@/lib/site';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaGamepad,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';
import PageHeader from '../components/ui/PageHeader';

const contactMethods: {
  icon: IconType;
  title: string;
  value: string;
  action: string;
  color: NeonColor;
  external: boolean;
}[] = [
  {
    icon: FaEnvelope,
    title: 'Email',
    value: SITE.email,
    action: `mailto:${SITE.email}`,
    color: 'neon-blue',
    external: false,
  },
  {
    icon: FaLinkedin,
    title: 'LinkedIn',
    value: 'linkedin.com/in/leny-pascal-ihirwe',
    action: SITE.linkedin,
    color: 'neon-green',
    external: true,
  },
  {
    icon: FaGithub,
    title: 'GitHub',
    value: 'github.com/leny62',
    action: SITE.github,
    color: 'neon-purple',
    external: true,
  },
  {
    icon: FaTwitter,
    title: 'X',
    value: 'x.com/lenyIhirwe',
    action: SITE.x,
    color: 'neon-cyan',
    external: true,
  },
  {
    icon: FaMapMarkerAlt,
    title: 'Location',
    value: 'Kigali, Rwanda',
    action: 'https://maps.google.com/?q=Kigali,Rwanda',
    color: 'neon-pink',
    external: true,
  },
];

const availability = [
  'Full-time opportunities',
  'Freelance projects',
  'Technical consultations',
  'Open source collaborations',
];

const FIELD_CLASS =
  'w-full border-2 border-border-strong bg-surface-muted p-3 pixel-corners font-pixel text-lg text-text transition-colors focus:border-accent focus:outline-none dark:bg-black/50';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactContent() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const prefixedLeadName = `personal-portfolio-${formState.name.trim()}`;
    const prefixedMessage = formState.subject.trim()
      ? `${formState.subject.trim()} - ${formState.message}`
      : formState.message;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: prefixedMessage,
          anonymousId: getAnonymousId(),
          agreedToTerms: false,
          agreedToPrivacy: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      await trackConversion(formState.email, prefixedLeadName, 'contact_form');

      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <PageHeader
          title="CONTACT TERMINAL"
          subtitle="Connect with me for collaboration or questions"
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              aria-labelledby="connections-heading"
              className="arcade-panel pixel-corners border-accent p-6"
            >
              <h2
                id="connections-heading"
                className="mb-6 flex items-center gap-2 font-arcade text-base text-neon-yellow"
              >
                <FaGamepad aria-hidden="true" />
                PLAYER CONNECTIONS
              </h2>

              <ul className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <li key={method.title} style={accent(method.color)}>
                      <a
                        href={method.action}
                        {...(method.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="flex items-center gap-4 border-2 border-(--accent) bg-surface-muted p-4 pixel-corners transition-transform duration-200 hover:-translate-y-0.5 dark:bg-black/40"
                      >
                        <Icon className="shrink-0 text-2xl text-(--accent)" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block font-arcade text-xs text-(--accent)">
                            {method.title}
                          </span>
                          <span className="block break-all font-pixel text-lg text-text-muted">
                            {method.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 border-2 border-neon-yellow bg-surface-muted p-4 pixel-corners dark:bg-black/40">
                <h3 className="mb-2 font-arcade text-xs text-neon-yellow">
                  AVAILABLE FOR
                </h3>
                <ul className="space-y-2 font-pixel text-lg text-text-muted">
                  {availability.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-neon-green" aria-hidden="true">
                        ›
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              aria-labelledby="form-heading"
              className="arcade-panel pixel-corners border-neon-green p-6"
            >
              <h2
                id="form-heading"
                className="mb-6 flex items-center gap-2 font-arcade text-base text-neon-green"
              >
                <FaPaperPlane aria-hidden="true" />
                SEND MESSAGE
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-arcade text-[0.6rem] text-accent"
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={FIELD_CLASS}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-arcade text-[0.6rem] text-accent"
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={FIELD_CLASS}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block font-arcade text-[0.6rem] text-accent"
                  >
                    SUBJECT <span className="text-text-muted">(OPTIONAL)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className={FIELD_CLASS}
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-arcade text-[0.6rem] text-accent"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${FIELD_CLASS} resize-none`}
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="arcade-btn pixel-corners w-full text-xs"
                >
                  {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>

                {/* Announced, not just coloured: the old version signalled state
                    only through the button's background. */}
                <p
                  role="status"
                  aria-live="polite"
                  className={`min-h-6 text-center font-pixel text-lg ${
                    status === 'error' ? 'text-neon-red' : 'text-neon-green'
                  }`}
                >
                  {status === 'success' &&
                    'Message sent. I usually reply within 24-48 hours.'}
                  {status === 'error' &&
                    `Something went wrong. Email me directly at ${SITE.email}.`}
                </p>
              </form>

              <div className="mt-6 border-t-2 border-border pt-5 text-center">
                <p className="font-arcade text-[0.6rem] text-neon-yellow">
                  RESPONSE TIME: 24-48 HOURS
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Steadfast Student Services — U.S. Enrollment Experts for International Students'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0B1F3A',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Gold accent bar top-left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 8,
            height: '100%',
            backgroundColor: '#C9A84C',
          }}
        />

        {/* Decorative circle — top right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: '50%',
            backgroundColor: '#1A6B72',
            opacity: 0.18,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: 60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            backgroundColor: '#C9A84C',
            opacity: 0.1,
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 48 }}>
          {/* Icon badge */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: '#C9A84C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ color: '#C9A84C', fontSize: 18, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' }}>
            Steadfast Student Services
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 820,
          }}
        >
          Your Path to a{' '}
          <span style={{ color: '#C9A84C' }}>U.S. University</span>
          {' '}Starts Here
        </div>

        {/* Subtext */}
        <div
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 26,
            lineHeight: 1.4,
            marginBottom: 56,
            maxWidth: 700,
          }}
        >
          Expert enrollment consulting for international students from every country — even the most complex cases.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, marginTop: 'auto' }}>
          {[
            { value: '2,400+', label: 'Students Enrolled' },
            { value: '89%', label: 'Visa Approval Rate' },
            { value: '68', label: 'Countries Served' },
            { value: 'Free', label: 'Assessment & Consultation' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#C9A84C', fontSize: 32, fontWeight: 800 }}>{value}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}

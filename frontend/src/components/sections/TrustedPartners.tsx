import React from 'react';

export function TrustedPartners() {
  const partners = [
    { name: "adani", sub: "SOLAR", color: "text-blue-800" },
    { name: "WAAREE", sub: "One with the Sun", color: "text-green-600" },
    { name: "LONGi", sub: "", color: "text-red-600" },
    { name: "Growatt", sub: "", color: "text-green-500" },
    { name: "LUMINOUS", sub: "", color: "text-blue-600" },
    { name: "vikramsolar", sub: "", color: "text-red-600" }
  ];

  return (
    <section className="pt-6 pb-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-brand-blue mb-2">Our Trusted Partners</h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-pointer">
              {/* Using styled text as placeholder for logos */}
              <div className={`text-2xl font-black tracking-tighter ${partner.color}`}>
                {partner.name}
              </div>
              {partner.sub && (
                <div className="text-[8px] font-bold tracking-widest text-gray-500 uppercase">
                  {partner.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

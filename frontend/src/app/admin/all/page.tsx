'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { HeroManager } from './HeroManager';
import { GenericSectionManager } from './GenericSectionManager';
import { GridSectionManager } from './GridSectionManager';
import { SavingsCalculatorManager } from './SavingsCalculatorManager';

export default function AllSectionsAdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
          <Layers className="w-3.5 h-3.5" /> All Sections Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Home Page</h1>
        <p className="text-sm text-white/50 mt-2">Manage content and images for all home page sections.</p>
      </div>

      {/* Sections List */}
      <div className="space-y-6">
        <HeroManager />
        
        <GenericSectionManager 
          title="PM Surya Ghar Scheme" 
          description="Manage the main banner and text for the government subsidy section."
          contentKey="HOME_SURYA_GHAR"
        />

        <GridSectionManager 
          title="Why Choose Us"
          description="Manage the 8 advantage boxes shown on the home page."
          items={[
            { key: 'HOME_WHY_CHOOSE_1', defaultTitle: 'Premium Quality Components', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_2', defaultTitle: 'Certified Installation Team', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_3', defaultTitle: 'Customized Solar Design', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_4', defaultTitle: 'Smart Energy Monitoring', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_5', defaultTitle: 'Fast Installation', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_6', defaultTitle: 'Govt. Subsidy Assistance', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_7', defaultTitle: 'Annual Maintenance', hasImage: false },
            { key: 'HOME_WHY_CHOOSE_8', defaultTitle: 'Lifetime Relationship', hasImage: false },
          ]}
        />

        <GridSectionManager 
          title="Our Solar Solutions"
          description="Manage the 5 main solar solutions categories."
          headerKey="SOL_GRID"
          items={[
            { key: 'SOL_CARD_RESIDENTIAL', defaultTitle: 'Residential Solar', hasImage: true },
            { key: 'SOL_CARD_COMMERCIAL', defaultTitle: 'Commercial Solar', hasImage: true },
            { key: 'SOL_CARD_INDUSTRIAL', defaultTitle: 'Industrial Solar', hasImage: true },
            { key: 'SOL_CARD_AGRICULTURE', defaultTitle: 'Agriculture Solar', hasImage: true },
            { key: 'SOL_CARD_EV', defaultTitle: 'EV Charging', hasImage: true },
          ]}
        />

        <GenericSectionManager 
          title="Agriculture Solar Pumps" 
          description="Manage the agriculture solar water pump section banner and text."
          contentKey="HOME_AGRICULTURE"
        />

        <SavingsCalculatorManager />

      </div>
    </div>
  );
}

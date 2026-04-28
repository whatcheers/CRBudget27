import { 
  ShieldCheck, Flame, Wrench, Leaf, Droplets, Recycle, Bus, Plane,
  Building2, Landmark, Waves, Activity
} from 'lucide-react';

export const DEPARTMENTS = {
  police: {
    id: 'police',
    name: 'Police',
    fundType: 'General Fund',
    budget: 52.4,
    ftes: 259,
    icon: ShieldCheck,
    color: '#1e3a8a',
    lightColor: '#eff6ff',
    description: 'Provides law enforcement, community policing, records management, and criminal investigation services.',
    stats: [
      { label: 'Calls for Service', value: '144K' },
      { label: 'Reports Processed', value: '16K' },
      { label: 'Investigations', value: '1.6K' }
    ],
    highlights: [
      'Hosted 53rd Regional Academy for 7 local recruits and 6 from nearby agencies.',
      'Installed 76 public safety cameras, including 70 with Automated License Plate Reader (ALPR) capabilities.',
      'Budget includes $2M for equipment and technology and $121K for evidence storage.',
      'Adding K9 unit ($20K) and funding promotional testing ($55K).'
    ],
    expenses: [
      { name: 'Salaries', value: 28.12 },
      { name: 'Benefits', value: 12.54 },
      { name: 'Inter Dept', value: 3.83 },
      { name: 'Fleet/Fuel', value: 2.40 },
      { name: 'Prof Services', value: 1.59 },
      { name: 'Facilities/Rent', value: 1.15 },
      { name: 'Insurance', value: 0.81 },
      { name: 'Other', value: 1.98 }
    ]
  },
  fire: {
    id: 'fire',
    name: 'Fire',
    fundType: 'General Fund',
    budget: 26.9,
    ftes: 151,
    icon: Flame,
    color: '#dc2626',
    lightColor: '#fef2f2',
    description: 'Responsible for fire suppression, emergency medical services, fire inspections, and hazard mitigation.',
    stats: [
      { label: 'Incidents', value: '16K' },
      { label: 'Fire Inspections', value: '3.3K' },
      { label: 'Training Hours', value: '21K' }
    ],
    highlights: [
      'Conducted 403 new construction reviews and investigated 77 fire/explosive incidents.',
      'Trained all response personnel on thermal imaging cameras.',
      'Allocated $2.3M for the construction of a new Fire Training Facility, including a burn building and training tower.',
      'Budget adds 2 FTE firefighters ($222K) and $75K for an SCBA compressor.'
    ],
    expenses: [
      { name: 'Salaries', value: 16.16 },
      { name: 'Benefits', value: 7.50 },
      { name: 'Fleet/Fuel', value: 0.99 },
      { name: 'Health & Ins', value: 0.77 },
      { name: 'Facilities/Rent', value: 0.52 },
      { name: 'Other', value: 0.92 }
    ]
  },
  publicWorks: {
    id: 'publicWorks',
    name: 'Public Works',
    fundType: 'General Fund',
    budget: 28.2,
    ftes: 162.95,
    icon: Wrench,
    color: '#ea580c',
    lightColor: '#fff7ed',
    description: 'Manages city infrastructure, including street maintenance, traffic signals, and flood control operations.',
    stats: [
      { label: 'Street Miles', value: '640+' },
      { label: 'Traffic Signals', value: '168' },
      { label: 'Acres Mowed', value: '847' }
    ],
    highlights: [
      'Completed 49 Paving for Progress projects and 34 maintenance projects in the last calendar year.',
      '$70.6M budgeted for the Flood Control System, including the 8th Avenue Bridge construction.',
      '$39.2M allocated for street improvements.',
      '$1.1M budgeted for street lighting upgrades in Czech Village and New Bohemia.'
    ],
    expenses: [
      { name: 'Salaries', value: 13.42 },
      { name: 'Benefits', value: 6.09 },
      { name: 'Fleet/Fuel', value: 4.34 },
      { name: 'Materials', value: 2.27 },
      { name: 'Facilities/Rent', value: 0.94 },
      { name: 'Inter Dept', value: 0.71 },
      { name: 'Other', value: 0.47 }
    ]
  },
  parks: {
    id: 'parks',
    name: 'Parks & Rec',
    fundType: 'General Fund',
    budget: 13.3,
    ftes: 128.82,
    icon: Leaf,
    color: '#16a34a',
    lightColor: '#f0fdf4',
    description: 'Administers 107 city parks, 63 miles of trails, aquatic centers, and forestry services.',
    stats: [
      { label: 'People Served', value: '1M+' },
      { label: 'Pool Admissions', value: '160K' },
      { label: 'Forestry Pruning', value: '1.9K Trees' }
    ],
    highlights: [
      'Volunteers contributed 24,000 hours in FY 2025 across facilities.',
      'ReLeaf Cedar Rapids planted over 8,000 trees this year, targeting 42,000 by 2031.',
      '$5M allocated to River Activation Phase One at Mays Island.',
      'Budget includes $300K for mold remediation and drainage at Tait Cummins and Usher Ferry.'
    ],
    expenses: [
      { name: 'Salaries', value: 6.54 },
      { name: 'Benefits', value: 2.72 },
      { name: 'Fleet/Fuel', value: 1.46 },
      { name: 'Grants', value: 0.50 },
      { name: 'Insurance', value: 0.45 },
      { name: 'Utilities', value: 0.44 },
      { name: 'Other', value: 1.17 }
    ]
  },
  infoTech: {
    id: 'infoTech',
    name: 'Info Tech',
    fundType: 'General Fund',
    budget: 9.3,
    ftes: 40,
    icon: Building2,
    color: '#0891b2',
    lightColor: '#e0f2fe',
    description: 'Maintains enterprise applications, networking, cybersecurity, and GIS mapping for city departments.',
    stats: [
      { label: 'Network Miles', value: '170' },
      { label: 'Buildings Served', value: '60+' },
      { label: 'Uptime', value: '98%' }
    ],
    highlights: [
      'Implemented electronic permit and license application processes with the City Clerk and Building Services.',
      'Deployed a Construction Dashboard for tracking project updates and traffic impacts.',
      '$723K budgeted for operational needs and $100K for recovery and backup upgrades.',
      'Saved over $200K through asset management and license optimization.'
    ],
    expenses: [
      { name: 'Salaries', value: 4.37 },
      { name: 'Software', value: 2.03 },
      { name: 'Benefits', value: 1.40 },
      { name: 'Prof Services', value: 0.72 },
      { name: 'Rent', value: 0.26 },
      { name: 'Insurance', value: 0.15 },
      { name: 'Other', value: 0.36 }
    ]
  },
  water: {
    id: 'water',
    name: 'Water',
    fundType: 'Enterprise',
    budget: 99.3,
    ftes: 117.09,
    icon: Droplets,
    color: '#0284c7',
    lightColor: '#f0f9ff',
    description: 'Manages water treatment, distribution, and meter services for Cedar Rapids, Robins, and Poweshiek.',
    stats: [
      { label: 'Gallons/Day', value: '42M' },
      { label: 'Customers', value: '55K' },
      { label: 'Miles of Water Main', value: '717' }
    ],
    highlights: [
      'Daily service charge is increasing by 6%.',
      'Capital budget includes $28M for the Northwest Water Treatment Plant expansion.',
      'Capital budget allocates $6M for an aquifer storage and recovery well.',
      'Completed a 30-inch water main construction to support the Big Cedar Industrial Park.'
    ],
    expenses: [
      { name: 'Personal', value: 14.27 },
      { name: 'Discretionary', value: 13.88 },
      { name: 'Other & Debt', value: 20.88 },
      { name: 'Capital', value: 48.06 }
    ]
  },
  wpc: {
    id: 'wpc',
    name: 'Pollution Control',
    fundType: 'Enterprise',
    budget: 160.4,
    ftes: 88.74,
    icon: Waves,
    color: '#0d9488',
    lightColor: '#f0fdfa',
    description: 'Provides wastewater treatment and utility capacity for local communities and industrial customers.',
    stats: [
      { label: 'Lab Analyses', value: '168K' },
      { label: 'Biosolids Incinerated', value: '22M lbs' },
      { label: 'Work Orders', value: '10K' }
    ],
    highlights: [
      'Sewer daily service charge and volumetric charge increasing by 9%.',
      'Capital budget includes $103.5M for the solids-handling and nutrient-reduction improvement project.',
      'Maintained 100% permit compliance in calendar year 2025.',
      'Secured $3M in state and federal funds for the watershed program.'
    ],
    expenses: [
      { name: 'Personal', value: 10.84 },
      { name: 'Discretionary', value: 16.73 },
      { name: 'Other & Debt', value: 26.59 },
      { name: 'Capital', value: 106.16 }
    ]
  },
  solidWaste: {
    id: 'solidWaste',
    name: 'Solid Waste',
    fundType: 'Enterprise',
    budget: 15.2,
    ftes: 50.3,
    icon: Recycle,
    color: '#84cc16',
    lightColor: '#f7fee7',
    description: 'Coordinates weekly garbage, recycling, yard waste collection, and nuisance abatements.',
    stats: [
      { label: 'Garbage (Tons)', value: '22K' },
      { label: 'Recycling (Tons)', value: '7.6K' },
      { label: 'Weed/Grass Complaints', value: '2.2K' }
    ],
    highlights: [
      'No rate increase planned for FY 2027.',
      'Transitioning fee structure to allow variable cart sizes, phasing out garbage tag fees.',
      'City Manager 1-Bag Challenge gathered over 10K bags of litter, with division staff collecting 6.4K.',
      'Managed 1,500 City right of way nuisance abatements.'
    ],
    expenses: [
      { name: 'Personal', value: 5.39 },
      { name: 'Discretionary', value: 4.81 },
      { name: 'Other', value: 4.94 }
    ]
  },
  transit: {
    id: 'transit',
    name: 'Transit',
    fundType: 'Enterprise',
    budget: 15.9,
    ftes: 64,
    icon: Bus,
    color: '#d97706',
    lightColor: '#fffbeb',
    description: 'Operates fixed-route bus service and ADA paratransit in Cedar Rapids, Marion, and Hiawatha.',
    stats: [
      { label: 'Passenger Trips', value: '1.3M' },
      { label: 'Heavy-Duty Buses', value: '30' },
      { label: 'Bus Stops', value: '600+' }
    ],
    highlights: [
      'Passenger trips increased 12% in FY 2025.',
      'Cash fares remain $1.00; free fares offered for students, seniors, and Medicare passengers.',
      'Budget includes $2.5M to purchase two heavy-duty hybrid buses.',
      'Received federal operating grants to cover operations through FY 2028.'
    ],
    expenses: [
      { name: 'Personal', value: 6.64 },
      { name: 'Discretionary', value: 2.09 },
      { name: 'Other & Debt', value: 3.53 },
      { name: 'Capital', value: 3.64 }
    ]
  },
  airport: {
    id: 'airport',
    name: 'Airport',
    fundType: 'Enterprise',
    budget: 56.2,
    ftes: 73.9,
    icon: Plane,
    color: '#6366f1',
    lightColor: '#eef2ff',
    description: 'Operates The Eastern Iowa Airport, providing regional transit connections.',
    stats: [
      { label: 'Capital Projects', value: '$38.8M' },
      { label: 'FTE Increase', value: '+5.0' },
      { label: 'Estimated Rev.', value: '$56.8M' }
    ],
    highlights: [
      'The Eastern Iowa Airport budget is adopted by the Cedar Rapids Airport Commission.',
      'Reflects $56.8M in revenue and $56.2M in expenses.',
      '$39.2M allocated for capital outlays and improvements, including $38.8M for Airport Improvements.',
      'Expanding workforce with 5.0 additional FTEs.'
    ],
    expenses: [
      { name: 'Personal', value: 8.70 },
      { name: 'Discretionary', value: 6.04 },
      { name: 'Other', value: 2.22 },
      { name: 'Capital', value: 39.29 }
    ]
  }
};

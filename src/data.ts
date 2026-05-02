import { 
  Activity, BookOpen, Briefcase, Building, Building2, Bus, CircleParking, Clock, CloudRain, DollarSign, Droplets, FileText, Flag, Flame, Hammer, Heart, Landmark, Leaf, Lightbulb, MapPin, Music, PawPrint, PiggyBank, Plane, Radio, Recycle, RotateCw, Scale, Shield, ShieldCheck, Signpost, Snowflake, Sprout, Theater, TrafficCone, Trash2, TrendingUp, Truck, Users, Waves, Wrench
} from 'lucide-react';

export const DEPARTMENTS = {
  police: {
    id: 'police',
    name: 'Police',
    fundType: 'General Fund',
    budget: 52.4,
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
    ],
    supplementalFY27: {
      totalExpenditures: 52.43,
      totalRevenues: 11.89,
      generalFundGap: 40.54,
      revenueSources: [
        { name: 'Court Fines & Forfeits (incl. traffic camera)', value: 6.28 },
        { name: 'Operating Transfer In', value: 4.39 },
        { name: 'Local Govt Grants & Reimb (school resource officers)', value: 0.88 },
        { name: 'Charges for Services (towing, alarms)', value: 0.31 },
        { name: 'Licenses & Permits', value: 0.02 }
      ],
      expenditureBuckets: [
        { name: 'People (Personal Services)', value: 40.66, share: 78 },
        { name: 'Discretionary (software, training, supplies)', value: 6.80, share: 13 },
        { name: 'Fleet, Facilities & Insurance', value: 4.96, share: 9 }
      ],
      didYouKnow: [
        { label: 'Other Professional Services', value: '$1.59M', sub: 'Outside specialists, technical contracts' },
        { label: 'City Fleet Rental', value: '$1.32M', sub: 'Squad cars and fleet equipment' },
        { label: 'Computer Software', value: '$488K', sub: 'CAD, records, evidence systems' },
        { label: 'Vehicle Insurance', value: '$394K', sub: 'Insuring the entire patrol fleet' },
        { label: 'Gasoline Fuel', value: '$380K', sub: 'Powering daily patrol operations' },
        { label: 'Ammunition & Firearms', value: '$110K', sub: 'Duty rounds, training, range supplies' }
      ],
      notableChanges: [
        { name: 'Traffic Camera Fines Revenue', delta: '+$1.81M', note: 'biggest revenue increase, +41%' },
        { name: 'Personal Services', delta: '+$1.89M', note: 'wages, benefits, retirement contributions' },
        { name: 'Other Professional Services', delta: '+$369K', note: 'outside contracted expertise' },
        { name: 'City Fleet Rental Charges', delta: '−$431K', note: 'fleet rate change' },
        { name: 'Health Services', delta: '−$106K', note: 'right-sized to historical use' }
      ]
    }
  },
  fire: {
    id: 'fire',
    name: 'Fire',
    fundType: 'General Fund',
    budget: 26.9,
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
    ],
    supplementalFY27: {
      totalExpenditures: 26.86,
      totalRevenues: 3.69,
      generalFundGap: 23.18,
      revenueSources: [
        { name: 'Operating Transfer In', value: 2.51 },
        { name: 'Protective Inspection Fees', value: 0.73 },
        { name: 'Special Fire Services', value: 0.45 },
        { name: 'Other (sales, misc)', value: 0.002 }
      ],
      expenditureBuckets: [
        { name: 'People (Personal Services)', value: 23.67, share: 88 },
        { name: 'Fleet, Facilities & Insurance', value: 2.36, share: 9 },
        { name: 'Discretionary (training, supplies, services)', value: 0.83, share: 3 }
      ],
      didYouKnow: [
        { label: 'Health Services', value: '$500K', sub: 'Firefighter physicals & wellness exams' },
        { label: 'Routine City Fleet Charges', value: '$666K', sub: 'Maintaining engines, ladders, ambulances' },
        { label: 'City Fleet Rental', value: '$195K', sub: 'Apparatus rental costs' },
        { label: 'Diesel Fuel', value: '$110K', sub: 'Powering fire trucks and apparatus' },
        { label: 'Other Professional Services', value: '$134K', sub: 'Outside specialists & technical contracts' },
        { label: 'Personal Protective Gear', value: '$33K', sub: 'Turnout gear, masks, safety equipment' }
      ],
      notableChanges: [
        { name: 'Personal Services', delta: '+$1.30M', note: 'wages and benefit costs, +6%' },
        { name: 'Health Services', delta: '+$200K', note: 'expanded firefighter health program' },
        { name: 'Routine City Fleet Charges', delta: '+$100K', note: 'apparatus maintenance costs' },
        { name: 'Other Professional Services', delta: '+$40K', note: 'specialty contracts' },
        { name: 'Diesel Fuel', delta: '+$33K', note: 'fuel cost adjustment' },
        { name: 'Liability Insurance', delta: '−$30K', note: 'rate decrease' }
      ]
    }
  },
  publicWorks: {
    id: 'publicWorks',
    name: 'Public Works',
    fundType: 'General Fund',
    budget: 28.2,
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
    ],
    supplementalFY27: {
      totalExpenditures: 28.24,
      totalRevenues: 22.94,
      generalFundGap: 5.31,
      revenueSources: [
        { name: 'Road Use Tax Transfer', value: 17.22 },
        { name: 'Internal Charges (City Mgr Dept)', value: 5.35 },
        { name: 'Intergov & Permits', value: 0.23 },
        { name: 'Other (sales, damage, fees)', value: 0.14 }
      ],
      expenditureBuckets: [
        { name: 'People (Personal Services)', value: 19.50, share: 69 },
        { name: 'Fleet & Operations', value: 6.43, share: 23 },
        { name: 'Materials & Supplies', value: 2.31, share: 8 }
      ],
      didYouKnow: [
        { label: 'Snow & Ice Chemicals', value: '$805K', sub: 'Salt and de-icer for winter ops' },
        { label: 'Street & Sewer Materials', value: '$1.46M', sub: 'Asphalt, concrete, repair stock' },
        { label: 'Road Paint Supplies', value: '$110K', sub: 'Lane striping & markings' },
        { label: 'Sign & Signal Supplies', value: '$118K', sub: 'Traffic signs and signal parts' },
        { label: 'City Fleet Rental', value: '$2.18M', sub: 'Trucks, plows, heavy equipment' },
        { label: 'Diesel Fuel', value: '$320K', sub: 'Powering the PW fleet' }
      ],
      notableChanges: [
        { name: 'Road Use Tax Transfer In', delta: '+$440K', note: 'state transportation funding' },
        { name: 'City Fleet Rental Charges', delta: '+$295K', note: 'fleet rate increase' },
        { name: 'Snow & Ice Chemical Supplies', delta: '+$72K', note: 'rising chemical costs' },
        { name: 'Internal Charges (City Mgr Dept)', delta: '−$399K', note: 'lower interdept billing' }
      ]
    }
  },
  parks: {
    id: 'parks',
    name: 'Parks & Rec',
    fundType: 'General Fund',
    budget: 13.3,
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
    ],
    supplementalFY27: {
      totalExpenditures: 13.28,
      totalRevenues: 3.61,
      generalFundGap: 9.66,
      revenueSources: [
        { name: 'Charges for Services (concessions, registration, admission, passes)', value: 1.76 },
        { name: 'Operating Transfer In', value: 1.23 },
        { name: 'Rentals (buildings, land, shelters)', value: 0.59 },
        { name: 'Permits', value: 0.03 }
      ],
      expenditureBuckets: [
        { name: 'People (Personal Services)', value: 9.25, share: 70 },
        { name: 'Fleet, Facilities & Utilities', value: 2.76, share: 21 },
        { name: 'Discretionary (programs, supplies)', value: 1.25, share: 9 }
      ],
      didYouKnow: [
        { label: 'Pool Passes & Admissions', value: '$761K', sub: 'Aquatic centers, ice arena, facility access' },
        { label: 'Program Registration Fees', value: '$510K', sub: 'Youth & adult recreation signups' },
        { label: 'Concession Sales', value: '$295K', sub: 'Food & drink revenue at parks' },
        { label: 'Building Rental Revenue', value: '$257K', sub: 'Shelters, lodges, event spaces' },
        { label: 'City Fleet Rental', value: '$809K', sub: 'Mowers, plows, maintenance vehicles' },
        { label: 'Pool & Park Chemical Supplies', value: '$116K', sub: 'Chlorine, treatment chemicals' }
      ],
      notableChanges: [
        { name: 'Personal Services', delta: '+$736K', note: 'wages and group insurance, +9%' },
        { name: 'Group Insurance', delta: '+$207K', note: 'rising health benefit costs' },
        { name: 'Concession Sales Revenue', delta: '+$38K', note: 'concession growth at parks' },
        { name: 'City Fleet Rental Charges', delta: '+$32K', note: 'fleet rate change' },
        { name: 'Property Insurance', delta: '−$64K', note: 'lower premium rates' },
        { name: "Workers' Compensation", delta: '−$39K', note: 'claims experience' }
      ]
    }
  },
  infoTech: {
    id: 'infoTech',
    name: 'Info Tech',
    fundType: 'General Fund',
    budget: 9.3,
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
  },
  agriculturalLands: {
    id: 'agriculturalLands',
    name: 'Agricultural Lands',
    fundType: 'Special Revenue Fund',
    budget: 0,
    icon: Sprout,
    color: '#65a30d',
    lightColor: '#f7fee7',
    description: 'Under the responsibility of the Public Works Director, the Agricultural Lands division is used to track the equipment and discretionary expenditures used for roadside vegetation control that are funded through the Ag Land property tax levy.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Equipment/Furniture/Fixtures', value: 0 }
    ]
  },
  amphitheater: {
    id: 'amphitheater',
    name: 'Amphitheater',
    fundType: 'Enterprise Fund',
    budget: 3.3,
    icon: Music,
    color: '#7c3aed',
    lightColor: '#f5f3ff',
    description: 'Under the responsibility of the Finance Director and managed by VenuWorks, the Amphitheater is used to record the revenues and expenditures associated with the venue.',
    stats: [

    ],
    highlights: [
      'The City transitioned the Amphitheater from the General Fund to an Enterprise Fund in FY 2025. The Amphitheater was previously included within the General Fund under the Parks & Recreation Department.',
      'Venue operating revenues are projected to fund operating expenses.',
      'Includes $50K for a Fleet contribution funded partially by reserves to replace two camper units used by touring acts.'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 1.4 },
      { name: 'Management Services', value: 0.1 },
      { name: 'Cost of Goods Sold', value: 1.7 },
      { name: 'Grants & Contributions', value: 0.1 },
      { name: 'Liability Insurance', value: 0 }
    ]
  },
  animalControl: {
    id: 'animalControl',
    name: 'Animal Control',
    fundType: '',
    budget: 2.2,
    icon: PawPrint,
    color: '#a16207',
    lightColor: '#fefce8',
    description: 'Under the responsibility of the Assistant City Manager, the Animal Control Department\'s mission is to serve and protect with compassion, the animals and citizens of our community through education and enforcement and to facilitate successful pet adoptions while respecting and striving to improve the quality of life for both pets and people.',
    stats: [
      { label: 'Successful Adoptions', value: '675' },
      { label: 'Strays Returned to Owner', value: '30%' },
      { label: 'Clinics Offered', value: '2' }
    ],
    highlights: [
      'Previously, Animal Control was budgeted within the scope of the Police Department.',
      'Includes a funding request of $118K for two animal shelter technicians to support operations.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1 },
      { name: 'Other Inter Department Charges', value: 0.3 },
      { name: 'Group Insurance', value: 0.2 },
      { name: 'Retirement Contribution', value: 0.1 },
      { name: 'Social Security Contributions', value: 0.1 },
      { name: 'Temporary/Seasonal Employees', value: 0.1 },
      { name: 'Other Special Pays', value: 0.1 }
    ]
  },
  band: {
    id: 'band',
    name: 'Band',
    fundType: '',
    budget: 0,
    icon: Music,
    color: '#c026d3',
    lightColor: '#fdf4ff',
    description: 'Under the responsibility of the Band Director, the Band division is used to track the associated revenues and expenditures of the Cedar Rapids Municipal Band.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Advertising & Marketing', value: 0 },
      { name: 'External Contracted Labor', value: 0 },
      { name: 'Other Professional Services', value: 0 },
      { name: 'Other Inter Department Charges', value: 0 },
      { name: 'IT Services - External', value: 0 },
      { name: 'Equip/Furniture/Fixtures Serv', value: 0 },
      { name: 'Rental of Equip & Vehicles', value: 0 },
      { name: 'Printing, Binding, & Duplicate', value: 0 },
      { name: 'Musical & Instruments', value: 0 },
      { name: 'Licensing Fees', value: 0 },
      { name: 'Postage & Freight', value: 0 },
      { name: 'Rental of Land & Buildings', value: 0 }
    ]
  },
  bridgeMaintenance: {
    id: 'bridgeMaintenance',
    name: 'Bridge Maintenance',
    fundType: '',
    budget: 0.1,
    icon: Hammer,
    color: '#475569',
    lightColor: '#f1f5f9',
    description: 'Under the responsibility of the Public Works Director, the Bridge Maintenance division is used to track revenues and expenditures associated with the inspection of the bridges of the City.',
    stats: [

    ],
    highlights: [
      'Decrease of $50K to $50K for transfers in of road use tax revenue (revenue was reallocated Public Works Department).'
    ],
    expenses: [
      { name: 'Other Professional Services', value: 0.1 }
    ]
  },
  buildingDemolition: {
    id: 'buildingDemolition',
    name: 'Building Demolition',
    fundType: '',
    budget: 0.1,
    icon: Building2,
    color: '#94a3b8',
    lightColor: '#f8fafc',
    description: 'Under the responsibility of the Economic Development & Development Services Director, the Building Demolition division is used to track revenues and expenditures for assessed demolitions.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Other Professional Services', value: 0.08012 },
      { name: 'Routine City Facility Charges', value: 0.01988 }
    ]
  },
  buildingServices: {
    id: 'buildingServices',
    name: 'Building Services',
    fundType: '',
    budget: 4.4,
    icon: Building,
    color: '#0e7490',
    lightColor: '#ecfeff',
    description: 'Under the responsibility of the Economic Development & Development Services Director, the Building Services Department assists builders and the public with construction codes and other regulations.',
    stats: [
      { label: 'Building Trade Permits', value: '7.6K' },
      { label: 'Trade Inspections', value: '14.2K' },
      { label: 'Construction Value', value: '$2.6B' }
    ],
    highlights: [
      'One-time increase of $500K to $2.6M in building permit revenue based on projections.',
      'Increase of $44K to $630K in charges for services revenue based on historical information and projections.',
      'Decrease of $24K to $1K for external contracted labor due to reallocation to fund a shared position.',
      'Staff completed a comprehensive sub-trade code update in July 2025 for mechanical, plumbing, and electrical codes.',
      'The Code Enforcement Division received Iowa Code Enforcement Department of the Year and Creative Ideas in Code Enforcement awards in November 2024.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 2.787 },
      { name: 'Group Insurance', value: 0.667 },
      { name: 'Retirement Contribution', value: 0.265 },
      { name: 'Social Security Contributions', value: 0.215 },
      { name: 'Rental of Land & Buildings', value: 0.073 },
      { name: 'City Fleet Rental Charges', value: 0.071 },
      { name: 'Routine City Fleet Charges', value: 0.047 },
      { name: 'Liability Insurance', value: 0.035 },
      { name: 'Conferences, Training, Travel', value: 0.03 },
      { name: 'IT Services - External', value: 0.017 }
    ]
  },
  capitalReplacement: {
    id: 'capitalReplacement',
    name: 'Capital Replacement',
    fundType: 'Enterprise Fund',
    budget: 0.4,
    icon: RotateCw,
    color: '#4338ca',
    lightColor: '#eef2ff',
    description: 'Under the responsibility of the Information Technology Director, the Capital Replacement division is used to track associated expenditures for the replacement of computers for departments.',
    stats: [

    ],
    highlights: [
      'The sale of fixed asset revenue was reallocated from the Capital Replacement division to the Pooled Revenues division ($150K).'
    ],
    expenses: [
      { name: 'Equipment/Furniture/Fixtures', value: 0.355 }
    ]
  },
  cedarRapidsTourism2: {
    id: 'cedarRapidsTourism2',
    name: 'Cedar Rapids Tourism Office',
    fundType: 'Enterprise Fund',
    budget: 2.4,
    icon: MapPin,
    color: '#be185d',
    lightColor: '#fdf2f8',
    description: 'Under the responsibility of the Finance Director and managed by VenuWorks, the Cedar Rapids Tourism Office division is used to track associated revenues and expenses related to marketing and promoting the City of Cedar Rapids.',
    stats: [

    ],
    highlights: [
      'The City transitioned the Cedar Rapids Tourism Office from the General Fund to an Enterprise Fund in FY 2025.',
      'Operating revenues are projected to fund operating expenses.',
      'This includes a contribution from the City of $800K from Hotel Motel Tax revenue (no change from FY 2026 funding level).'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 2.3 },
      { name: 'Management Services', value: 0.1 },
      { name: 'Liability Insurance', value: 0 }
    ]
  },
  cedarRapidsTourism: {
    id: 'cedarRapidsTourism',
    name: 'Cedar Rapids Tourism Office',
    fundType: 'Enterprise Fund',
    budget: 0,
    icon: MapPin,
    color: '#db2777',
    lightColor: '#fdf2f8',
    description: 'Under the responsibility of the Finance Director and managed by VenuWorks, the Cedar Rapids Tourism Office division is used to track associated revenues and expenses related to marketing and promoting the City of Cedar Rapids.',
    stats: [

    ],
    highlights: [
      'The City transitioned the Cedar Rapids Tourism Office from the General Fund to an Enterprise Fund in FY 2025 to align with other entertainment venues.'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 0 },
      { name: 'Management Services', value: 0 },
      { name: 'Liability Insurance', value: 0 },
      { name: 'Transfers Out - Interfund', value: 0 }
    ]
  },
  cityAttorney: {
    id: 'cityAttorney',
    name: 'City Attorney',
    fundType: '',
    budget: 1.6,
    icon: Scale,
    color: '#1e40af',
    lightColor: '#eff6ff',
    description: 'Under the responsibility of the City Attorney, the Attorney Department provides comprehensive legal services for the City.',
    stats: [
      { label: 'Contracts reviewed', value: '75+' },
      { label: 'Litigation cases', value: '40+' },
      { label: 'Municipal infractions', value: '290+' }
    ],
    highlights: [
      'Increase of $4.7K to $73K in intergovernmental revenue based on historical information and projections.',
      'Increase of $12K to $72K for transfers in to fund time spent on workers compensation claims.',
      'Includes a funding request of $258K for two attorneys and $4K for associated training and travel to support City needs.',
      'Includes a funding request of $10K for a software subscription.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1.1 },
      { name: 'Group Insurance', value: 0.2 },
      { name: 'Social Security Contributions', value: 0.1 },
      { name: 'Retirement Contribution', value: 0.1 },
      { name: 'Rental of Land & Buildings', value: 0.1 }
    ]
  },
  cityClerk: {
    id: 'cityClerk',
    name: 'City Clerk',
    fundType: '',
    budget: 0.7,
    icon: FileText,
    color: '#475569',
    lightColor: '#f1f5f9',
    description: 'Under the responsibility of the City Clerk, the City Clerk’s Office administers the City government’s documentation.',
    stats: [
      { label: 'Resolutions Processed', value: '1.7K' },
      { label: 'Documents Entered into OnBase', value: '57K' },
      { label: 'Beer/Liquor/Wine Permits', value: '470' }
    ],
    highlights: [
      'Increase of $16K to $191K in license and permit revenue based on historical information and projections.',
      'Increase of $1.4K to $5K in other fines revenue based on historical information and projections.',
      'Decrease of $1.7K to $3K in equipment expenses due to reallocating the budget to the Information Technology Department.',
      'Includes the intention to continue freezing a vacant .5 Council Proceedings Specialist FTE from FY 2026 through FY 2027.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 0.418 },
      { name: 'Rental of Land & Buildings', value: 0.104 },
      { name: 'Group Insurance', value: 0.088 },
      { name: 'Retirement Contribution', value: 0.04 },
      { name: 'Social Security Contributions', value: 0.032 },
      { name: 'Printing, Binding, & Duplicate', value: 0.01 },
      { name: 'Advertising & Marketing', value: 0.009 },
      { name: 'Conferences, Training, Travel', value: 0.006 }
    ]
  },
  cityManager: {
    id: 'cityManager',
    name: 'City Manager',
    fundType: '',
    budget: 4.8,
    icon: Briefcase,
    color: '#064e3b',
    lightColor: '#ecfdf5',
    description: 'Under the responsibility of the City Manager, the City Manager’s Office serves the Cedar Rapids City Council, all City Department reporting to the City Manager and the community.',
    stats: [

    ],
    highlights: [
      'The increase in other expenses relates to projected building rental costs for space occupied at the Annex by the Economic Development Division.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 3.1 },
      { name: 'Group Insurance', value: 0.4 },
      { name: 'Rental of Land & Buildings', value: 0.3 },
      { name: 'Retirement Contribution', value: 0.3 },
      { name: 'Social Security Contributions', value: 0.2 },
      { name: 'Printing, Binding, & Duplicate', value: 0.2 },
      { name: 'Other Employee Benefits', value: 0.1 }
    ]
  },
  civilRights: {
    id: 'civilRights',
    name: 'Civil Rights',
    fundType: '',
    budget: 0.6,
    icon: Scale,
    color: '#be185d',
    lightColor: '#fdf2f8',
    description: 'Under the responsibility of the Civil Rights Director, the Commission protects the civil rights of all individuals within the City.',
    stats: [
      { label: 'Cases filed FY25', value: '43' },
      { label: 'Housing cases FY25', value: '18' },
      { label: 'Non-housing cases FY25', value: '25' }
    ],
    highlights: [
      'No changes from FY 2026 budget.',
      'Conciliated a case to resolution including the largest monetary settlement in the Commission’s history in CY25.',
      'Mediated or conciliated cases between parties, amounting to approximately $93K awarded in monetary relief to complainants in CY25.',
      'Participated in community celebrations such as Juneteenth Festival, CR Pride Fest, and Festival Latino to strengthen connections and promote understanding of its mission.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 0.4 },
      { name: 'Group Insurance', value: 0.091 },
      { name: 'Retirement Contribution', value: 0.038 },
      { name: 'Social Security Contributions', value: 0.031 },
      { name: 'Rental of Land & Buildings', value: 0.025 },
      { name: 'Conferences, Training, Travel', value: 0.007 },
      { name: 'Computer Software', value: 0.006 }
    ]
  },
  communityDevelopment: {
    id: 'communityDevelopment',
    name: 'Community Development',
    fundType: '',
    budget: 2.1,
    icon: Users,
    color: '#7c3aed',
    lightColor: '#f5f3ff',
    description: 'Under the responsibility of the Community Development Director, the Community Development Department is responsible for promoting vitality, affordable housing, regional connectivity and sustainable development.',
    stats: [
      { label: 'Historic Rehab Funding Generated', value: '$125K' },
      { label: 'SPARC Homes Revitalized', value: '6' },
      { label: 'Homeless Units Secured (FY26)', value: '34' }
    ],
    highlights: [
      'Reallocation of $2.8K from transfers out for Neighborhood Planning to conferences and training expenses.',
      'Increased transfers out by $247K for Envision CR plans, Historic Rehabilitation Program, and Visual Arts Program, which were previously excluded due to sufficient special revenue funds.',
      'Continued freezing of a vacant .22 Planning Intern FTE from FY 2026 through FY 2027.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1.125607 },
      { name: 'Transfers Out-Inter', value: 0.247153 },
      { name: 'Group Insurance', value: 0.205599 },
      { name: 'Retirement Contribution', value: 0.10851 },
      { name: 'Rental of Land & Buildings', value: 0.091285 },
      { name: 'Social Security Contributions', value: 0.086358 },
      { name: 'Grants & Contributions', value: 0.06 },
      { name: 'Workers\' Compensation', value: 0.03779 }
    ]
  },
  contingent: {
    id: 'contingent',
    name: 'Contingent',
    fundType: '',
    budget: -0.6,
    icon: PiggyBank,
    color: '#6b7280',
    lightColor: '#f3f4f6',
    description: 'The Contingent division, under the City Manager, City Council, and Finance Director, sets aside funds for unknown or one-time expenses and records revenue from tort property tax levies and non-general fund areas to cover these contingent costs.',
    stats: [

    ],
    highlights: [
      'Includes $2.1M in property tax revenue from the Liability, Property & Self Insurance Levy due to a rate increase.',
      'Includes an increase of $777K in revenue and expenses for projected grants and charges for services.',
      'Includes a transfer of $7.6M in prior year excess building permit revenue ($6.9M) and funding from utilities ($650K), with $6.1M used for one-time or short-term uses.',
      'Increase of $53K to $158K for The Annex and Cedar Rapids Police Department Regional Academy employee parking.',
      'Key items include $3.3M in savings from anticipated position vacancies, $275K for homelessness services, and $93K for year three of the five-year match for the SSMID incubator program.'
    ],
    expenses: [
      { name: 'Regular Employees', value: -2.4 },
      { name: 'Overtime', value: 0.3 },
      { name: 'Other Special Pays', value: 0.4 },
      { name: 'Group Insurance', value: -0.5 },
      { name: 'Social Security Contributions', value: -0.1 },
      { name: 'Retirement Contribution', value: -0.4 },
      { name: 'Workers\' Compensation', value: -0.1 },
      { name: 'Other Professional Services', value: 0.3 },
      { name: 'Computer Software', value: 0.2 },
      { name: 'Equipment/Furniture/Fixtures', value: 0.2 },
      { name: 'Street & Sewer Materials', value: 0.1 },
      { name: 'Grants & Contributions', value: 0.5 },
      { name: 'Electricity', value: 0 },
      { name: 'Rental of Land & Buildings', value: 0.3 },
      { name: 'Property Insurance', value: 0 },
      { name: 'Gasoline Fuel', value: 0 },
      { name: 'Transfer Out-Inter', value: 0.6 }
    ]
  },
  developmentServices: {
    id: 'developmentServices',
    name: 'Development Services',
    fundType: '',
    budget: 2.1,
    icon: Hammer,
    color: '#b45309',
    lightColor: '#fffbeb',
    description: 'Under the responsibility of the Economic Development and Development Services Director, the Development Services Department reviews and facilitates all land development in the City of Cedar Rapids.',
    stats: [
      { label: 'Commercial Permits Issued', value: '1.3K' },
      { label: 'Land Development Cases Processed', value: '246' },
      { label: 'Right-of-Way Permits Issued', value: '2.4K' }
    ],
    highlights: [
      'Intention to continue freezing a vacant Right of Way Permit Technician FTE from FY 2026 through FY 2027.',
      'Total expenditures for FY 2027 increased by 4% to $2.1 million.',
      'Personal Services budget increased by 5% ($93,173) for FY 2027.',
      'Engaging in the review of plans for two major data center campus projects in FY 2026/2027.',
      'Continuing focus on the improvement of Zoning, Subdivision, and Floodplain Management Ordinances.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1.47 },
      { name: 'Group Insurance', value: 0.26 },
      { name: 'Retirement Contribution', value: 0.14 },
      { name: 'Social Security Contributions', value: 0.11 },
      { name: 'Workers\' Compensation', value: 0.03 },
      { name: 'Liability Insurance', value: 0.02 },
      { name: 'Conferences, Training, Travel', value: 0.01 },
      { name: 'Rental of Land & Buildings', value: 0.01 }
    ]
  },
  doubletreePowerhouse: {
    id: 'doubletreePowerhouse',
    name: 'Alliant Energy PowerHouse and Doubletree by Hilton',
    fundType: 'Enterprise Fund',
    budget: 30.1,
    icon: Building,
    color: '#4338ca',
    lightColor: '#eef2ff',
    description: 'Under the responsibility of the Finance Director and managed by Doubletree Management, LLC ("Hilton"), the Alliant Energy PowerHouse and the Doubletree by Hilton divisions are used to record the revenues and expenditures associated with the convention center, arena and hotel.',
    stats: [

    ],
    highlights: [
      'The complex’s combined operating budgets show a net operating deficit of $400K to be funded by City Hotel Motel Tax revenues.',
      'Both the convention center and arena are projected to operate at a deficit in FY 2027.'
    ],
    expenses: [
      { name: 'Personal Services', value: 0 },
      { name: 'Discretionary Expenses', value: 22.8 },
      { name: 'Other Expenses', value: 1 },
      { name: 'Capital Outlay', value: 0 },
      { name: 'Debt Service', value: 6.4 },
      { name: 'Transfers Out - Interfund', value: 0 }
    ]
  },
  downtownDistrict: {
    id: 'downtownDistrict',
    name: 'Downtown District',
    fundType: '',
    budget: 0.2,
    icon: Landmark,
    color: '#4338ca',
    lightColor: '#eef2ff',
    description: 'Under the responsibility of the Finance Director, the Downtown District division is used to track the associated revenues and expenditures as per the agreement that was signed with the Downtown Cedar Rapids Self Supported Municipal Improvement District commission in 2018.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 0.166 },
      { name: 'Equipment/Furniture/Fixtures', value: 0.007 },
      { name: 'Electricity', value: 0.005 }
    ]
  },
  facilityMaintenance: {
    id: 'facilityMaintenance',
    name: 'Facility Maintenance',
    fundType: 'Internal Service Fund',
    budget: 6.7,
    icon: Wrench,
    color: '#475569',
    lightColor: '#f1f5f9',
    description: 'Under the responsibility of the Assistant City Manager, the Facility Maintenance Department maintains the City of Cedar Rapids’ buildings and grounds.',
    stats: [
      { label: 'Work Orders Completed (FY25)', value: '3.3K' },
      { label: 'Sq Ft Maintained (FY25)', value: '1.6M' },
      { label: 'Sq Ft per Custodian (FY27)', value: '24K' }
    ],
    highlights: [
      'Environmental services (custodial) hourly rate increases by $2.80/hour to $80.80/hour; technician hourly rate increases by $7.00/hour to $99.40/hour.',
      'Building rental charges are increasing due to personal service and internal charge increases.',
      'Actual supplies and materials used will be billed to departments monthly with no markup, while external services and materials are billed at actual cost.',
      'Operating budget increases $86K to $6.7M, mainly due to personal service and internal charge increases.',
      'Budget was reallocated between accounts or facility funds due to project definition and capitalization threshold changes.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1.8 },
      { name: 'Building & Grounds Services', value: 1 },
      { name: 'Electricity', value: 0.8 },
      { name: 'Property Insurance', value: 0.6 },
      { name: 'Group Insurance', value: 0.5 },
      { name: 'Natural Gas', value: 0.3 },
      { name: 'City Finance Dept Services', value: 0.2 },
      { name: 'Retirement Contribution', value: 0.2 },
      { name: 'Administrative Area Charges', value: 0.1 },
      { name: 'Social Security Contributions', value: 0.1 },
      { name: 'City Information Tech Services', value: 0.1 },
      { name: 'Property Tax', value: 0.1 },
      { name: 'Cleaning & Janitorial Supplies', value: 0.1 },
      { name: 'City Fleet Rental Charges', value: 0.1 },
      { name: 'Workers\' Compensation', value: 0.1 }
    ]
  },
  finance: {
    id: 'finance',
    name: 'Finance',
    fundType: 'General Fund',
    budget: 6.5,
    icon: DollarSign,
    color: '#166534',
    lightColor: '#f0fdf4',
    description: 'Under the responsibility of the Finance Director, the Finance Department is responsible for the accurate and timely recording of all financial transactions of the City and safeguarding the City’s assets and financial resources.',
    stats: [
      { label: 'Grants Managed', value: '84' },
      { label: 'AP Transactions', value: '100K' },
      { label: 'Payroll Advices', value: '40K' }
    ],
    highlights: [
      'Increase of $25K to $45K in hotel motel revenue for administrative costs.',
      'Discretionary increase of $183K for financial system software maintenance increases.',
      'City rated Aa1 for general obligation bonds and Aa2 for revenue bonds by Moody’s Investors Services.',
      'Received Certificate of Achievement in Financial Reporting for FY 2024 (45th consecutive year).',
      'Received Certificate of Achievement in Budget for FY 2026 (15th consecutive year).'
    ],
    expenses: [
      { name: 'Regular Employees', value: 3.7 },
      { name: 'Group Insurance', value: 0.8 },
      { name: 'Computer Software', value: 0.6 },
      { name: 'Retirement Contribution', value: 0.4 },
      { name: 'Rental of Land & Buildings', value: 0.3 },
      { name: 'Social Security Contributions', value: 0.3 },
      { name: 'Auditing & Accounting Services', value: 0.2 }
    ]
  },
  fleetServices: {
    id: 'fleetServices',
    name: 'Fleet Services',
    fundType: 'Enterprise Fund',
    budget: 21.8,
    icon: Truck,
    color: '#475569',
    lightColor: '#f1f5f9',
    description: 'Under the responsibility of the Assistant City Manager, the Fleet Services Department provides fleet maintenance and management services of vehicles and equipment for the City of Cedar Rapids and some external entities.',
    stats: [
      { label: 'Work Orders Completed', value: '7K' },
      { label: 'PM Services Completed', value: '2K' },
      { label: 'Vehicles Sold', value: '68' }
    ],
    highlights: [
      'The mechanic rate will increase from $88/hour to $90.20/hour for Fleet maintenance overhead costs.',
      'Direct billed expenses are increasing by $700K to $4.4M based on recent spending and projections.',
      '$7.7M is budgeted for purchases of vehicles and equipment and $45K for rental expenses, funded by lease charges and departmental contributions.',
      'The administrative fee for vehicles ($57.80/month) and equipment ($15/month) increased from FY 2026 fees.',
      'The budget for diesel fuel and associated charges to departments increased based on projected usage and rates.'
    ],
    expenses: [
      { name: 'Vehicles, Equipment, Software', value: 7.8 },
      { name: 'Vehicle & Rolling Equip Parts', value: 3 },
      { name: 'Regular Employees', value: 2.7 },
      { name: 'Diesel Fuel', value: 2.7 },
      { name: 'Gasoline Fuel', value: 1.4 },
      { name: 'Vehicles & Rolling Equip Serv', value: 1.4 },
      { name: 'Group Insurance', value: 0.8 },
      { name: 'Rental of Land & Buildings', value: 0.4 },
      { name: 'Retirement Contribution', value: 0.3 },
      { name: 'Social Security Contributions', value: 0.2 }
    ]
  },
  gatewayMaintenance: {
    id: 'gatewayMaintenance',
    name: 'Gateway Maintenance',
    fundType: '',
    budget: 0,
    icon: Signpost,
    color: '#65a30d',
    lightColor: '#f7fee7',
    description: 'Under the responsibility of the Finance Director, the Gateway Maintenance division is used to track the associated expenditures used to enhance the appearance of various entry points into the City.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Routine City Facility Charges', value: 0 },
      { name: 'Property Insurance', value: 0 }
    ]
  },
  golf: {
    id: 'golf',
    name: 'Golf',
    fundType: '',
    budget: 4.8,
    icon: Flag,
    color: '#15803d',
    lightColor: '#f0fdf4',
    description: 'Under the responsibility of Parks and Recreation Director, the Golf Department operates and maintains the City’s golf courses and clubhouses while providing lesson programming, private and City tournament planning, solicit and provide services for outings, host charity and statewide service club tournaments and provide daily customer service and advice to public golfers.',
    stats: [
      { label: 'Rounds Played FY25', value: '134K' },
      { label: 'Veteran Rounds Hosted', value: '1.5K' },
      { label: 'Outings/Tournaments Hosted', value: '119' }
    ],
    highlights: [
      'Operating revenue is increasing $622K due to budgeted increases for golf admission fees, concessions, tournament fees, pass fees, advertising, cart rentals and merchandise sales based on historical and future projections.',
      'Personal services include $130K for one Head Golf Professional FTE at the Twin Pines Golf Course to allow all golf courses to have one Head Golf Professional and $96K for one Assistant Golf Course Superintendent FTE to support operational needs.',
      'Budget includes adding a food truck and costs to equip and operate the truck including 2.50 seasonal FTEs. This includes one-time costs of $155K funded from golf reserves and $132K in on-going operational costs to be funded from golf operating revenue.',
      'Budget includes $12K in on-going operational costs for advertising to be funded from advertising revenue and $5K for volunteer shirts to be funded from golf operating revenue.',
      'Budget includes $171K in one-time equipment purchases to be funded from golf reserves.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 0.8 },
      { name: 'Temporary/Seasonal Employees', value: 0.5 },
      { name: 'Concession Supplies', value: 0.3 },
      { name: 'Other Improvements to Infrastr', value: 0.3 },
      { name: 'City Fleet Rental Charges', value: 0.2 },
      { name: 'Grants & Contributions', value: 0.2 },
      { name: 'Group Insurance', value: 0.2 },
      { name: 'City Information Tech Services', value: 0.2 },
      { name: 'City Finance Dept Services', value: 0.2 },
      { name: 'External Banking/Financial Fee', value: 0.1 }
    ]
  },
  humanResources: {
    id: 'humanResources',
    name: 'Human Resources',
    fundType: '',
    budget: 2.1,
    icon: Heart,
    color: '#e11d48',
    lightColor: '#fff1f2',
    description: 'Under the responsibility of the Human Resources Director, the Human Resources Department collaborates with all departments to enhance the delivery of quality services.',
    stats: [
      { label: 'New hires/rehires processed', value: '572' },
      { label: 'Job applications reviewed', value: '6K' },
      { label: 'Paid parental leave users', value: '50' }
    ],
    highlights: [
      'Includes a funding request of $6K for a .15 FTE intern to support operations.',
      'Includes a funding request increase of $68K to $226K in software maintenance partially funded through charges for services.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 1.2 },
      { name: 'Group Insurance', value: 0.3 },
      { name: 'Computer Software', value: 0.2 },
      { name: 'Retirement Contribution', value: 0.1 },
      { name: 'Social Security Contributions', value: 0.1 },
      { name: 'Health Services', value: 0 },
      { name: 'Other Professional Services', value: 0 },
      { name: 'Rental of Land & Buildings', value: 0 }
    ]
  },
  imonIce: {
    id: 'imonIce',
    name: 'ImOn Ice',
    fundType: 'Enterprise Fund',
    budget: 2.4,
    icon: Snowflake,
    color: '#0891b2',
    lightColor: '#ecfeff',
    description: 'The ice arena is a 4,000-seat multi-purpose arena in Cedar Rapids, located adjacent to the Veterans Memorial Stadium.',
    stats: [

    ],
    highlights: [
      'Includes an increase in the operating deficit by $65K to $265K to be funded by Hotel Motel tax revenue.',
      'Includes $85K in capital improvements for exterior door replacements to be funded by the City from Hotel Motel tax revenue.'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 1.2 },
      { name: 'Management Services', value: 0.1 },
      { name: 'Building & Grounds Services', value: 0.1 },
      { name: 'Other Insurance', value: 0.1 },
      { name: 'Cost of Goods Sold', value: 0.3 },
      { name: 'Electricity', value: 0.5 },
      { name: 'Liability Insurance', value: 0.1 },
      { name: 'Other Improvements to Infrastr', value: 0.1 },
      { name: 'Other Debt Interest Expense', value: 0.1 }
    ]
  },
  investmentEarnings: {
    id: 'investmentEarnings',
    name: 'Investment Earnings',
    fundType: '',
    budget: 0.4,
    icon: TrendingUp,
    color: '#15803d',
    lightColor: '#f0fdf4',
    description: 'Under the responsibility of the Finance Director, the Investment Earnings division is used to record investment expenses, banking costs and associated charges, as well as to initially record interest revenue that is later allocated to specific funds.',
    stats: [

    ],
    highlights: [
      'Increase of $426K in revenue and expenses for external banking program costs funded from earnings credits.'
    ],
    expenses: [
      { name: 'External Banking/Financial Fee', value: 0.4 },
      { name: 'Computer Software', value: 0 }
    ]
  },
  jointCommunications: {
    id: 'jointCommunications',
    name: 'Joint Communications',
    fundType: '',
    budget: 6.6,
    icon: Radio,
    color: '#6d28d9',
    lightColor: '#f5f3ff',
    description: 'Under the responsibility of the Chief of Police, the Joint Communications Department provides timely, accurate and complete emergency and non-emergency dispatch services to the public and public safety agencies.',
    stats: [
      { label: 'Police calls for service', value: '130K' },
      { label: 'Fire calls for service', value: '16K' },
      { label: '911 calls per month', value: '5K' }
    ],
    highlights: [
      'Addition of $40K of intergovernmental revenue from Linn County for existing costs.',
      'Includes a funding request of $33K for radio maintenance expenses.',
      'Includes a funding request of $139K for two dispatchers to support 911 operations.',
      'Includes a one-time funding request of $100K for a 911 logging recorder.',
      '$2.1M for phase three of the public safety portable radio replacement project.'
    ],
    expenses: [
      { name: 'Capital Outlay (Vehicles, Equipment, Software)', value: 2.2 },
      { name: 'Regular Employees', value: 2.1 },
      { name: 'Radio Maintenance', value: 0.7 },
      { name: 'Group Insurance', value: 0.5 },
      { name: 'Retirement Contribution', value: 0.2 },
      { name: 'Social Security Contributions', value: 0.2 },
      { name: 'Computer Software', value: 0.2 },
      { name: 'Overtime', value: 0.1 },
      { name: 'Phone Services', value: 0.1 }
    ]
  },
  library: {
    id: 'library',
    name: 'Library',
    fundType: '',
    budget: 9.1,
    icon: BookOpen,
    color: '#4f46e5',
    lightColor: '#eef2ff',
    description: 'The Library connects people to information, experiences and services that enhance quality of life so the community can learn, enjoy and thrive.',
    stats: [
      { label: 'FY25 Circulation', value: '1M+' },
      { label: 'FY25 Physical Visits', value: '460K+' },
      { label: 'FY25 Volunteers', value: '199' }
    ],
    highlights: [
      'Includes $192K reduction in personal services for anticipated vacancies.',
      'Includes a funding request of $350K for circulation material including subscriptions.',
      '$20K was reallocated from transfers out to personal services due to completion of support from the Facilities Department for project management of the new westside library.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 4.9 },
      { name: 'Group Insurance', value: 0.9 },
      { name: 'Retirement Contribution', value: 0.5 },
      { name: 'Computer Software', value: 0.5 },
      { name: 'Social Security Contributions', value: 0.4 },
      { name: 'Routine City Facility Charges', value: 0.4 },
      { name: 'Electricity', value: 0.2 },
      { name: 'Rental of Land & Buildings', value: 0.2 },
      { name: 'Books & Subscriptions', value: 0.2 },
      { name: 'Workers\' Compensation', value: 0.2 },
      { name: 'Property Insurance', value: 0.1 },
      { name: 'External Contracted Labor', value: 0.1 }
    ]
  },
  mayorAndCityCouncil: {
    id: 'mayorAndCityCouncil',
    name: 'Mayor and City Council',
    fundType: '',
    budget: 1,
    icon: Landmark,
    color: '#be185d',
    lightColor: '#fdf2f8',
    description: 'Under the responsibility of the Mayor and City Council, the Mayor and City Council Department is used to record the revenue and expenditures associated with City Council such as dues and memberships and travel.',
    stats: [

    ],
    highlights: [
      'Increase of $100K to $220K for Federal Lobbyist Services.',
      '$46K was reallocated from the Contingent Division for dues and memberships to align with intended use under this area.'
    ],
    expenses: [
      { name: 'Dues & Memberships', value: 0.27 },
      { name: 'Regular Employees', value: 0.251 },
      { name: 'Other Professional Services', value: 0.23 },
      { name: 'Rental of Land & Buildings', value: 0.071 },
      { name: 'Grants & Contributions', value: 0.067 },
      { name: 'Liability Insurance', value: 0.059 },
      { name: 'Conferences, Training, Travel', value: 0.03 },
      { name: 'Retirement Contribution', value: 0.024 },
      { name: 'Legal Services', value: 0.02 },
      { name: 'Social Security Contributions', value: 0.019 },
      { name: 'Workers\' Compensation', value: 0.001 }
    ]
  },
  paramountTheatre: {
    id: 'paramountTheatre',
    name: 'Paramount Theatre',
    fundType: '',
    budget: 5.2,
    icon: Theater,
    color: '#be185d',
    lightColor: '#fdf2f8',
    description: 'Under the responsibility of the Finance Director and managed by VenuWorks, the Paramount Theatre division records the revenues and expenditures associated with the facility.',
    stats: [

    ],
    highlights: [
      'Includes an operating deficit of $62K to be funded with prior year shuttered venue grant revenue.',
      'No capital improvements are planned for FY 2027.'
    ],
    expenses: [
      { name: 'External Contracted Labor', value: 1.7 },
      { name: 'Management Services', value: 0.1 },
      { name: 'Building & Grounds Services', value: 0.1 },
      { name: 'Other Insurance', value: 0.2 },
      { name: 'Cost of Goods Sold', value: 2.9 },
      { name: 'Electricity', value: 0.2 },
      { name: 'Liability Insurance', value: 0.1 },
      { name: 'Bond Principal', value: 0 },
      { name: 'Bond Interest Expense', value: 0 }
    ]
  },
  parking: {
    id: 'parking',
    name: 'Parking',
    fundType: 'Enterprise Fund',
    budget: 2.5,
    icon: CircleParking,
    color: '#475569',
    lightColor: '#f1f5f9',
    description: 'Under the responsibility of the Finance Director, Downtown Parking Management Incorporated manages the parking facilities.',
    stats: [

    ],
    highlights: [
      'Activity related to parking operations in the City’s FY 2027 parking budget includes personal services for the employee originally hired by the City of Cedar Rapids.',
      'The net surplus of $363K reflects the timing of capital improvement project revenue versus expenses for the west side parking ramp.',
      'Although the City maintains ownership of the parking facilities, Downtown Parking Management Inc. was hired for the management of the facilities and is responsible for setting policy and rates. As a result, revenues and expenditures from Downtown Parking Management Inc. related to operations are not recorded in City financial statements.'
    ],
    expenses: [
      { name: 'Personal Services', value: 0.1 },
      { name: 'Capital Outlay', value: 0 },
      { name: 'Debt Service', value: 1.4 },
      { name: 'Transfers Out - Interfund', value: 0.9 }
    ]
  },
  pooledRevenues: {
    id: 'pooledRevenues',
    name: 'Pooled Revenues',
    fundType: 'General Fund',
    budget: 0,
    icon: DollarSign,
    color: '#166534',
    lightColor: '#f0fdf4',
    description: 'The Pooled Revenues division records various revenues, including property tax, franchise fees, court fines, state backfill, and interest, to offset unfunded costs of general fund departments.',
    stats: [

    ],
    highlights: [
      'Includes $64.6M in property tax revenue derived from the consolidated general fund levy of $8.15440/$1000 of taxable valuation.',
      'Includes an increase of $435K to $13.6M in franchise fee revenue based on historical information and projections.',
      'Includes a decrease of $22K to $10K in court fines based on historical information and projections.',
      'Includes an increase in interest income by $1.6M to $5M based on historical information and projections.',
      'The sale of fixed asset revenue was reallocated from the Capital Replacement division ($150K).'
    ],
    expenses: [

    ]
  },
  riskServices: {
    id: 'riskServices',
    name: 'Risk Services',
    fundType: '',
    budget: 47.2,
    icon: Shield,
    color: '#b91c1c',
    lightColor: '#fef2f2',
    description: 'The Risk Services Department protects the City’s assets through identifying and analyzing the City’s exposures, evaluating the costs associated with exposures and implementing the most cost-effective methods to eliminate, minimize, transfer or pay for risk.',
    stats: [
      { label: 'Liability claims handled', value: '141' },
      { label: 'Vehicle claims handled', value: '272' },
      { label: 'Property claims handled', value: '81' }
    ],
    highlights: [
      'Property and liability expenses are decreasing $1.5M to $7.6M due to decreases in property insurance premiums and budget for settlements.',
      'Workers’ compensation expenses are increasing by $209K to $4.4M due to increased costs in health care and associated costs.',
      'No changes from FY 2026 for the dental fund.',
      'The cost of health care continues to increase and as a result, health fund expenses are increasing $1.1M to $33.9M based on projected expenses.'
    ],
    expenses: [
      { name: 'Health Services', value: 36.1 },
      { name: 'Property Insurance', value: 4.6 },
      { name: 'Other Professional Services', value: 1.8 },
      { name: 'Transfer Out-Inter', value: 1.2 },
      { name: 'Settlement', value: 1.1 },
      { name: 'Liability Insurance', value: 0.9 },
      { name: 'Other Insurance', value: 0.6 },
      { name: 'Legal Services', value: 0.3 },
      { name: 'Workers\' Compensation', value: 0.2 },
      { name: 'Other Employee Benefits', value: 0.2 }
    ]
  },
  sanitarySewer: {
    id: 'sanitarySewer',
    name: 'Sanitary Sewer',
    fundType: 'Enterprise Fund',
    budget: 16.6,
    icon: Waves,
    color: '#0e7490',
    lightColor: '#ecfeff',
    description: 'Under the responsibility of the Public Works Director, the Sanitary Sewer Department is responsible for the operation and maintenance of all sanitary sewers within the City.',
    stats: [
      { label: 'Miles of sanitary sewer maintained', value: '658 miles' },
      { label: 'Sanitary lines inspected/cleaned (FY25)', value: '212 miles' },
      { label: 'Confirmed sanitary sewer overflows (FY25)', value: '12' }
    ],
    highlights: [
      'The budget includes a 9% rate increase for sewer daily service charge and volumetric fees.',
      'Interest revenue increased by $257K to $677K based on historical information and projections.',
      'Transfers in from stormwater user fees increased by $194K to $407K to fund shared expenses for fleet services and utility positions.',
      'Discretionary expenses increased by $1.3M to $2.5M, including $931K for building and grounds services and $125K for consulting and technical services.',
      'Total capital improvement project fund expenditures are $7.1M, with major projects including south Hoosier lift station ($2.3M) and sanitary sewer lining ($2M).'
    ],
    expenses: [
      { name: 'Regular Employees', value: 2.3 },
      { name: 'Group Insurance', value: 0.5 },
      { name: 'Building & Grounds Services', value: 0.9 },
      { name: 'Other Inter Department Charges', value: 0.7 },
      { name: 'Street & Sewer Materials', value: 0.2 },
      { name: 'City Fleet Rental Charges', value: 0.6 },
      { name: 'Routine City Fleet Charges', value: 0.4 },
      { name: 'Other Improvements to Infrastructure', value: 7 },
      { name: 'Bond Principal', value: 1.4 },
      { name: 'Bond Interest Expense', value: 0.5 },
      { name: 'Administrative Area Charges', value: 0.2 },
      { name: 'City Information Tech Services', value: 0.2 },
      { name: 'Rental of Land & Buildings', value: 0.1 },
      { name: 'Liability Insurance', value: 0.1 },
      { name: 'Diesel Fuel', value: 0.1 },
      { name: 'Transfer Out-Inter', value: 0 }
    ]
  },
  schoolCrossingGuards: {
    id: 'schoolCrossingGuards',
    name: 'School Crossing Guards',
    fundType: '',
    budget: 0,
    icon: TrafficCone,
    color: '#f59e0b',
    lightColor: '#fffbeb',
    description: 'Under the responsibility of the Public Works Director, the School Crossing Guards division is used to track cost-sharing expenses with the Cedar Rapids Community School District for crossing guards at crosswalks near schools.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Grants & Contributions', value: 0 }
    ]
  },
  shortTermFunding: {
    id: 'shortTermFunding',
    name: 'Short-Term Division',
    fundType: 'General Fund',
    budget: 6.1,
    icon: Clock,
    color: '#94a3b8',
    lightColor: '#f8fafc',
    description: 'Under the responsibility of the Finance Director, the Short-Term division is used to track one-time or short-term activity of General Fund Areas.',
    stats: [

    ],
    highlights: [
      'Reallocation of $44K from Police Department for final year of force stimulator lease for Police.',
      'Includes $24K in one-time revenue and expenses for work associated with the Police firing range.',
      'Includes one-time funding requests of $7K for equipment for new attorneys; $75K for a wage review; $200K for Building Services to outsource building inspections as needed for data centers; $500K towards the replacement of the City Financial and Payroll systems; $90K for Fire to purchase a fire scene scanner ($5K), Self-Contained Breathing Apparatus compressor ($75K) and headsets for hearing protection ($10K); $723K for Information Technology Department operational needs; $573K for Parks & Recreation for the Jones Disc Golf Course ($50K), for mold remediation and drainage improvements at Tait Cummins Sports Complex and Usher Ferry Historic Village ($300K) and additional funding to support one-time operational needs ($223K); $2.1M for Police to purchase a K9 ($20K), for promotional testing ($55K) and for police equipment and technology ($2M); and $1.5M for Public Works for a sign cutter ($25K), for radio connectivity ($42K), a street lighting upgrade along the Cherokee Trail ($311K) and funding for streetlighting on two streets in the Czech Village and New Bohemia neighborhoods and to update trail lighting between these two neighborhoods and the new Alliant Energy LightLine ($1.1M).',
      'Includes a funding request of $150K annually, from FY 2027 through FY 2030, to provide tree planting education. Funding was also allocated in FY 2026 for this program.',
      'Includes a funding request of $100K for a contribution to the Horizon Our Place Senior Center annually, from fiscal 2027 through 2031.'
    ],
    expenses: [
      { name: 'Other Professional Services', value: 0.5 },
      { name: 'Computer Software', value: 1.2 },
      { name: 'Building & Grounds Services', value: 0.6 },
      { name: 'Rental of Equip & Vehicles', value: 0 },
      { name: 'Equipment/Furniture/Fixtures', value: 2.1 },
      { name: 'Personal Protective Gear', value: 0 },
      { name: 'Grants & Contributions', value: 1.5 },
      { name: 'Animals', value: 0 },
      { name: 'Vehicles, Equipment, Software', value: 0 }
    ]
  },
  solidWasteAgency: {
    id: 'solidWasteAgency',
    name: 'Cedar Rapids Linn County Solid Waste Agency',
    fundType: 'Enterprise Fund',
    budget: 20.7,
    icon: Trash2,
    color: '#ca8a04',
    lightColor: '#fefce8',
    description: 'Under the responsibility of the Executive Director, with the guidance from the Board of Directors, the Cedar Rapids Linn County Solid Waste Agency business unit is used to record the revenues and expenditures associated with the facility.',
    stats: [

    ],
    highlights: [
      'The budget shows a deficit of $6.9M due to planned improvements and budgeting $3.7M for depreciation expense.',
      'Total Expenditures increased by 19% from FY26 to FY27.',
      'Capital Outlay increased by 43% from FY26 to FY27, largely driven by \'Other Improvements to Infrastructure\'.',
      'Expenditures for \'Vehicles, Equipment, Software\' saw a significant decrease of $1.35 million.',
      '\'Closure/PostClosure Landfill Expense\' increased by $414,900 from the prior adopted budget.'
    ],
    expenses: [
      { name: 'Other Improvements to Infrastr', value: 6.3 },
      { name: 'Depreciation Expense', value: 3.7 },
      { name: 'Regular Employees', value: 2.8 },
      { name: 'Other Professional Services', value: 1.7 },
      { name: 'Closure/PostClosure Ldfll Exp', value: 1.7 },
      { name: 'Group Insurance', value: 0.6 },
      { name: 'Vehicles, Equipment, Software', value: 0.5 },
      { name: 'Building & Grounds Supplies', value: 0.4 },
      { name: 'Vehicle & Rolling Equip Parts', value: 0.4 },
      { name: 'Retirement Contribution', value: 0.3 },
      { name: 'External Banking/Financial Fee', value: 0.3 }
    ]
  },
  stormwater: {
    id: 'stormwater',
    name: 'Stormwater',
    fundType: 'Enterprise Fund',
    budget: 10,
    icon: CloudRain,
    color: '#0369a1',
    lightColor: '#f0f9ff',
    description: 'Under the responsibility of the Public Works Director, the Stormwater Department is responsible for the maintenance, operation and replacement of the stormwater conveyance system within the City.',
    stats: [
      { label: 'Storm sewer lines cleaned', value: '27 miles' },
      { label: 'Storm structures cleaned', value: '1.4K' },
      { label: 'Water resource inspections', value: '4.5K' }
    ],
    highlights: [
      'No rate increase is planned for FY 2027; storm sewer transportation revenue is increasing by $477K to $9.8M.',
      'Interest revenue is projected to increase by $63K to $215K.',
      'Personal services include $105K for one Camera Operator FTE to support stormwater line inspections.',
      'Discretionary expenses increased by $2.1M to $3.1M, including $1.2M for building and grounds services for storm sewer maintenance and repair.',
      'Interfund transfers out include $1.4M for capital improvement projects and $645K to support general fund services.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 0.9 },
      { name: 'Group Insurance', value: 0.2 },
      { name: 'Building & Grounds Services', value: 1.3 },
      { name: 'Other Inter Department Charges', value: 0.9 },
      { name: 'Consulting & Technical Service', value: 0.3 },
      { name: 'Grants & Contributions', value: 0.3 },
      { name: 'Street & Sewer Materials', value: 0.1 },
      { name: 'City Finance Dept Services', value: 0.1 },
      { name: 'Electricity', value: 0.1 },
      { name: 'Other Improvements to Infrastr', value: 2.7 },
      { name: 'Transfer Out-Inter', value: 2.5 }
    ]
  },
  streetLighting: {
    id: 'streetLighting',
    name: 'Street Lighting',
    fundType: '',
    budget: 2.4,
    icon: Lightbulb,
    color: '#ca8a04',
    lightColor: '#fefce8',
    description: 'Under the responsibility of the Public Works Director, the Street Lighting division is used to track revenues and expenditures associated with the installation and maintenance of streetlights, which includes the associated electricity cost.',
    stats: [

    ],
    highlights: [
      'No changes from FY 2026.'
    ],
    expenses: [
      { name: 'Electricity', value: 2.4 }
    ]
  },
  veteransMemorial: {
    id: 'veteransMemorial',
    name: 'Veterans Memorial',
    fundType: '',
    budget: 1.8,
    icon: Flag,
    color: '#1e40af',
    lightColor: '#eff6ff',
    description: 'Under the responsibility of the Executive Director, the Memorial Department is responsible for the management, development, operations and maintenance of the Veterans Memorial Building, Veterans Memorial Stadium and the All Veterans Memorial Park.',
    stats: [

    ],
    highlights: [
      'Added a new transfer in of $875K of Hotel Motel tax revenue to fund operational costs.',
      'Funding for the Kernels increased by $1.7K to $119K based on the City’s agreement that $.015 cents of the City levy will be used to fund costs to protect, maintain and preserve the premises.'
    ],
    expenses: [
      { name: 'Regular Employees', value: 0.7 },
      { name: 'Property Insurance', value: 0.3 },
      { name: 'Building & Grounds Services', value: 0.2 },
      { name: 'Group Insurance', value: 0.1 },
      { name: 'Electricity', value: 0.1 },
      { name: 'Retirement Contribution', value: 0.1 },
      { name: 'Social Security Contributions', value: 0.1 }
    ]
  }
};

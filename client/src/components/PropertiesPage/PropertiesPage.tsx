import React, { useState, useEffect } from 'react';
import './PropertiesPage.css';

interface Property {
  id: string;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  typeAr: string;
  typeEn: string;
  area: number;
  image: string;
  priceEstimate: string;
}

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    titleAr: 'شقة فاخرة بإطلالة على المدينة',
    titleEn: 'Luxury City View Apartment',
    locationAr: 'دمشق، المالكي',
    locationEn: 'Damascus, Malki',
    typeAr: 'شقة سكنية',
    typeEn: 'Residential Apartment',
    area: 180,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '250,000,000 ل.س'
  },
  {
    id: 'prop-2',
    titleAr: 'فيلا مستقلة مع حديقة خاصة',
    titleEn: 'Independent Villa with Private Garden',
    locationAr: 'ريف دمشق، يافا / يعفور',
    locationEn: 'Rif Damascus, Yaafour',
    typeAr: 'فيلا',
    typeEn: 'Villa',
    area: 450,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '800,000,000 ل.س'
  },
  {
    id: 'prop-3',
    titleAr: 'مكتب تجاري بتصميم عصري',
    titleEn: 'Modern Commercial Office',
    locationAr: 'دمشق، أبراج المزه',
    locationEn: 'Damascus, Mezzeh Towers',
    typeAr: 'مكتب تجاري',
    typeEn: 'Commercial Office',
    area: 120,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    priceEstimate: '400,000,000 ل.س'
  }
];

export default function PropertiesPage() {
  const [isEn, setIsEn] = useState<boolean>(false);

  useEffect(() => {
    const checkLanguage = () => {
      const htmlLang = document.documentElement.lang || document.dir;
      setIsEn(htmlLang.includes('en') || document.documentElement.dir === 'ltr');
    };

    checkLanguage();
    const observer = new MutationObserver(checkLanguage);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="properties-page-container" style={{ direction: isEn ? 'ltr' : 'rtl' }}>
      <div className="properties-header">
        <h2>{isEn ? 'Available Properties' : 'العقارات المتاحة'}</h2>
        <p>
          {isEn
            ? 'Browse our featured real estate listings available for finishing and investment.'
            : 'تصفح أحدث العقارات المميزة المتاحة للإكساء والتطوير.'}
        </p>
      </div>

      <div className="properties-grid">
        {SAMPLE_PROPERTIES.map((prop) => (
          <div key={prop.id} className="property-card">
            <div className="property-img-wrapper">
              <img src={prop.image} alt={isEn ? prop.titleEn : prop.titleAr} />
              <span className="property-type-badge">
                {isEn ? prop.typeEn : prop.typeAr}
              </span>
            </div>

            <div className="property-content">
              <h3>{isEn ? prop.titleEn : prop.titleAr}</h3>
              <p className="property-location">
                📍 {isEn ? prop.locationEn : prop.locationAr}
              </p>

              <div className="property-details-row">
                <span>{isEn ? `Area: ${prop.area} m²` : `المساحة: ${prop.area} م²`}</span>
                <span className="property-price">{prop.priceEstimate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
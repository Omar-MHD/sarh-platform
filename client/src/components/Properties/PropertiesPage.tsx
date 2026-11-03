import { useState } from 'react';
import './PropertiesPage.css';

interface Property {
  id: string;
  title: string;
  location: string;
  type: string;
  space: string;
  image: string;
}

const USER_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'شقة دمشق السكنية - كفرسوسة',
    location: 'دمشق، كفرسوسة',
    type: 'شقة سكنية',
    space: '140 م²',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prop-2',
    title: 'فيلا ريف دمشق - جديدة عرطوز',
    location: 'ريف دمشق، جديدة عرطوز',
    type: 'فيلا مستقلة',
    space: '350 م²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
];

interface Props {
  onSelectPropertyForTender: (property: Property) => void;
}

export default function PropertiesPage({ onSelectPropertyForTender }: Props) {
  const [properties] = useState<Property[]>(USER_PROPERTIES);

  return (
    <div className="properties-page-container">
      <div className="properties-header">
        <h2>عقاراتي المسجلة</h2>
        <p>اختر العقار الذي تريد إنشاء طلب إكساء أو مناقصة جديدة له</p>
      </div>

      <div className="properties-grid">
        {properties.map(property => (
          <div key={property.id} className="property-card">
            <div className="property-img-wrapper">
              <img src={property.image} alt={property.title} />
              <span className="property-type-badge">{property.type}</span>
            </div>
            <div className="property-body">
              <h3>{property.title}</h3>
              <p className="property-loc">📍 {property.location}</p>
              <p className="property-space"> المساحة: <strong>{property.space}</strong></p>
              
              <button
                type="button"
                className="select-property-btn"
                onClick={() => onSelectPropertyForTender(property)}
              >
                اختيار وتقديم مناقصة إكساء ←
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}